
import React from 'react';

type Props = {
  item: any;
};

const PropertyCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{item.title ?? 'Без названия'}</h2>
      <p className="text-gray-600">{item.description ?? 'Описание недоступно'}</p>
    </div>
  );
};

export default PropertyCard;
