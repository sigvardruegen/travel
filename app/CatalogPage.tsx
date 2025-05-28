'use client';

import { useEffect, useState } from 'react';
import FiltersSidebar from './components/FiltersSidebar';
import PropertyCard from './components/PropertyCard';
import MapView from './components/MapView';
import { CatalogItem } from './lib/types';

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);

  useEffect(() => {
    fetch('/api/catalog?bbox=20,50,60,80')
      .then(res => res.json())
      .then(data => setItems(data.items))
      .catch(err => console.error('fetch error', err));
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr_400px] h-screen">
      <FiltersSidebar />
      <section className="overflow-y-auto p-4">
        {items.map((item) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </section>
      <MapView items={items} />
    </main>
  );
}