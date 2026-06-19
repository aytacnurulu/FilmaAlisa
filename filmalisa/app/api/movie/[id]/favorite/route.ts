import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyToFilmalisa(`/movie/${id}/favorite`, "POST");
}
