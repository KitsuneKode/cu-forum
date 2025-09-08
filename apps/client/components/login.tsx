'use client'
import Link from 'next/link'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '@/components/logo'
import { useState, useTransition } from 'react'
import { Input } from '@cu-forum/ui/components/input'
import { Label } from '@cu-forum/ui/components/label'
import { Button } from '@cu-forum/ui/components/button'
import { authClient } from '@cu-forum/convex/lib/auth-client'
import { DomainEmailInput } from '@cu-forum/ui/components/email-domain-input'

export default function Login() {
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const password = formData.get('pwd') as string

    if (!isEmailValid || !email || loading) return
    console.log(email, password)
    startTransition(async () => {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onError: (ctx) => {
            window.alert(ctx.error.message)
          },
          onSuccess: () => {
            router.push('/dashboard')
          },
        },
      )
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
    >
      <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
        <div className="text-center">
          <Link href="/" aria-label="go home" className="mx-auto block w-fit">
            <LogoIcon />
          </Link>
          <h1 className="mb-1 mt-4 text-xl font-semibold">
            Sign In to CU-Forum{' '}
          </h1>
          <p className="text-sm">Welcome back! Sign in to continue</p>
        </div>

        <div className="mt-6 space-y-6">
          <DomainEmailInput
            className="mb-4"
            label="University email"
            name="email"
            value={email}
            onChange={setEmail}
            domains={['cuchd.in', 'cumail.in']}
            defaultDomain="cuchd.in"
            description="Sign in with the official CU email."
            placeholder="UID"
            required
            onValidationChange={setIsEmailValid}
          />
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="pwd" className="text-sm">
                Password
              </Label>
              <Button asChild variant="link" size="sm">
                <Link
                  href="#"
                  className="link intent-info variant-ghost text-sm"
                >
                  Forgot your Password ?
                </Link>
              </Button>
            </div>

            <Input
              type="password"
              required
              name="pwd"
              id="pwd"
              className="input sz-md variant-mixed dark:bg-background/85"
            />
          </div>

          <Button className="w-full" disabled={!isEmailValid || loading}>
            {loading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
      </div>

      <div className="p-3">
        <p className="text-accent-foreground text-center text-sm">
          Don&apos;t have an account ?
          <Button asChild variant="link" className="px-2">
            <Link href="/sign-up">Create account</Link>
          </Button>
        </p>
      </div>
    </form>
  )
}
