// placeholder
import { cookies } from "next/headers";
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("filmalisa_token")?.value;
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const upstream = await fetch(
    "https://api.sarkhanrahimli.dev/api/filmalisa/movies",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const body = await upstream.json();

  if (!upstream.ok) {
    return new Response(
      JSON.stringify({ error: body.message ?? "Failed to fetch movies" }),
      {
        status: upstream.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

}


