package main

import (
	"github.com/LoopTube2004/looptube/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Setup routes
	routes.SetupRouter(router)
	routes.PostVideoPart(router)
	routes.FindVideoPartById(router)

	// Start server
	router.Run(":8080") // listen and serve on 0.0.0.0:8080
}
