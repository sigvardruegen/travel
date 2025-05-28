// app/api/catalog/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bbox = searchParams.get("bbox") || "";

  const res = await fetch(`http://backend:8000/catalog?bbox=${bbox}`);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}