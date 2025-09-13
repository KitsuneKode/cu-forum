'use client'

import * as React from 'react'
import { TRPCReactProvider } from '@/trpc/client'
import { Toaster } from '@cu-forum/ui/components/sonner'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <TRPCReactProvider>
        {children}
        <ReactQueryDevtools />
      </TRPCReactProvider>
      <Toaster />
    </NextThemesProvider>
  )
}
