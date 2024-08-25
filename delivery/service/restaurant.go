package service

import "github.com/hadanhtuan/go-sdk/common"


func GetRestaurant() *common.APIResponse {
	return &common.APIResponse{
		Status: common.APIStatus.Ok,
		Data: "good",
	}
}