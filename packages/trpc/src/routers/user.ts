import { z } from 'zod'
import { prisma } from '@cu-forum/store'
import type { TRPCRouterRecord } from '@trpc/server'
import { protectedProcedure, publicProcedure } from '../trpc'

export const userRouter = {
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
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
      return prisma.user.update({
        data: {
          name: opts.input.name,
        },
        where: {
          email: 'test@das.com',
        },
      })
    }),
} satisfies TRPCRouterRecord
