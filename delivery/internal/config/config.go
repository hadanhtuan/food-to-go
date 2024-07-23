package config

import (
	"fmt"

	"github.com/spf13/viper"
)

// ENV of http, cors, grpc, aws, postgresql, redis, elastic, rabbitmq
type config struct {
	Server  ServerEnv
	Client  HTTPClient
	Postgre PostgreEnv
	Cache   CacheEnv
	AWS     AWSEnv
	AMQP    AMQPEnv
	ES      ESEnv
}

// Global variable for using config in SDK

type ServerEnv struct {
	Host                    string `mapstructure:"HOST"`
	Port                    string `mapstructure:"PORT"`
	TrustedDomain           string `mapstructure:"TRUSTED_DOMAIN"`
	LogPath                 string `mapstructure:"LOG_PATH"`
	ApiPath                 string `mapstructure:"API_PATH"`
	LimitRequest            int    `mapstructure:"LIMIT_REQUEST"`
	LimitRequestPerSecond   int    `mapstructure:"LIMIT_REQUEST_PER_SECOND"`
	RequestTimeoutPerSecond int    `mapstructure:"REQUEST_TIMEOUT_PER_SECOND"`
}

type HTTPClient struct {
	OrderServiceHost string `mapstructure:"ORDER_HOST"`
	OrderServicePort string `mapstructure:"ORDER_PORT"`
}

type PostgreEnv struct {
	Host     string `mapstructure:"PG_HOST"`
	Port     string `mapstructure:"PG_PORT"`
	DBName   string `mapstructure:"PG_NAME"`
	DBUser   string `mapstructure:"PG_USER"`
	Password string `mapstructure:"PG_PWD"`
}

type CacheEnv struct {
	CacheHost string `mapstructure:"CACHE_HOST"`
	CachePort string `mapstructure:"CACHE_PORT"`
	CachePass string `mapstructure:"CACHE_PWD"`
	CacheDB   int    `mapstructure:"CACHE_DB"`
}

type AWSEnv struct {
	Region string `mapstructure:"AWS_REGION"`
	KMSKey string `mapstructure:"AWS_KMS_KEY"`
}

type AMQPEnv struct {
	Host string `mapstructure:"AMQP_HOST"`
	Port string `mapstructure:"AMQP_PORT"`
	User string `mapstructure:"AMQP_USER"`
	Pass string `mapstructure:"AMQP_PWD"`
}

type ESEnv struct {
	Host     string `mapstructure:"ES_HOST"`
	Port     int    `mapstructure:"ES_PORT"`
	Username string `mapstructure:"ES_USER"`
	Password string `mapstructure:"ES_PWD"`
}

var (
	AppConfig *config
)

func init() {
	AppConfig = new(config)

	viper.SetConfigFile("./.env")
	viper.SetConfigType("env")
	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		return
	}

	err = ParseENV(&AppConfig.Client)
	if err != nil {
		fmt.Printf("Error parsing client env. Error Detail %s", err.Error())
		return
	}
	err = ParseENV(&AppConfig.Cache)
	if err != nil {
		fmt.Printf("Error parsing cache env. Error Detail %s", err.Error())
		return
	}
	err = ParseENV(&AppConfig.Postgre)
	if err != nil {
		fmt.Printf("Error parsing postgre env. Error Detail %s", err.Error())
		return
	}
	err = ParseENV(&AppConfig.AMQP)
	if err != nil {
		fmt.Printf("Error parsing amqp env. Error Detail %s", err.Error())
		return
	}
	err = ParseENV(&AppConfig.ES)
	if err != nil {
		fmt.Printf("Error parsing elasticsearch env. Error Detail %s", err.Error())
		return
	}
	err = ParseENV(&AppConfig.AWS)
	if err != nil {
		fmt.Printf("Error parsing aws env. Error Detail %s", err.Error())
		return
	}
	err = ParseENV(&AppConfig.Server)
	if err != nil {
		fmt.Printf("Error parsing server env. Error Detail %s", err.Error())
		return
	}

	fmt.Println(AppConfig.Server.Port)
}

func ParseENV[T interface{}](object T) error {
	err := viper.Unmarshal(object)
	if err != nil {
		return err
	}
	return nil
}

// func GetCorsConfig() cors.Config {
// 	configCors := cors.DefaultConfig()
// 	configCors.AllowAllOrigins = true
// 	configCors.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "PATCH"}
// 	configCors.AllowHeaders = []string{
// 		"Origin",
// 		"Authorization",
// 		"Access-Control-Allow-Origin",
// 		"Access-Control-Allow-Headers",
// 		"Content-Type",
// 		"X-User-Agent",
// 	}
// 	configCors.ExposeHeaders = []string{
// 		"Origin",
// 		"Access-Control-Allow-Origin",
// 		"Access-Control-Allow-Headers",
// 		"Content-Type",
// 		"X-User-Agent",
// 	}
// 	configCors.AllowCredentials = true

// 	return configCors
// }
