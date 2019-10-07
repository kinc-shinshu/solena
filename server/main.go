package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"net/http"
	"os"
	"time"
)

// メッセージの格納
func redisSetMessageList(key string, value []string, redisPool *redis.Pool) {
	c := redisPool.Get()
	defer c.Close()
	for _, v := range value {
		c.Do("RPUSH", key, v)
	}
}

// メッセージの取得
func redisGetMessageList(key string, redisPool *redis.Pool) []string {
	c := redisPool.Get()
	defer c.Close()
	s, err := redis.Strings(c.Do("LRANGE", key, 0, -1))
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	c.Do("DEL", key)
	return s
}

func makeCorsConfig() (corsConfig cors.Config) {
	corsConfig = cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	return
}

func RouterSetup(redisPool *redis.Pool) *gin.Engine {
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
		res := redisGetMessageList(id, redisPool)
		c.JSON(200, gin.H{
			"messageList": res,
		})
	})
	router.POST("/notify/:id", func(c *gin.Context) {
		id := c.Param("id")
		body := c.PostFormArray("body")
		redisSetMessageList(id, body, redisPool)
		c.Status(http.StatusOK)
	})
	return router
}

func newRedisPool(server string) *redis.Pool {
	return &redis.Pool{
		MaxIdle:     10,
		IdleTimeout: 240 * time.Second,
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", server)
			if err != nil {
				return nil, err
			}
			return c, err
		},
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do("PING")
			return err
		},
	}
}

func main() {
	// Redis周り
	redisCloudURL := os.Getenv("REDISCLOUD_URL")
	if redisCloudURL == "" {
		redisCloudURL = "localhost:6379"
	}
	redisPool := newRedisPool(redisCloudURL)

	// Router周り
	router := RouterSetup(redisPool)
	router.Run()
}
