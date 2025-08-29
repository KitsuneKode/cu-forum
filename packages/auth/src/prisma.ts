import { betterAuth, type User } from 'better-auth'
import { prisma } from '@cu-forum/store'
export { fromNodeHeaders, toNodeHandler } from 'better-auth/node'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

export const authWithPrisma = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    //   google: {
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // },
  },
  session: {
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      expiresIn: 60 * 60 * 24 * 7, // 7 days
    },
  },

  cookies: {
    session: {
      name: 'auth_session',
      options: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      },
    },
  },

  advanced: {
    database: {
      generateId: () => Bun.randomUUIDv7(),
    },
  },
  callbacks: {
    onUserCreated: async (user: User) => {
      console.log('New user created:', user.email)
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
})
