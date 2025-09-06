import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    // name: v.string(),
    // Fields are optional
  }),
  // .index('by_email', ['email'])
  // .index('by_name', ['name']),
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
