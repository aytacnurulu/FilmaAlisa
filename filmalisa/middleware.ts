import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/', '/login', '/signup', '/admin/login']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('filmalisa_token')?.value

  if (token && (pathname === '/' || pathname === '/login')) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
