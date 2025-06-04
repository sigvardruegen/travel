import React from 'react';
import { CatalogItem } from '../lib/types';

type Props = {
  item: CatalogItem;
  active?: boolean;
};

const PropertyCard: React.FC<Props> = ({ item, active }) => {
  return (
    <div
      className={`border p-4 rounded shadow transition-all ${
        active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      }`}
    >
      <h2 className="text-lg font-semibold">
        {item.name ?? 'Объект без названия'}
      </h2>
      <p className="text-gray-600">{item.region} • {item.type}</p>
      <p className="text-gray-800 font-medium">
        {item.price?.toLocaleString()} ₽ / ночь
      </p>
    </div>
  );
};

export default PropertyCard;
