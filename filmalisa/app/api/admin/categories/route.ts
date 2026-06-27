import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function GET() {
  return proxyToFilmalisa("/admin/categories", "GET");
}

export async function POST(request: Request) {
  const body = await request.json();
  return proxyToFilmalisa("/admin/category", "POST", body);
}
