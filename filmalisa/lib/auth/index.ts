import { cookies } from 'next/headers'

const COOKIE_NAME = 'filmalisa_token'

export async function setAuthCookie(token: string) {
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function getAuthToken(): Promise<string | undefined> {
  const jar = await cookies()
  return jar.get(COOKIE_NAME)?.value
}
