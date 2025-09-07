import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    emailVerified: v.boolean(),
    name: v.string(),
    username: v.string(),
    // Fields are optional
  })
    .index('by_email', ['email'])
    .index('by_username', ['username']),

  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  communities: defineTable({
    name: v.string(),
    description: v.string(),
    mods: v.optional(v.array(v.string())),
    createdBy: v.string(),
  }).index('by_name', ['name']),
})
