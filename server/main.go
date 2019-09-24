package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/notify/:id", func(c *gin.Context) {
		id := c.Param("id")
		// ここからRedisの処理をする
		// 保存
		c.String(http.StatusOK, id)
	})
	r.POST("/notify/:id", func(c *gin.Context) {
		id := c.Param("id")
		body := c.PostFormArray("body")
		x := id
		for _, v := range body {
			x += v
		}
		// ここからRedisの処理をする
		// 取り出し
		c.String(http.StatusOK, x)
	})
	r.Run()
}
