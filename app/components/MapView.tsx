'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Проверка: нет ли уже карты в DOM
    if (!mapRef.current.hasChildNodes()) {
      const map = L.map(mapRef.current).setView([55.75, 37.61], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    }
  }, []);

  return (
    <div className="w-full h-[400px]">
      <div
        ref={mapRef}
        className="w-full h-full border border-green-500"
      />
    </div>
  );


}
