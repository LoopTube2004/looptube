package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/gin-gonic/gin"
)

func LoginByGoogle(c *gin.Context) {
	// Load AWS configuration
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}
	fmt.Println("Connected to DynamoDB")
	dbClient := dynamodb.NewFromConfig(cfg)

	// Retrieve Google Token from Authorization header
	googleToken := c.GetHeader("Authorization")[7:] // Skip "Bearer "

	// Create new HTTP client
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://www.googleapis.com/oauth2/v1/userinfo", nil)
	if err != nil {
		log.Println("Error creating request:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	// Set headers
	req.Header = http.Header{
		"Authorization": {"Bearer " + googleToken},
		"Accept":        {"application/json"},
	}

	// Make the request
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error making request:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to make request"})
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error reading response body:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response body"})
		return
	}

	// Unmarshal JSON response body into a map (marshal usually used to convert a body string into a map json)
	var data map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		log.Println("Error unmarshaling response body:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not decode response"})
		return
	}

	// Print the response body to the terminal
	fmt.Println("Response Body:", data)

	// Prepare user data for DynamoDB
	userItem := map[string]types.AttributeValue{
		"UserId": &types.AttributeValueMemberS{Value: data["id"].(string)},
		"Name":   &types.AttributeValueMemberS{Value: data["name"].(string)},
		"Email":  &types.AttributeValueMemberS{Value: data["email"].(string)},
	}

	// Put user item in DynamoDB
	_, err = dbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String("User"),
		Item:      userItem,
	})
	if err != nil {
		log.Println("Error putting item into DynamoDB:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add user to database"})
		return
	}

	// Send the response as JSON to the client
	c.JSON(http.StatusOK, data)
}
