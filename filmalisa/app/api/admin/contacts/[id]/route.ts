import { proxyToFilmalisa } from "@/lib/api/proxy";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_: Request, context: Params) {
  const { id } = await context.params;
  return proxyToFilmalisa(`/admin/contact/${id}`, "DELETE");
}
