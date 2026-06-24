import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function GET() {
  return proxyToFilmalisa("/admin/contacts", "GET");
}
