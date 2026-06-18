// lib/api/proxy.ts
import { cookies } from "next/headers";

const BASE_URL = "https://api.sarkhanrahimli.dev/api/filmalisa";

export async function proxyToFilmalisa(
  path: string,
  method: string,
  body?: unknown,
): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get("filmalisa_token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const upstream = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept-Language": "en",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await upstream.json();

  return new Response(JSON.stringify(data), {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
