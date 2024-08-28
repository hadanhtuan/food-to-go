package main

import (
	"delivery/controller"
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

	server.AddHandler(common.HTTPMethod.POST, "delivery", controller.GetDeliveries)

	server.AddHandler(common.HTTPMethod.POST, "restaurant", controller.GetRestaurant)
	server.AddHandler(common.HTTPMethod.POST, "restaurant/create", controller.GetRestaurant)
	server.AddHandler(common.HTTPMethod.DELETE, "restaurant/delete", controller.GetRestaurant)

	app.Start()
}
