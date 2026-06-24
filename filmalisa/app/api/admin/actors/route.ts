import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function GET() {
  return proxyToFilmalisa("/admin/actors", "GET");
}

export async function POST(request: Request) {
  const body = await request.json();
  return proxyToFilmalisa("/admin/actor", "POST", body);
}
