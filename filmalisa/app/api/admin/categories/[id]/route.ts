import { proxyToFilmalisa } from "@/lib/api/proxy";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Params) {
  const { id } = await context.params;
  const body = await request.json();
  return proxyToFilmalisa(`/admin/category/${id}`, "PUT", body);
}

export async function DELETE(_: Request, context: Params) {
  const { id } = await context.params;
  return proxyToFilmalisa(`/admin/category/${id}`, "DELETE");
}
