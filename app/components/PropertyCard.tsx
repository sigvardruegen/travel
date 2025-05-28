import React from 'react';

type Props = {
  item: any;
};

const PropertyCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{item.name ?? 'Объект без названия'}</h2>
      <p className="text-gray-600">{item.region} • {item.type}</p>
      <p className="text-gray-800 font-medium">{item.price?.toLocaleString?.()} ₽ / ночь</p>
    </div>
  );
};

export default PropertyCard;
