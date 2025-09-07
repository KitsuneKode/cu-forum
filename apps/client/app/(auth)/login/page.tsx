import { Suspense } from 'react'
import { Loader } from 'lucide-react'
import Login from '@/components/login'
import { fetchQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'
import { createAuth } from '@cu-forum/convex/auth'
import { api, getToken } from '@cu-forum/convex/index'

export default async function LoginPage() {
  const token = await getToken(createAuth)
  const auth = await fetchQuery(api.auth.getCurrentUser, {}, { token })

  console.log(auth)
  if (auth) {
    redirect('/dashboard')
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader className="h-5 w-5 animate-spin" />
        </div>
      }
    >
      <Login />
    </Suspense>
  )
}
