'use client'
import Link from 'next/link'
import { useTRPC } from '@/trpc/client'
import { Logo } from '@/components/logo'
import { useRouter } from 'next/navigation'
import { cn } from '@cu-forum/ui/lib/utils'
import React, { useTransition } from 'react'
import { Loader, Menu, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '@cu-forum/auth/client'
import ModeToggle from '@/components/theme-button'
import LoginModal from './modals/examples/login-modal'
import { toast } from '@cu-forum/ui/components/sonner'
import { useLoginModal } from '@/store/use-login-modal'
import { Button } from '@cu-forum/ui/components/button'
import SignUpModal from './modals/examples/sign-up-modal'
import { NavUser } from '@cu-forum/ui/components/nav-user'
import { useSignUpModal } from '@/store/use-sign-up-modal '

const menuItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'demo', href: '/demo' },
  { name: 'Chat', href: '/chat/12' },
  { name: 'Demo Login', href: '/demo/sign-in' },
]

export default function NavBar() {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { open: loginOpen } = useLoginModal()
  const { open: signUpOpen } = useSignUpModal()
  const [loading, startTransition] = useTransition()

  const router = useRouter()

  const api = useTRPC()
  const { data, error, isLoading, refetch } = useQuery(
    api.auth.getSession.queryOptions(),
  )

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className={cn('fixed z-20 w-full px-2')}
      >
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5',
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <ModeToggle />

                {isLoading && (
                  <div className="flex items-center justify-center">
                    <Loader className="h-5 w-5 animate-spin" />
                  </div>
                )}
                {data?.user && !isLoading && (
                  <>
                    <Button
                      onClick={async () => {
                        startTransition(async () => {
                          const { data, error } = await authClient.signOut()
                          if (error) {
                            toast.error(error.message)
                          }
                          if (data) {
                            toast.success('Signed out successfully')
                            refetch()
                            router.push('/login')
                          }
                        })
                      }}
                      size="sm"
                      className={cn('lg:inline-flex')}
                    >
                      {loading ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <span>Sign Out</span>
                      )}
                    </Button>
                    <NavUser
                      compact={true}
                      user={{
                        name: data?.user?.name!,
                        email: data?.user?.email!,
                        avatar: '/avatars/shadcn.jpg',
                      }}
                    />
                  </>
                )}
                {!data?.user && !isLoading && (
                  <>
                    <LoginModal>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(isScrolled && 'lg:hidden')}
                        onClick={loginOpen}
                      >
                        Login
                      </Button>
                    </LoginModal>
                    <SignUpModal>
                      <Button
                        size="sm"
                        className={cn(isScrolled && 'lg:hidden')}
                        onClick={signUpOpen}
                      >
                        Sign Up
                      </Button>
                    </SignUpModal>
                    <SignUpModal>
                      <Button
                        size="sm"
                        className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                        onClick={signUpOpen}
                      >
                        Get Started
                      </Button>
                    </SignUpModal>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
