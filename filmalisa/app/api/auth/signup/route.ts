import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://api.sarkhanrahimli.dev/api/filmalisa'

export async function POST(req: NextRequest) {
  const { full_name, email, password } = await req.json()

  
  const upstream = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name, email, password }),
  })

  const body = await upstream.json()

  if (!upstream.ok || !body.result) {
    return NextResponse.json(
      { error: body.message ?? 'Signup failed' },
      { status: upstream.status }
    )
  }

  return NextResponse.json({ success: true })
}
