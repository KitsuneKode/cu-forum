import { betterAuth, type User } from 'better-auth'
import { prisma } from '@cu-forum/store'
export { fromNodeHeaders, toNodeHandler } from 'better-auth/node'
import { sendEmail, sendVerificationCompleteEmail } from './lib/email'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP, username } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  appName: 'CU-Forum',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {},
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },

  logger: {
    enabled: true,
    level: 'debug',
  },
  emailVerification: {
    sendOnSignIn: false,
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    async afterEmailVerification(user, request) {
      // Your custom logic here, e.g., grant access to premium features
      console.log(`${user.email} has been successfully verified!`)
      const { data, error } = await sendVerificationCompleteEmail(user.email)
      if (error) {
        return console.error({ error })
      }
      data && console.log({ data })
    },
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
      generateId: () => crypto.randomUUID(),
    },
  },
  callbacks: {
    onUserCreated: async (user: User) => {
      console.log('New user created:', user.email)
    },
  },
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      disableSignUp: true,
      sendVerificationOnSignUp: false,
      async sendVerificationOTP({ email, otp, type }) {
        console.log(email)
        const user = await prisma.user
          .findFirst({
            where: {
              email,
            },
          })
          .catch((error) => {
            console.log(error)
          })

        if (!user) {
          throw new Error('User not found')
        }

        if (type === 'sign-in') {
          return
          // Send the OTP for sign in
        } else if (type === 'email-verification') {
          if (user?.emailVerified) {
            // User is already verified (from invitation flow) - complete verification to clean up DB
            try {
              await auth.api.verifyEmailOTP({
                body: {
                  email: email,
                  otp: otp,
                },
              })

              console.log(
                `Email verification completed for ${email} - already verified via invitation`,
              )
              return
            } catch (error) {
              console.error(error)
              throw new Error(`Error completing email verification for ${email}`)
              // Continue with normal flow if verification completion fails
            }
          }
          console.log(otp, email)
          return
          // Send the OTP for email verification
          const { data, error } = await sendEmail(email, otp)
          if (error) {
            return console.error({ error })
          }
          data && console.log({ data })
          error &&
            console.error(`Error sending email verification OTP for ${email}. error: ${error}`)
        } else {
          // Send the OTP for password reset
        }
      },
      expiresIn: 600,
    }),
    username({
      usernameNormalization: (username) => {
        return username.toLowerCase()
      },
    }),
    nextCookies(),
  ], // make sure this is the last plugin in the array
})
