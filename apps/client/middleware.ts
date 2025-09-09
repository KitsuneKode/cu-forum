import { fetchQuery } from 'convex/nextjs'
import { createAuth } from '@cu-forum/convex/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { api, getSessionCookie, getToken } from '@cu-forum/convex'

export async function middleware(request: NextRequest) {
  const token = await getToken(createAuth)
  console.log(token, 'token')

  const session = await fetchQuery(api.auth.getSession, {}, { token })
  console.log('session', session)

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/dashboard'], // Apply middleware to specific routes
}
