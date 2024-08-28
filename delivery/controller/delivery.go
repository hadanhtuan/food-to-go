package controller

import (
	"delivery/service"
	"github.com/hadanhtuan/go-sdk"
)

func GetDeliveries(req *sdk.HTTPRequest, res *sdk.HTTPResponse) error {
	return res.Respond(service.GetDeliveries())
}
