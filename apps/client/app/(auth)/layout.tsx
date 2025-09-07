import { Providers } from '@/components/providers'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Providers>{children}</Providers>
    </div>
  )
}
