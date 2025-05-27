import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapClient() {
  return (
    <MapContainer center={[55.75, 37.57]} zoom={6} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[55.75, 37.57]}>
        <Popup>Объект в Москве</Popup>
      </Marker>
    </MapContainer>
  );
}