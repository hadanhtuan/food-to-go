package model

import (
	"github.com/hadanhtuan/go-sdk/database/postgres"
	"gorm.io/gorm"
	"time"
)

type ShippingOrder struct {
	ID        string     `json:"id" gorm:"default:gen_random_uuid()"`
	CreatedAt time.Time  `json:"createdAt,omitempty"`
	UpdatedAt time.Time  `json:"updatedAt,omitempty"`
	DeletedAt *time.Time `json:"deletedAt,omitempty" gorm:"index"`
}

func (ShippingOrder) TableName() string {
	return "shipping_order"
}

var ShippingOrderDB = &pg.Instance{
	TableName: "shipping_order",
	Model:     &ShippingOrder{},
}

func InitTableShippingOrder(db *gorm.DB) {
	db.AutoMigrate(&ShippingOrder{})
	ShippingOrderDB.ApplyDatabase(db)
}
