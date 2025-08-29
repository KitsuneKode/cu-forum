'use client'

import * as React from 'react'
import { ConvexReactClient } from 'convex/react'
// import { TRPCReactProvider } from '@/trpc/client'
import { authClient } from '@cu-forum/convex/auth/client'
import { ConvexBetterAuthProvider } from '@cu-forum/convex'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ConvexBetterAuthProvider authClient={authClient} client={convex}>
        {/* <TRPCReactProvider> */}
        {children}
        {/* </TRPCReactProvider> */}
      </ConvexBetterAuthProvider>
    </NextThemesProvider>
  )
}
