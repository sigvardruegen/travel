'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapClientOnly() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current && !mapRef.current.hasChildNodes()) {
      const map = L.map(mapRef.current).setView([55.751244, 37.618423], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '400px' }} />
    </div>
  );
}
