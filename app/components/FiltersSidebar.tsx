'use client';
import { useEffect, useState } from 'react';

export default function FiltersSidebar() {
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    async function loadFilters() {
      const [f, r] = await Promise.all([
        fetch('/api/filters').then(res => res.json()),
        fetch('/api/regions').then(res => res.json())
      ]);
      setFilters({ filters: f, regions: r });
    }
    loadFilters();
  }, []);

  return (
    <aside className="bg-gray-100 p-4 border-r border-gray-200">
      <h2 className="font-bold mb-2">Фильтры</h2>
      {filters.filters && filters.filters.map((f: any) => (
        <div key={f.id} className="mb-2">{f.name}</div>
      ))}
      {filters.regions && <div className="mt-4 text-sm text-gray-500">Регионы: {filters.regions.join(', ')}</div>}
    </aside>
  );
}