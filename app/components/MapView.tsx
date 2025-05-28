
import React from 'react';

type Props = {
  items: any[];
};

const MapView: React.FC<Props> = ({ items }) => {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="text-lg font-semibold">Карта с {items.length} объектами</h2>
    </div>
  );
};

export default MapView;
