import { authRouter } from './auth'
import { userRouter } from './user'
import { createTRPCRouter } from '../trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
