// app/api/movies/[id]/route.ts
import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyToFilmalisa(`/movies/${id}`, "GET");
}
