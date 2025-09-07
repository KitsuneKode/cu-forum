'use client'

import { useState } from 'react'
import { api } from '@cu-forum/convex'
import { createPost } from '@/app/actions/token'
import { Input } from '@cu-forum/ui/components/input'
import { Button } from '@cu-forum/ui/components/button'
import { authClient } from '@cu-forum/convex/auth/client'
import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useQuery,
} from 'convex/react'

export default function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <AuthLoading>
        <div>Loading...</div>
      </AuthLoading>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
      <Authenticated>
        <Dashboard />
      </Authenticated>
    </div>
  )
}

function Dashboard() {
  const [text, setText] = useState('')
  const user = useQuery(api.auth.getCurrentUser)
  return (
    <div className="space-3 flex flex-col gap-2 text-center">
      <div>Hello {user?.name}!</div>
      <Input
        placeholder="text"
        value={text}
        onChange={(e) => {
          e.preventDefault()
          setText(e.currentTarget.value)
        }}
      />
      <Button onClick={() => createPost(text)}>Create Post</Button>

      <Button onClick={() => authClient.signOut()}>Sign out</Button>
    </div>
  )
}

function SignIn() {
  const [showSignIn, setShowSignIn] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    if (showSignIn) {
      await authClient.signIn.email(
        {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        },
        {
          onError: (ctx) => {
            window.alert(ctx.error.message)
          },
        },
      )
    } else {
      await authClient.signUp.email(
        {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          username: formData.get('username') as string,
        },
        {
          onError: (ctx) => {
            window.alert(ctx.error.message)
          },
        },
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {!showSignIn && <input name="name" placeholder="Name" />}
        <input type="email" name="email" placeholder="Email" />
        <input type="username" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <Button type="submit">{showSignIn ? 'Sign in' : 'Sign up'}</Button>
      </form>
      <p>
        {showSignIn ? "Don't have an account? " : 'Already have an account? '}
        <Button onClick={() => setShowSignIn(!showSignIn)}>
          {showSignIn ? 'Sign up' : 'Sign in'}
        </Button>
      </p>
    </>
  )
}
