import React, { useEffect, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAqqcudDyo4itlY1bqbDyByPh_L6GMy9cs";

const GoogleMapAnimation = ({ startLat, startLng, endLat, endLng, duration }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const directionsService = useRef(null);
  const polyline = useRef(null);
  const untraversedPolyline = useRef(null);

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: parseFloat(startLat) || 0, lng: parseFloat(startLng) || 0 },
      zoom: 16, // 預設放大比例
    });
    markerRef.current = new window.google.maps.Marker({
      position: { lat: parseFloat(startLat) || 0, lng: parseFloat(startLng) || 0 },
      map,
    });

    directionsService.current = new window.google.maps.DirectionsService();
  };

  const animateMarker = (path, seconds) => {
    const map = markerRef.current.getMap();
    const marker = markerRef.current;

    let startTime;
    const durationMs = seconds * 1000;
    const totalSteps = path.length - 1;

    // 初始化路徑樣式
    polyline.current = new window.google.maps.Polyline({
      path: [],
      strokeColor: "#000000", // 已經過的部分為黑色
      strokeOpacity: 1.0,
      strokeWeight: 4,
      map,
    });

    untraversedPolyline.current = new window.google.maps.Polyline({
      path,
      strokeColor: "#808080", // 未經過的部分為灰色
      strokeOpacity: 0.6,
      strokeWeight: 4,
      map,
    });

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = Math.min((timestamp - startTime) / durationMs, 1);

      const stepIndex = Math.floor(elapsed * totalSteps);
      const nextStepIndex = Math.min(stepIndex + 1, totalSteps);

      const stepProgress = (elapsed * totalSteps) % 1;

      const lat = path[stepIndex].lat + stepProgress * (path[nextStepIndex].lat - path[stepIndex].lat);
      const lng = path[stepIndex].lng + stepProgress * (path[nextStepIndex].lng - path[stepIndex].lng);

      // 更新標記位置
      marker.setPosition({ lat, lng });

      // 更新地圖中心，保持標記在中央
      map.setCenter({ lat, lng });

      // 更新已經過的路徑
      const traversedPath = path.slice(0, stepIndex + 1);
      traversedPath.push({ lat, lng }); // 加上當前位置
      polyline.current.setPath(traversedPath);

      // 更新未經過的路徑
      const remainingPath = path.slice(stepIndex + 1);
      untraversedPolyline.current.setPath(remainingPath);

      if (elapsed < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const getRoute = () => {
    const start = { lat: parseFloat(startLat), lng: parseFloat(startLng) };
    const end = { lat: parseFloat(endLat), lng: parseFloat(endLng) };

    directionsService.current.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          const path = result.routes[0].overview_path.map((point) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          animateMarker(path, parseFloat(duration));
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = () => {
      initMap();
      getRoute();
    };
    document.head.appendChild(script);
  }, [startLat, startLng, endLat, endLng, duration]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '500px', marginTop: '20px' }}></div>
    </div>
  );
};

export default GoogleMapAnimation;
