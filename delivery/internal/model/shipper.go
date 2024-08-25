package model

import (
	"github.com/hadanhtuan/go-sdk/database/postgres"
	"gorm.io/gorm"
	"time"
)

type Shipper struct {
	ID        string     `json:"id" gorm:"default:gen_random_uuid()"`
	CreatedAt time.Time  `json:"createdAt,omitempty"`
	UpdatedAt time.Time  `json:"updatedAt,omitempty"`
	DeletedAt *time.Time `json:"deletedAt,omitempty" gorm:"index"`
}

func (Shipper) TableName() string {
	return "shipper"
}

var ShipperDB = &pg.Instance{
	TableName: "shipper",
	Model:     &Shipper{},
}

func InitTableShipper(db *gorm.DB) {
	db.AutoMigrate(&Shipper{})
	ShipperDB.ApplyDatabase(db)
}
