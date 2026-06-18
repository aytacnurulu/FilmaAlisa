import { proxyToFilmalisa } from "@/lib/api/proxy";

// placeholder

const POST = async (request: Request) => {
  const body = await request.json();
  return proxyToFilmalisa("/contact", "POST", body);
};

export { POST };
