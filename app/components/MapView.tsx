'use client';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('./_MapClient'), { ssr: false });
export default function MapView() {
  return (
    <aside className="hidden md:block">
      <Map />
    </aside>
  );
}