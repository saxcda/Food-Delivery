import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const GOOGLE_MAPS_API_KEY = ""; // 填入您的 Google Maps API Key

const AddressDialog = ({ open, onClose, onSubmit, defaultAddress }) => {
  const [address, setAddress] = useState(defaultAddress || ""); // 預設地址
  const [map, setMap] = useState(null); // 地圖實例
  const [marker, setMarker] = useState(null); // 標記實例

  // 提交地址
  const handleSubmit = () => {
    onSubmit(address);
    onClose();
  };

  // 動態加載 Google Maps API
  const loadGoogleMapsApi = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // 初始化地圖
  const initializeMap = () => {
    const defaultLocation = { lat: 25.033, lng: 121.5654 }; // 預設座標
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: defaultLocation,
      zoom: 15,
    });

    const markerInstance = new window.google.maps.Marker({
      position: defaultLocation,
      map: mapInstance,
      draggable: true, // 允許拖動標記
    });

    // 更新地圖和標記狀態
    setMap(mapInstance);
    setMarker(markerInstance);

    // 監聽標記拖動事件
    markerInstance.addListener("dragend", (event) => {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      updateAddressFromCoordinates(newLat, newLng);
    });
  };

  // 使用經緯度更新地址
  const updateAddressFromCoordinates = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const location = { lat, lng };

    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address); // 更新地址
      } else {
        console.error("無法找到該位置的地址");
      }
    });
  };

  // 在地圖加載完成後初始化
  useEffect(() => {
    if (open) {
      loadGoogleMapsApi()
        .then(() => {
          initializeMap();
        })
        .catch((err) => console.error("Google Maps 加載失敗", err));
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>更改送餐地址</DialogTitle>
      <DialogContent>
        <TextField
          label="送餐地址"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <div
          id="map"
          style={{
            width: "100%",
            height: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        ></div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={handleSubmit}>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog;
