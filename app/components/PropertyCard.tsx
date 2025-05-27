export default function PropertyCard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
      <img src="/icons/mock-img.jpg" alt="property" className="h-40 w-full object-cover mb-2" />
      <h3 className="text-xl font-semibold">Название объекта</h3>
      <p className="text-sm text-gray-500">Регион • Тип жилья</p>
      <p className="text-green-600 font-bold mt-2">от 10 000 ₽/ночь</p>
      <button className="mt-2 px-4 py-2 bg-yellow-500 text-black rounded">Забронировать</button>
    </div>
  );
}