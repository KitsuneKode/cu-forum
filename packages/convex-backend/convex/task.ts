import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const create = mutation({
  args: {
    text: v.string(),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('tasks', {
      ...args,
    })
  },
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').collect()
  },
})
