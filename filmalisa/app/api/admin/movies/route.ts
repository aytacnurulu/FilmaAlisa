import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "https://api.sarkhanrahimli.dev/api/filmalisa";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${BASE_URL}/movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}