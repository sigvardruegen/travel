
export const dynamic = 'force-dynamic';

import FiltersSidebar from './components/FiltersSidebar';
import PropertyCard from './components/PropertyCard';
import MapView from './components/MapView';
import { CatalogItem } from './lib/types';

export default async function CatalogPage() {
  let data: { items: CatalogItem[] } = { items: [] };

  try {
    const res = await fetch('http://localhost:8000/catalog?bbox=20,50,60,80');
    if (res.ok) {
      data = await res.json();
    } else {
      console.error('Failed to fetch catalog:', res.statusText);
    }
  } catch (error) {
    console.error('Error fetching catalog:', error);
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr_400px] h-screen">
      <FiltersSidebar />
      <section className="overflow-y-auto p-4">
        {data.items.map((item) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </section>
      <MapView items={data.items} />
    </main>
  );
}
