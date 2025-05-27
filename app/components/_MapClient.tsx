import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapClient({ items }: { items: any[] }) {
  return (
    <MapContainer center={[55.75, 37.57]} zoom={6} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {items.map((item: any) => (
        <Marker key={item.id} position={[item.lat, item.lon]}>
          <Popup>
            {item.name} <br /> от {item.price} ₽
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}