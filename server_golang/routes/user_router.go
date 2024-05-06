package routes

import (
	"github.com/LoopTube2004/looptube/controllers"
	"github.com/gin-gonic/gin"
)

func SetupUserRouter(router *gin.Engine) {
	router.POST("/user/google-auth", controllers.LoginByGoogle)
}
