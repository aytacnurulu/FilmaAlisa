import { proxyToFilmalisa } from "@/lib/api/proxy";

type Params = { params: Promise<{ movieId: string; commentId: string }> };

export async function DELETE(_: Request, context: Params) {
  const { movieId, commentId } = await context.params;
  return proxyToFilmalisa(
    `/admin/movies/${movieId}/comment/${commentId}`,
    "DELETE",
  );
}
