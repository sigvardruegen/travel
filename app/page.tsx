import FiltersSidebar from './components/FiltersSidebar';
import PropertyCard from './components/PropertyCard';
import MapView from './components/MapView';

export default async function CatalogPage() {
  const res = await fetch('http://localhost:8000/catalog?bbox=20,50,60,80');
  const data = await res.json();

  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr_400px] h-screen">
      <FiltersSidebar />
      <section className="overflow-y-auto p-4">
        {data.listings.map((item: any) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </section>
      <MapView items={data.listings} />
    </main>
  );
}