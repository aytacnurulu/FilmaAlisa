// placeholder
import { proxyToFilmalisa } from "@/lib/api/proxy";

type Params = { params: Promise<{ id: string; commentId: string }> };

export async function DELETE(_: Request, context: Params) {
  const { id, commentId } = await context.params;
  return proxyToFilmalisa(`/admin/movies/${id}/comment/${commentId}`, "DELETE");
}
