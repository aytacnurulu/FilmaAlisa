// placeholder
import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function GET() {
  const response = await proxyToFilmalisa("/movies", "GET");

  return response;
}

