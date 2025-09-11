import { publicProcedure, protectedProcedure } from '../trpc'
import type { TRPCRouterRecord } from '@trpc/server'
import { prisma } from '@cu-forum/store'
export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can see this secret message!'
  }),
  getAllUser: publicProcedure.query(() => {
    return prisma.user.findMany()
  }),
} satisfies TRPCRouterRecord
