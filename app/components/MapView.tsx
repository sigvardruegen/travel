'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CatalogItem } from '../lib/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Настройка иконки
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

type Props = {
  items: CatalogItem[];
};

function parseCoords(coords: any): [number, number] | null {
  if (!coords || coords.type !== 'Point' || !Array.isArray(coords.coordinates)) return null;
  const [lon, lat] = coords.coordinates;
  if (typeof lat !== 'number' || typeof lon !== 'number') return null;
  return [lat, lon];
}

export default function MapView({ items }: Props) {
  const defaultCenter: [number, number] = [55.751244, 37.618423];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((item) => {
          const coords = parseCoords(item.coords);
          if (!coords) return null;

          return (
            <Marker key={item.id} position={coords}>
              <Popup>
                <strong>{item.name}</strong>
                <br />
                {item.region} — {item.type}
                <br />
                {item.price?.toLocaleString()} ₽ / ночь
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
