package routes

import (
	"github.com/LoopTube2004/looptube/controllers"
	"github.com/gin-gonic/gin"
)

func PostVideoPart(router *gin.Engine) {
	router.POST("/video/add", controllers.AddVideoPart)
}

func FindVideoPartById(router *gin.Engine) {
	router.GET("/video/:id", controllers.GetVideoPartByID)
}
