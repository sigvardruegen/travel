'use client';

import { useEffect, useRef, useState } from 'react';
import FiltersSidebar from '../components/FiltersSidebar';
import PropertyCard from '../components/PropertyCard';
import dynamic from 'next/dynamic';
import { CatalogItem } from '../lib/types';

const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('price_asc');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // При изменении фильтров — сброс
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [selectedRegion, selectedTypes, searchQuery, sortOption]);

  // Подгрузка данных с учётом page
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedRegion) params.append('region', selectedRegion);
    selectedTypes.forEach((type) => params.append('type', type));
    if (searchQuery) params.append('q', searchQuery);
    if (sortOption) params.append('sort', sortOption);
    params.append('bbox', '20,50,60,80');
    params.append('page', page.toString());
    params.append('per_page', '12');

    const url = `/api/catalog?${params.toString()}`;
    console.log('Fetching page:', page, url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items || data.items.length === 0) {
          setHasMore(false);
        } else {
          setItems((prev) =>
            page === 1 ? data.items : [...prev, ...data.items]
          );
        }
      })
      .catch((err) => console.error('fetch error', err));
  }, [page, selectedRegion, selectedTypes, searchQuery, sortOption]);

  // IntersectionObserver: следит за loaderRef
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef.current, hasMore]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_500px] h-screen">
      <FiltersSidebar
        selectedRegion={selectedRegion}
        selectedTypes={selectedTypes}
        searchQuery={searchQuery}
        sortOption={sortOption}
        onChange={({ region, types, query, sort }) => {
          setSelectedRegion(region);
          setSelectedTypes(types);
          setSearchQuery(query);
          setSortOption(sort);
        }}
      />

      <section className="overflow-y-auto p-4 h-full">
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveItemId(item.id)}
            onMouseLeave={() => setActiveItemId(null)}
          >
            <PropertyCard item={item} active={activeItemId === item.id} />
          </div>
        ))}
        {hasMore && (
          <div
            ref={loaderRef}
            className="h-10 flex items-center justify-center text-sm text-gray-400"
          >
            Загрузка ещё...
          </div>
        )}
      </section>

      <div className="h-[400px]">
        <MapView
          items={items}
          activeItemId={activeItemId}
          onMarkerHover={setActiveItemId}
        />
      </div>
    </main>
  );
}
