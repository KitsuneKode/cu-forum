import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    emailVerified: v.boolean(),
    name: v.string(),
    username: v.string(),
    image: v.optional(v.string()),
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
    createdBy: v.id('users'),
  }).index('by_name', ['name']),
  subscriptions: defineTable({
    userId: v.id('users'),
    communityId: v.id('communities'),
  }),
  posts: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    authorId: v.id('users'),
    communityId: v.id('communities'),
  }),
  comments: defineTable({
    text: v.string(),
    authorId: v.id('users'),
    postId: v.id('posts'),
    replyToId: v.union(v.id('comments'), v.null()),
    commentId: v.optional(v.string()),
  }),
  votes: defineTable({
    userId: v.id('users'),
    postId: v.id('posts'),
    type: v.union(v.literal('UP'), v.literal('DOWN')),
  }),
  commentVotes: defineTable({
    userId: v.id('users'),
    commentId: v.id('comments'),
    type: v.union(v.literal('UP'), v.literal('DOWN')),
  }),
})
