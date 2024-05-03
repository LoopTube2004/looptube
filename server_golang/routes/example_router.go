package routes

import (
	"github.com/LoopTube2004/looptube/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRouter(router *gin.Engine) {
	router.GET("/hello", controllers.GetHello)
}
