'use client';
import { useEffect, useState } from 'react';
import { FiltersResponse } from '../lib/types';

export default function FiltersSidebar() {
  const [filters, setFilters] = useState<FiltersResponse | null>(null);
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      const [filtersRes, regionsRes] = await Promise.all([
        fetch('/api/filters').then(res => res.json()),
        fetch('/api/regions').then(res => res.json())
      ]);
      setFilters(filtersRes);
      setRegions(regionsRes);
    }
    loadData();
  }, []);

  return (
    <aside className="bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Фильтры</h2>
      {filters && (
        <>
          <div>
            <strong>Типы:</strong>
            <ul>{filters.types.map(type => <li key={type}>{type}</li>)}</ul>
          </div>
          <div>
            <strong>Особенности:</strong>
            <ul>{filters.features.map(f => <li key={f}>{f}</li>)}</ul>
          </div>
        </>
      )}
      {regions.length > 0 && (
        <div>
          <strong>Регионы:</strong>
          <ul>{regions.map(region => <li key={region}>{region}</li>)}</ul>
        </div>
      )}
    </aside>
  );
}