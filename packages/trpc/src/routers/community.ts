import { communityNameSchema, createCommunityInputSchema } from '@cu-forum/common/types'
import { TRPCError, type TRPCRouterRecord } from '@trpc/server'
import { protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'

export const communityRouter = {
  getCommunity: publicProcedure
    .input(z.object({ communityName: communityNameSchema }))
    .query(async ({ ctx, input }) => {
      try {
        const community = await ctx.db.community.findUnique({
          where: {
            name: input.communityName,
          },
        })
        if (!community) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Community not found' })
        }

        return community
      } catch (error) {
        // console.error(`Error in path ${path} error: ${error}`)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }
    }),
  isCommunityNameAvailable: protectedProcedure
    .input(z.object({ communityName: communityNameSchema }))
    .query(async ({ ctx, input }) => {
      try {
        const communityName = await ctx.db.community.findUnique({
          where: {
            name: input.communityName,
          },
        })
        return !communityName
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }
    }),

  createCommunity: protectedProcedure
    .input(createCommunityInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const communityNameAvailable = await ctx.db.community.findUnique({
          where: {
            name: input.name,
          },
        })

        if (communityNameAvailable) {
          throw new TRPCError({
            code: 'UNPROCESSABLE_CONTENT',
            message: `Community with name ${input.name} already exists. Please choose some other name`,
          })
        }

        const community = await ctx.db.community.create({
          data: {
            name: input.name,
            description: input.description,
            creatorId: ctx.session.user.id,
            moderators: {
              create: {
                assignedBy: ctx.session.user.id,
                userId: ctx.session.user.id,
              },
            },
          },
        })

        if (!community) {
          throw new TRPCError({ code: 'BAD_REQUEST' })
        }

        return community
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }
    }),
} satisfies TRPCRouterRecord
