package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"net/http"
	"os"
)

// メッセージの格納
func redisSetMessageList(key string, value []string, c redis.Conn) {
	for _, v := range value {
		c.Do("RPUSH", key, v)
	}
}

// メッセージの取得
func redisGetMessageList(key string, c redis.Conn) []string {
	s, err := redis.Strings(c.Do("LRANGE", key, 0, -1))
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	c.Do("DEL", key)
	return s
}

// redis　接続
func redisConnection() redis.Conn {
	const IP_PORT = "localhost:6379"
	c, err := redis.Dial("tcp", IP_PORT)
	if err != nil {
		panic(err)
	}
	return c
}

func makeCorsConfig() (corsConfig cors.Config) {
	corsConfig = cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	return
}

func RouterSetup(redisC redis.Conn) *gin.Engine {
	// Gin周り
	router := gin.Default()
	router.Use(cors.New(makeCorsConfig()))
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.GET("/notify/:id", func(c *gin.Context) {
		id := c.Param("id")
		res := redisGetMessageList(id, redisC)
		c.JSON(200, gin.H{
			"messageList": res,
		})
	})
	router.POST("/notify/:id", func(c *gin.Context) {
		id := c.Param("id")
		body := c.PostFormArray("body")
		redisSetMessageList(id, body, redisC)
		c.Status(http.StatusOK)
	})
	return router
}

func main() {
	// Redis周り
	redisC := redisConnection()
	defer redisC.Close()
	// Router周り
	router := RouterSetup(redisC)
	router.Run()
}
