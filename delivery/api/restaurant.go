package api

import (
	"delivery/action"
	"github.com/hadanhtuan/go-sdk"
)

func GetRestaurant(req *sdk.HTTPRequest, res *sdk.HTTPResponse) error {

	return res.Respond(action.GetRestaurant())
}
