import { createAuthClient } from 'better-auth/react' // make sure to import from better-auth/react

export const authClientWithPrisma = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export { createAuthClient }
