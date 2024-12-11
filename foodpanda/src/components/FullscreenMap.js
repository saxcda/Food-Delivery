import React, { useEffect, useRef } from "react";

const FullscreenMap = ({ restaurants, onClose }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      // 初始化地图
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 25.033, lng: 121.5654 }, // 台湾台北市
        zoom: 13,
      });

      // 添加图钉
      restaurants.forEach((restaurant) => {
        const { lat, lng, name } = restaurant;
        new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title: name,
        });
      });
    }
  }, [restaurants]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1001,
        }}
      >
        <button onClick={onClose} style={{ padding: "10px", cursor: "pointer" }}>
          關閉地圖
        </button>
      </div>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default FullscreenMap;
