import FiltersSidebar from './components/FiltersSidebar';
import PropertyCard from './components/PropertyCard';
import MapView from './components/MapView';

export default function CatalogPage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr_400px] h-screen">
      <FiltersSidebar />
      <section className="overflow-y-auto p-4">
        {[...Array(10)].map((_, i) => <PropertyCard key={i} />)}
      </section>
      <MapView />
    </main>
  );
}