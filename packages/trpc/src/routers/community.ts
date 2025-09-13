import { communityNameSchema, createCommunityInputSchema } from '@cu-forum/common/types'
import { protectedProcedure, publicProcedure } from '../trpc'
import type { TRPCRouterRecord } from '@trpc/server'
import { prisma } from '@cu-forum/store'
import { z } from 'zod'

export const communityRouter = {
  getCommunity: publicProcedure
    .input(z.object({ communityName: communityNameSchema }))
    .query(async (opts) => {
      return prisma.community.findUnique({
        where: {
          name: opts.input.communityName,
        },
      })
    }),
  isCommunityNameAvailable: protectedProcedure
    .input(z.object({ communityName: communityNameSchema }))
    .query(async (opts) => {
      return prisma.community.findUnique({
        where: {
          name: opts.input.communityName,
        },
      })
    }),
  createCommunity: protectedProcedure.input(createCommunityInputSchema).mutation(async (opts) => {
    return prisma.community.create({
      data: {
        name: opts.input.name,
        description: opts.input.description,
        creatorId: opts.ctx.session.user.id,
        moderators: {
          create: {
            assignedBy: opts.ctx.session.user.id,
            userId: opts.ctx.session.user.id,
          },
        },
      },
    })
  }),
} satisfies TRPCRouterRecord
