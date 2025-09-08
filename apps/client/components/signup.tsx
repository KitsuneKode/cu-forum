'use client'
import Link from 'next/link'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '@/components/logo'
import { useState, useTransition } from 'react'
import { Input } from '@cu-forum/ui/components/input'
import { Label } from '@cu-forum/ui/components/label'
import { Button } from '@cu-forum/ui/components/button'
import { authClient } from '@cu-forum/convex/auth/client'
import { DomainEmailInput } from '@cu-forum/ui/components/email-domain-input'

export default function SignUp() {
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, startTransition] = useTransition()
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isEmailValid || !email || loading) return
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get('username') as string
    const name = ((formData.get('firstname') as string) +
      ' ' +
      formData.get('lastname')) as string
    const password = formData.get('pwd') as string

    console.log(email, username, name, password)

    startTransition(async () => {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          username,
        },
        {
          onError: (ctx) => {
            window.alert(ctx.error.message)
          },
          onSuccess: () => {
            router.push('/login')
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
            Create a CU-Forum Account
          </h1>
          <p className="text-sm">Welcome! Create an account to get started</p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="block text-sm">
                Firstname
              </Label>

              <Input
                type="text"
                required
                name="firstname"
                id="firstname"
                className="dark:bg-background/85"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname" className="block text-sm">
                Lastname
              </Label>
              <Input
                type="text"
                required
                name="lastname"
                className="dark:bg-background/85"
                id="lastname"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="block text-sm">
              Username
            </Label>

            <Input
              type="text"
              required
              name="username"
              className="dark:bg-background/85"
              id="username"
            />
          </div>

          <DomainEmailInput
            className="mb-4"
            label="University email"
            name="email"
            domains={['cuchd.in', 'cumail.in']}
            value={email}
            onChange={setEmail}
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

          <Button disabled={!isEmailValid || loading} className="w-full">
            {loading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Sign Up'
            )}
          </Button>
        </div>
      </div>

      <div className="p-3">
        <p className="text-accent-foreground text-center text-sm">
          Have an account ?
          <Button asChild variant="link" className="px-2">
            <Link href="/login">Sign In</Link>
          </Button>
        </p>
      </div>
    </form>
  )
}
