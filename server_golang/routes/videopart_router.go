package routes

import (
	"github.com/LoopTube2004/looptube/controllers"
	"github.com/gin-gonic/gin"
)

func SetupVideoPart(router *gin.Engine) {
	router.POST("/video/add", controllers.AddVideoPart)
	router.GET("/video/:id", controllers.GetVideoPartByID)
}
