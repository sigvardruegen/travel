export async function fetchListings(bbox: number[], filters: any) {
  const [lat1, lon1, lat2, lon2] = bbox;
  const params = new URLSearchParams({
    lat1: lat1.toString(),
    lon1: lon1.toString(),
    lat2: lat2.toString(),
    lon2: lon2.toString(),
    ...filters,
  });
  const res = await fetch(`/api/listings?${params}`);
  return await res.json();
}