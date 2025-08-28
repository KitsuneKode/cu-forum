import { protectedProcedure, publicProcedure } from '@cu-forum/trpc/trpc'
import type { TRPCRouterRecord } from '@trpc/server'
import { prisma } from '@cu-forum/store'
import { z } from 'zod'

export const userRouter = {
  getUser: publicProcedure.query(() => {
    return { id: '1', name: 'Bilbo' }
  }),
  getAllUser: publicProcedure.query(async () => {
    return prisma.user.findMany()
  }),
  createUser: protectedProcedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of classhoice
      return prisma.user.create({
        data: opts.input,
      })
    }),
} satisfies TRPCRouterRecord
