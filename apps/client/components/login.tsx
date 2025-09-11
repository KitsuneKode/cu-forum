'use client'
import Link from 'next/link'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '@/components/logo'
import { useState, useTransition } from 'react'
import { authClient } from '@cu-forum/auth/client'
import { Input } from '@cu-forum/ui/components/input'
import { Label } from '@cu-forum/ui/components/label'
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

export default function Login({ modal = false }: { modal?: boolean }) {
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, startTransition] = useTransition()

  const [showVerifyButton, setShowVerifyButton] = useState(false)
  const [otpVerification, setOTPVerification] = useState(false)
  const [verificationLoading, startVerificationTransaction] = useTransition()
  const router = useRouter()
  const { close: loginClose } = useLoginModal()
  const { open: signupOpen } = useSignUpModal()

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
          callbackURL: '/dashboard',
          rememberMe: true,
        },
        {
          onError: (ctx) => {
            console.log(ctx)
            toast.error(ctx.error.message)
            // Check if the error is related to email not being verified
            if (
              ctx.error.message.toLowerCase().includes('email not verified') ||
              ctx.error.message.toLowerCase().includes('verify your email')
            ) {
              setShowVerifyButton(true)
            }
          },
          onSuccess: () => {
            router.push('/dashboard')
          },
        },
      )
    })
  }

  const handleVerifyNow = async () => {
    if (!email) return

    startVerificationTransaction(async () => {
      await authClient.emailOtp.sendVerificationOtp(
        {
          email,
          type: 'email-verification',
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
          onSuccess: () => {
            setOTPVerification(true)
            setShowVerifyButton(false)
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
            {otpVerification ? 'Verify your email' : 'Sign In to CU-Forum'}
          </h1>
          <p className="text-sm">
            {otpVerification
              ? `OTP sent to ${email}`
              : 'Welcome back! Sign in to continue'}
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
                      email,
                      otp,
                    },
                    {
                      onError: (ctx) => {
                        toast.error(ctx.error.message)
                      },
                      onSuccess: () => {
                        toast.success('Email verified successfully')
                        setTimeout(() => {
                          if (modal) loginClose()
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
                disabled={showVerifyButton}
                id="pwd"
                placeholder="********"
                className="input sz-md variant-mixed dark:bg-background/85"
              />
            </div>
            {showVerifyButton && (
              <Button
                type="button"
                className="w-full"
                onClick={handleVerifyNow}
                disabled={verificationLoading}
              >
                {verificationLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Verify Now'
                )}
              </Button>
            )}
            <Button className="w-full" disabled={!isEmailValid || loading}>
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        )}
      </div>

      {!otpVerification && (
        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don&apos;t have an account ?
            {modal ? (
              <Button
                variant="link"
                className="px-2"
                onClick={() => {
                  loginClose()
                  signupOpen()
                }}
              >
                Create account
              </Button>
            ) : (
              <Button asChild variant="link" className="px-2">
                <Link href="/sign-up">Create account</Link>
              </Button>
            )}
          </p>
        </div>
      )}
    </form>
  )
}
