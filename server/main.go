package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"net/http"
	"os"
)

// メッセージの格納
func redisSetMessageList(key string, value []string, c redis.Conn){
	for _, v := range value {
		c.Do("RPUSH", key, v)
	}
}

// メッセージの取得
func redisGetMessageList(key string, c redis.Conn) []string{
	s, err := redis.Strings(c.Do("LRANGE", key, 0, -1))
	fmt.Println(s)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
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

func main() {
	redis_c := redisConnection()
	defer redis_c.Close()
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/notify/:id", func(c *gin.Context) {
		id := c.Param("id")
		res := redisGetMessageList(id, redis_c)
		c.JSON(200, gin.H{
			"messageList": res,
		})
	})
	r.POST("/notify/:id", func(c *gin.Context) {
		id := c.Param("id")
		body := c.PostFormArray("body")
		redisSetMessageList(id, body, redis_c)
		c.Status(http.StatusOK)
	})
	r.Run()
}