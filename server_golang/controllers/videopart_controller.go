package controllers

import (
	"context"
	"fmt"
	"github.com/LoopTube2004/looptube/models"
	"github.com/LoopTube2004/looptube/thirdparty"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/gin-gonic/gin"
	"github.com/satori/go.uuid"
	"net/http"
)

func AddVideoPart(c *gin.Context) {
	//create a new DynamoDB client
	dbClient := thirdparty.InitDynamoDB()
	
	// Parse request body
	var requestBody struct {
		UserId 		  string `json:"userId"`
		Link          string `json:"link"`
		StartSec      int32  `json:"startSec"`
		EndSec        int32  `json:"endSec"`
		Customization int32  `json:"customization"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate a unique ID for the video part
	videoPartID := uuid.NewV4().String()

	// Create a new VideoPart object
	videoPart := models.VideoPart{
		VideoPartId:   videoPartID,
		UserId:        requestBody.UserId,
		Link:          requestBody.Link,
		StartSec:      requestBody.StartSec,
		EndSec:        requestBody.EndSec,
		Customization: requestBody.Customization,
	}

	// Save the video part to the database
	item, err := attributevalue.MarshalMap(videoPart)
	if err != nil {
		panic(fmt.Sprintf("failed to DynamoDB marshal Record, %v", err))
	}

	// Put the video part item into the DynamoDB table
	_, error := dbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		Item:      item,
		TableName: aws.String("VideoPart"),
	})

	if error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Video part added successfully",
		"videoPartId": videoPartID,
	})
}

func GetVideoPartByID(c *gin.Context) {
	//create a new DynamoDB client
	dbClient := thirdparty.InitDynamoDB()

	// Get the video part ID from the URL
	videoPartID := c.Param("id")
	fmt.Println("Video part ID: ", videoPartID)

	// Get the video part from the database
	data, err := dbClient.GetItem(context.TODO(), &dynamodb.GetItemInput{
		//marshal the key
		Key: map[string]types.AttributeValue{
			"VideoPartId": &types.AttributeValueMemberS{
				Value: videoPartID,
			},
		},
		TableName: aws.String("VideoPart"),
	})

	if err != nil {
		fmt.Println("GetItem error: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Check if the video part exists
	if len(data.Item) == 0 || data.Item == nil {
		fmt.Println("No video part found")
		c.JSON(http.StatusNotFound, gin.H{"error": "Video part not found"})
		return
	}

	// Unmarshal the DynamoDB attribute value into a VideoPart object
	var videoPart models.VideoPart
	err = attributevalue.UnmarshalMap(data.Item, &videoPart)

	// Return the response
	if err != nil {
		fmt.Println("Unmarshal error: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, videoPart)
	}
}
