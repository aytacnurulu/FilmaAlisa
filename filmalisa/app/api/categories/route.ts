import { proxyToFilmalisa } from "@/lib/api/proxy";

// placeholder
const GET = () => {
  return proxyToFilmalisa("/categories", "GET");
};

export {GET}  