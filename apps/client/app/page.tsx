'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useTRPC } from '@/trpc/client'
import { prisma } from '@cu-forum/store'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@cu-forum/ui/components/button'
import { Textarea } from '@cu-forum/ui/components/textarea'
import { DomainEmailInput } from '@cu-forum/ui/components/email-domain-input'

export default function Home() {
  const [email, setEmail] = useState('')
  const trpc = useTRPC()
  const convexData = useQuery(
    trpc.user.hello.queryOptions({
      text: 'hi',
    }),
  )

  const { data, error } = useQuery(trpc.auth.getAllUser.queryOptions())

  return (
    <div className="flex h-[calc(200vh)] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-center">
          <h1 className="text-2xl font-bold">Hello World</h1>
          <Button size="sm">Button</Button>
          <Textarea />
          <h1 className="font-mono text-2xl">Email: {email}</h1>
          <DomainEmailInput
            label="University email"
            name="email"
            domains={['cuchd.in', 'cumail.in']}
            defaultDomain="cuchd.in"
            value={email}
            onChange={setEmail}
            description="Sign in with the official CU domain."
            required
          />
          {convexData?.data?.greeting}
          {data?.map((user) => user.email).join(', ')}
          {error && <p>{error.message}</p>}
        </main>
        <div>
          <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </footer>
        </div>
      </div>
    </div>
  )
}
