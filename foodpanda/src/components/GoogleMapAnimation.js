import React, { useEffect, useRef, useState } from 'react';
const GOOGLE_MAPS_API_KEY = "AIzaSyAqqcudDyo4itlY1bqbDyByPh_L6GMy9cs";


const GoogleMapAnimation = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [startLat, setStartLat] = useState('');
  const [startLng, setStartLng] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLng, setEndLng] = useState('');
  const [duration, setDuration] = useState('');

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: parseFloat(startLat) || 0, lng: parseFloat(startLng) || 0 },
      zoom: 8,
    });
    markerRef.current = new window.google.maps.Marker({
      position: { lat: parseFloat(startLat) || 0, lng: parseFloat(startLng) || 0 },
      map,
    });
  };

  const animateMarker = (start, end, seconds) => {
    const map = markerRef.current.getMap();
    const marker = markerRef.current;

    let startTime;
    const durationMs = seconds * 1000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);

      const lat = start.lat + progress * (end.lat - start.lat);
      const lng = start.lng + progress * (end.lng - start.lng);

      marker.setPosition({ lat, lng });
      map.setCenter({ lat, lng });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startLat || !startLng || !endLat || !endLng || !duration) {
      alert('請填寫完整資料');
      return;
    }

    const start = { lat: parseFloat(startLat), lng: parseFloat(startLng) };
    const end = { lat: parseFloat(endLat), lng: parseFloat(endLng) };

    initMap();
    animateMarker(start, end, parseFloat(duration));
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>起始緯度：</label>
          <input type="text" value={startLat} onChange={(e) => setStartLat(e.target.value)} />
        </div>
        <div>
          <label>起始經度：</label>
          <input type="text" value={startLng} onChange={(e) => setStartLng(e.target.value)} />
        </div>
        <div>
          <label>終點緯度：</label>
          <input type="text" value={endLat} onChange={(e) => setEndLat(e.target.value)} />
        </div>
        <div>
          <label>終點經度：</label>
          <input type="text" value={endLng} onChange={(e) => setEndLng(e.target.value)} />
        </div>
        <div>
          <label>秒數：</label>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <button type="submit">開始移動</button>
      </form>
      <div ref={mapRef} style={{ width: '100%', height: '500px', marginTop: '20px' }}></div>
    </div>
  );
};

export default GoogleMapAnimation;
