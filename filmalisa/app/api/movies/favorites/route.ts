// placeholder
// placeholder
import { proxyToFilmalisa } from "@/lib/api/proxy";

const GET = () => {
  return proxyToFilmalisa("/movies/favorites", "GET");
};

export { GET };
