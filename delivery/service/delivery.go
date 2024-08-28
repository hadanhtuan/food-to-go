package service

import "github.com/hadanhtuan/go-sdk/common"

func GetDeliveries() *common.APIResponse {
	return &common.APIResponse{
		Status: common.APIStatus.Ok,
		Data:   "data of deliveries",
	}
}
