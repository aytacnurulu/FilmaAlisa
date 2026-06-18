// placeholder

import { proxyToFilmalisa } from "@/lib/api/proxy";

const POST = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = await params;
  return proxyToFilmalisa(`/movie/${id}/favorite`, "POST");
};

export { POST };
