import { NextRequest, NextResponse } from 'next/server'
import { setAuthCookie } from '@/lib/auth'

const BASE_URL = 'https://api.sarkhanrahimli.dev/api/filmalisa'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const upstream = await fetch(`${BASE_URL}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const body = await upstream.json()

  if (!upstream.ok || !body.result) {
    return NextResponse.json(
      { error: body.message ?? 'Login failed' },
      { status: upstream.status }
    )
  }

  await setAuthCookie(body.data.tokens.access_token)
  return NextResponse.json({ data: body.data.profile })
}
