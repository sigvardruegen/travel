// app/api/catalog/route.ts
export async function GET(req: Request) {
  const { search } = new URL(req.url); // <-- захватываем ВСЮ строку запроса
  const backendUrl = `http://backend:8000/catalog${search}`;

  const res = await fetch(backendUrl);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
