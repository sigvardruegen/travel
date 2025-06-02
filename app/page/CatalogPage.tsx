'use client';

import { useEffect, useState } from 'react';
import FiltersSidebar from '../components/FiltersSidebar';
import PropertyCard from '../components/PropertyCard';
import dynamic from 'next/dynamic';
import { CatalogItem } from '../lib/types';

const MapView = dynamic(() => import('../components/MapClientOnly'), { ssr: false });

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);

  useEffect(() => {
    console.log("CatalogPage loaded");
    fetch('/api/catalog?bbox=20,50,60,80')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched items", data.items);
        setItems(data.items);
      })
      .catch(err => console.error('fetch error', err));
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr_400px] h-screen">
      <FiltersSidebar />
      <section className="overflow-y-auto p-4 h-full">
        {items.map((item) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </section>
      <MapView />
    </main>
  );
}
