import { proxyToFilmalisa } from "@/lib/api/proxy";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, context: Params) {
  const { id } = await context.params;
  return proxyToFilmalisa(`/admin/movies/${id}`, "GET");
}

export async function PUT(request: Request, context: Params) {
  const { id } = await context.params;
  const body = await request.json();
  return proxyToFilmalisa(`/admin/movie/${id}`, "PUT", body);
}

export async function DELETE(_: Request, context: Params) {
  const { id } = await context.params;
  return proxyToFilmalisa(`/admin/movie/${id}`, "DELETE");
}
