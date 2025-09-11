'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '@/components/logo'
import useDebounce from '@/hooks/use-debounce'
import { useState, useTransition } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '@cu-forum/auth/client'
import { Input } from '@cu-forum/ui/components/input'
import { Label } from '@cu-forum/ui/components/label'
import { Check, Loader, X, Skull } from 'lucide-react'
import { toast } from '@cu-forum/ui/components/sonner'
import { useLoginModal } from '@/store/use-login-modal'
import { Button } from '@cu-forum/ui/components/button'
import { useSignUpModal } from '@/store/use-sign-up-modal '
import { DomainEmailInput } from '@cu-forum/ui/components/email-domain-input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@cu-forum/ui/components/input-otp'

export default function SignUp({ modal = false }: { modal?: boolean }) {
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [loading, startTransition] = useTransition()

  const router = useRouter()

  const { close: signupClose } = useSignUpModal()
  const { open: loginOpen } = useLoginModal()

  const [otpVerification, setOTPVerification] = useState(false)

  const debouncedUserName = useDebounce(username, 300)
  const [verificationLoading, startVerificationTransaction] = useTransition()

  const { data: dataUserName, isLoading: isLoadingUserName } = useQuery({
    queryKey: ['username', debouncedUserName],
    queryFn: () => {
      if (!debouncedUserName) {
        return
      }
      return authClient.isUsernameAvailable(
        { username: debouncedUserName },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
        },
      )
    },
    enabled: !!debouncedUserName,
  })

  const usernameAvailable = dataUserName?.data?.available
  const usernameError = dataUserName?.error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !isEmailValid ||
      !email ||
      loading ||
      !usernameAvailable ||
      usernameError ||
      isLoadingUserName ||
      !debouncedUserName
    ) {
      toast.error('Please fill all the fields')
      return
    }

    const formData = new FormData(e.target as HTMLFormElement)
    const name = ((formData.get('firstname') as string) +
      ' ' +
      formData.get('lastname')) as string
    const password = formData.get('pwd') as string

    console.log(email, debouncedUserName, name, password)

    startTransition(async () => {
      const { data } = await authClient.signUp.email(
        {
          email: email.toLowerCase(),
          password,
          name,
          username: debouncedUserName,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
        },
      )
      if (data) {
        console.log(data)
        await authClient.emailOtp.sendVerificationOtp(
          {
            email: email.toLowerCase(),
            type: 'email-verification',
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.statusText)
              toast.error(ctx.error.name)
              console.log(ctx.error)
              toast.error(ctx.error.message)
            },
            onSuccess: () => {
              setOTPVerification(true)
              // if (modal) signupClose()
              // router.push('/login')
            },
          },
        )
      }
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
            {otpVerification
              ? 'Verify your email'
              : 'Create a CU-Forum Account'}
          </h1>
          <p className="text-sm">
            {otpVerification
              ? `OTP sent to ${email}`
              : 'Welcome! Create an account to get started'}
          </p>
        </div>
        {otpVerification ? (
          <div className="mt-6 flex w-full flex-col items-center justify-center space-y-2">
            <Label htmlFor="otp" className="text-md">
              One time password
            </Label>
            <InputOTP
              id="otp"
              maxLength={6}
              disabled={verificationLoading}
              onComplete={async (otp) => {
                startVerificationTransaction(async () => {
                  await authClient.emailOtp.verifyEmail(
                    {
                      email: email.toLowerCase(),
                      otp,
                    },
                    {
                      onError: (ctx) => {
                        toast.error(ctx.error.message)
                      },
                      onSuccess: (ctx) => {
                        console.log(ctx.data)

                        toast.success('Email verified successfully')
                        setTimeout(() => {
                          if (modal) signupClose()
                          router.push('/dashboard')
                        }, 300)
                      },
                    },
                  )
                })
              }}
            >
              <InputOTPGroup className="bg-background rounded-md">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="bg-background rounded-md">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-muted-foreground text-xs">
              Please enter the one-time password sent to your email.
            </p>

            <div className="p-3" />
          </div>
        ) : (
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
                  placeholder="John"
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
                  placeholder="Doe"
                  className="dark:bg-background/85"
                  id="lastname"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="block text-sm">
                Username
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  required
                  name="username"
                  placeholder="johndoe12312"
                  className="dark:bg-background/85"
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value.toLowerCase())
                  }}
                />
                <div className="flex items-center gap-4">
                  {isLoadingUserName && (
                    <Loader size={18} className="animate-spin" />
                  )}
                  {!isLoadingUserName && usernameAvailable && (
                    <Check className="text-green-500" size={18} />
                  )}
                  {debouncedUserName &&
                    !isLoadingUserName &&
                    !usernameAvailable && (
                      <X className="text-red-500" size={18} />
                    )}
                  {debouncedUserName && usernameError && (
                    <Skull className="text-red-500" size={18} />
                  )}
                </div>
              </div>
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
                placeholder="********"
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
        )}
      </div>

      {!otpVerification && (
        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            {modal ? (
              <Button
                variant="link"
                className="px-2"
                onClick={() => {
                  signupClose()
                  loginOpen()
                }}
              >
                Sign In
              </Button>
            ) : (
              <Button asChild variant="link" className="px-2">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </p>
        </div>
      )}
    </form>
  )
}
