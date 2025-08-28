import { createTRPCRouter } from '@cu-forum/trpc/trpc'
import { authRouter } from '@cu-forum/trpc/routers/auth'
import { userRouter } from '@cu-forum/trpc/routers/user'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
