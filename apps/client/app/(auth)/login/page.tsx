import { Suspense } from 'react'
import { Loader } from 'lucide-react'
import { headers } from 'next/headers'
import Login from '@/components/login'
import { redirect } from 'next/navigation'
import { auth } from '@cu-forum/auth/server'

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  })

  console.log(session)
  if (session) {
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
      <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <Login />
      </section>
    </Suspense>
  )
}
