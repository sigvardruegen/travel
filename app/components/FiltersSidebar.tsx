'use client';

import React from 'react';

type Props = {
  selectedTypes: string[];
  selectedRegion: string;
  searchQuery: string;
  sortOption: string;
  onChange: (params: {
    types: string[];
    region: string;
    query: string;
    sort: string;
  }) => void;
};

const FiltersSidebar: React.FC<Props> = ({
  selectedTypes,
  selectedRegion,
  searchQuery,
  sortOption,
  onChange,
}) => {
  const regions = ['Карелия', 'Московская область'];
  const types = ['глэмпинг', 'эко-дом', 'купольный дом', 'таунхаус'];

  const toggleType = (type: string) => {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onChange({ types: updated, region: selectedRegion, query: searchQuery, sort: sortOption });
  };

  const changeRegion = (region: string) => {
    onChange({ types: selectedTypes, region, query: searchQuery, sort: sortOption });
  };

  const changeQuery = (query: string) => {
    onChange({ types: selectedTypes, region: selectedRegion, query, sort: sortOption });
  };

  const changeSort = (sort: string) => {
    onChange({ types: selectedTypes, region: selectedRegion, query: searchQuery, sort });
  };

  return (
    <aside className="p-4 border-r space-y-6">
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => changeQuery(e.target.value)}
          placeholder="Поиск по ключевым словам"
          className="w-full border px-2 py-1 mb-4 rounded"
        />
      </div>

      <div>
        <h2 className="font-bold text-lg mb-2">Тип жилья</h2>
        {types.map((type) => (
          <label key={type} className="block">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>

      <div>
        <h2 className="font-bold text-lg mb-2">Регион</h2>
        <select
          className="w-full border px-2 py-1 rounded"
          value={selectedRegion}
          onChange={(e) => changeRegion(e.target.value)}
        >
          <option value="">Все регионы</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="font-bold text-lg mb-2">Сортировка</h2>
        <select
          className="w-full border px-2 py-1 rounded"
          value={sortOption}
          onChange={(e) => changeSort(e.target.value)}
        >
          <option value="price_asc">Сначала дешевле</option>
          <option value="price_desc">Сначала дороже</option>
          <option value="name_asc">По алфавиту</option>
          <option value="name_desc">Против алфавита</option>
        </select>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
