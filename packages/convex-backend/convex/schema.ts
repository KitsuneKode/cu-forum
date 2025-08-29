import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    // Fields are optional
  }),
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
})
