import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./AddressDialog.css"; // 引入 CSS

const GOOGLE_MAPS_API_KEY = "AIzaSyAqqcudDyo4itlY1bqbDyByPh_L6GMy9cs";

const AddressDialog = ({ open, onClose, onSubmit, defaultAddress }) => {
  const [address, setAddress] = useState(defaultAddress || ""); // 預設地址
  const [map, setMap] = useState(null); // 地圖實例
  const [marker, setMarker] = useState(null); // 標記實例

  const handleSubmit = () => {
    onSubmit(address);
    onClose();
  };

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

  const initializeMap = () => {
    const defaultLocation = { lat: 25.033, lng: 121.5654 }; // 預設座標
    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: defaultLocation,
        zoom: 15,
      }
    );

    const customIcon = {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <path d="M15.5 32C18.2614 32 20.5 31.1046 20.5 30C20.5 28.8954 18.2614 28 15.5 28C12.7386 28 10.5 28.8954 10.5 30C10.5 31.1046 12.7386 32 15.5 32Z" fill-opacity="0.04"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 0C20.7467 0 25 4.24151 25 9.47368C25 14.1904 21.5435 18.102 17.0187 18.827C16.9237 18.8422 16.7992 18.8588 16.6455 18.8766C16.4438 18.9001 16.2917 19.0709 16.2917 19.274L16.2917 29.2083C16.2917 29.6456 15.9372 30 15.5 30C15.0628 30 14.7083 29.6456 14.7083 29.2083L14.7083 19.274C14.7083 19.071 14.5561 18.9002 14.3544 18.8767C14.2045 18.8593 14.0829 18.8432 13.9898 18.8283C9.46085 18.1069 6 14.1933 6 9.47368C6 4.24151 10.2533 0 15.5 0Z"></path>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 32),
    };

    const markerInstance = new window.google.maps.Marker({
      position: defaultLocation,
      map: mapInstance,
      icon: customIcon,
      draggable: true,
    });

    setMap(mapInstance);
    setMarker(markerInstance);

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

    markerInstance.addListener("dragend", (event) => {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      updateAddressFromCoordinates(newLat, newLng);
    });

    mapInstance.addListener("click", (event) => {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();

      markerInstance.setPosition({ lat: clickedLat, lng: clickedLng });
      updateAddressFromCoordinates(clickedLat, clickedLng);
    });
  };

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" className="dialog-container">
      <DialogTitle className="dialog-title">更改送餐地址</DialogTitle>
      <DialogContent>
        <TextField
          className="address-input"
          label="輸入你的欲送達的地址"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div id="map" className="map-container"></div>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={handleSubmit}>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog;
