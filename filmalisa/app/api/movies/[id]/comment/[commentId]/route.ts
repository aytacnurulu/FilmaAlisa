// app/api/movies/[id]/comment/[commentId]/route.ts
import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string; commentId: string }> },
) {
  const { id, commentId } = await params;
  return proxyToFilmalisa(`/movies/${id}/comment/${commentId}`, "DELETE");
}
