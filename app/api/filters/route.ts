export async function GET() {
  const res = await fetch("http://localhost:8000/filters");
  const data = await res.json();
  return Response.json(data);
}