export default function PropertyCard({ item }: { item: any }) {
  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <img src={item.image || '/mock-img.jpg'} alt={item.name} className="h-40 w-full object-cover mb-2" />
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.location}</p>
      <p className="text-green-700 font-semibold mt-1">от {item.price} ₽</p>
    </div>
  );
}