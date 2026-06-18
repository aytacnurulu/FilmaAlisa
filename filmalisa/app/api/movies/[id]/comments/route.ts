// app/api/movies/[id]/comments/route.ts
import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyToFilmalisa(`/movies/${id}/comments`, "GET");
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  return proxyToFilmalisa(`/movies/${id}/comment`, "POST", body);
}
