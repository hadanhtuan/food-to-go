package controller

import (
	"delivery/service"
	"github.com/hadanhtuan/go-sdk"
)

func GetRestaurant(req *sdk.HTTPRequest, res *sdk.HTTPResponse) error {
	return res.Respond(service.GetRestaurant())
}
