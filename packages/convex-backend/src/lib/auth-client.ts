import { convexClient } from '@convex-dev/better-auth/client/plugins'
import { createAuthClient } from '@cu-forum/auth/client'

export const authClient = createAuthClient({
  plugins: [convexClient()],
})
