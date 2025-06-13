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

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [selectedRegion, selectedTypes, searchQuery, sortOption]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedRegion) params.append('region', selectedRegion);
    selectedTypes.forEach((type) => params.append('type', type));
    if (searchQuery) params.append('q', searchQuery);
    if (sortOption) params.append('sort', sortOption);
    params.append('bbox', '20,50,60,80');
    params.append('page', page.toString());
    params.append('per_page', '12');

    fetch(`/api/catalog?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items || data.items.length === 0) {
          setHasMore(false);
        } else {
          setItems((prev) => (page === 1 ? data.items : [...prev, ...data.items]));
        }
      })
      .catch((err) => console.error('fetch error', err));
  }, [page, selectedRegion, selectedTypes, searchQuery, sortOption]);

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
    <main className="grid grid-cols-[300px_1fr_500px] h-screen">
      {/* Левая колонка — фильтры */}
      <aside className="h-screen overflow-y-auto border-r border-gray-200">
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
      </aside>

      {/* Центральная колонка — карточки */}
      <section className="h-screen overflow-y-auto p-4">
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

      {/* Правая колонка — карта */}
      <div className="sticky top-0 h-screen w-full border-l border-gray-200">
        <MapView
          items={items}
          activeItemId={activeItemId}
          onMarkerHover={setActiveItemId}
        />
      </div>
    </main>
  );
}
