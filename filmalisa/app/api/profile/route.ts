// placeholder

import { proxyToFilmalisa } from "@/lib/api/proxy";

const GET = () => {
  return proxyToFilmalisa("/profile", "GET");
};

const PUT = async (request: Request) => {
  const body = await request.json();
  return proxyToFilmalisa("/profile", "PUT", body);
};

export { GET, PUT };
