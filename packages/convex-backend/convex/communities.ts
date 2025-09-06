import { mutation } from './_generated/server'
import { getCurrentUser } from './auth'
import { v } from 'convex/values'

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    createdBy: v.string(),
    mods: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    return await ctx.db.insert('communities', {
      ...args,
    })
  },
})
