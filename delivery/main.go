package main

import (
	"delivery/api"
	"delivery/internal/config"
	"github.com/hadanhtuan/go-sdk"
	"github.com/hadanhtuan/go-sdk/common"
)

func main() {

	app := &sdk.App{
		Name: "Restaurant Service",
	}

	startAppWithRoute(app)
}


func startAppWithRoute(app *sdk.App) {
	server := app.NewHTTPServer(config.AppConfig.Server.Host, config.AppConfig.Server.Port)

	server.AddHandler(common.HTTPMethod.GET, "restaurant", api.GetRestaurant)
	server.AddHandler(common.HTTPMethod.POST, "restaurant/create", api.GetRestaurant)
	server.AddHandler(common.HTTPMethod.DELETE, "restaurant/delete", api.GetRestaurant)

	app.Start()
}