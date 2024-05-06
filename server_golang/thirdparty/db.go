package thirdparty

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/config"
	"log"
	"fmt"	
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

var client *dynamodb.Client

func InitDynamoDB() *dynamodb.Client {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}
	fmt.Println("Connected to DynamoDB")
	dbClient := dynamodb.NewFromConfig(cfg)
	return dbClient
}