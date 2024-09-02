package service

import "github.com/hadanhtuan/go-sdk/common"

func GetRestaurant() *common.APIResponse {
	return &common.APIResponse{
		StatusCode: common.APIStatus.Ok,
		Data:       "good",
	}
}
