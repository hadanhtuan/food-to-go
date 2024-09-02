package service

import "github.com/hadanhtuan/go-sdk/common"

func GetDeliveries() *common.APIResponse {
	return &common.APIResponse{
		StatusCode: common.APIStatus.Ok,
		Data:       "data of deliveries",
	}
}
