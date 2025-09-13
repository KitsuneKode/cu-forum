import { communityRouter } from './community'
import { createTRPCRouter } from '../trpc'
import { userRouter } from './user'
import { authRouter } from './auth'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  community: communityRouter,
})

export type AppRouter = typeof appRouter
