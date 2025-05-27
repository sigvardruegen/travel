'use client';
import dynamic from 'next/dynamic';
const MapClient = dynamic(() => import('./_MapClient'), { ssr: false });

export default function MapView({ items }: { items: any[] }) {
  return (
    <aside className="hidden md:block h-full">
      <MapClient items={items} />
    </aside>
  );
}