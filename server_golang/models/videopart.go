package models

type VideoPart struct {
	VideoPartId string `json:"videoPartId"`
	Link string `json:"link"`
	StartSec int32 `json:"startSec"`
	EndSec int32 `json:"endSec"`
	Customization int32 `json:"customization"`
}