import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CatalogItem } from '../lib/types';

export default function MapClient({ items }: { items: CatalogItem[] }) {
  return (
    <MapContainer center={[55.75, 37.57]} zoom={6} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {items.map((item: CatalogItem) => (
        <Marker key={item.id} position={[item.coords[1], item.coords[0]]}>
          <Popup>
            <strong>{item.name}</strong><br />
            от {item.price} ₽
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}