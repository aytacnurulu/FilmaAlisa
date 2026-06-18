// lib/api/client.ts
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(path, options);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  const body = await res.json();
  return body.data;
}
