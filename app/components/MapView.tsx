'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type CatalogItem = {
  id: string;
  name: string;
  region: string;
  price: number;
  coords: [number, number];
};

type Props = {
  items: CatalogItem[];
  activeItemId: string | null;
  onMarkerHover: (id: string | null) => void;
};

export default function MapView({ items, activeItemId, onMarkerHover }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Создание карты
    const map = L.map(mapRef.current).setView([55.75, 37.61], 5);
    leafletMapRef.current = map;

    // Добавление тайл-сервиса
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }, []);

  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Удалить старые маркеры
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Добавить новые маркеры
    items.forEach(item => {
      const isActive = item.id === activeItemId;

      const icon = new L.Icon({
        iconUrl: isActive
          ? 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-red.png'
          : 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const marker = L.marker(item.coords, { icon })
        .addTo(map)
        .bindPopup(`<strong>${item.name}</strong><br>${item.region}<br>от ${item.price} ₽/ночь`);

      marker.on('mouseover', () => onMarkerHover(item.id));
      marker.on('mouseout', () => onMarkerHover(null));

      markersRef.current[item.id] = marker;
    });
  }, [items, activeItemId, onMarkerHover]);

  return (
    <div style={{ width: '100%', height: '400px', border: '1px solid red' }}>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
