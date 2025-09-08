import { BetterAuth, type AuthFunctions, type PublicAuthFunctions } from '@convex-dev/better-auth'
import { api, components, internal } from './_generated/api'
import type { DataModel, Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'
import { createAuth } from '../src/lib/auth'
import { v } from 'convex/values'

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth
const publicAuthFunctions: PublicAuthFunctions = api.auth

// Initialize the component
export const betterAuthComponent = new BetterAuth(components.betterAuth, {
  authFunctions,
  publicAuthFunctions,
})

// These are required named exports
export const { createUser, updateUser, deleteUser, createSession, isAuthenticated } =
  betterAuthComponent.createAuthFunctions<DataModel>({
    // Must create a user and return the user id
    onCreateUser: async (ctx, user) => {
      return ctx.db.insert('users', {
        emailVerified: user.emailVerified,
        name: user.name,
        email: user.email,
        username: user.username!,
      })
    },

    // Delete the user when they are deleted from Better Auth
    onDeleteUser: async (ctx, userId) => {
      await ctx.db.delete(userId as Id<'users'>)
    },
  })

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    const userMetadata = await betterAuthComponent.getAuthUser(ctx)
    if (!userMetadata) {
      return null
    }
    // Get user data from your application's database
    // (skip this if you have no fields in your users table schema)
    const user = await ctx.db.get(userMetadata.userId as Id<'users'>)
    return {
      ...user,
      ...userMetadata,
    }
  },
})

export const getSession = query({
  args: {},
  handler: async (ctx) => {
    const auth = createAuth(ctx)

    // Get an access token for a user by id

    // For auth.api methods that require a session (such as
    // getSession()), you can use the getHeaders method to
    // get a headers object
    const headers = await betterAuthComponent.getHeaders(ctx)
    const session = await auth.api.getSession({
      headers,
    })
    if (!session) {
      return null
    }
    // Do something with the session
    return session
  },
})

export const getUserServer = query({
  args: {},
  handler: async (ctx) => {
    // You can get the user id directly from Convex via ctx.auth
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return null
    }
    // For now the id type requires an assertion
    const userIdFromCtx = identity.subject as Id<'users'>

    // The component provides a convenience method to get the user id
    const userId = await betterAuthComponent.getAuthUserId(ctx)
    if (!userId) {
      return null
    }

    const user = await ctx.db.get(userId as Id<'users'>)

    // Get user email and other metadata from the Better Auth component
    const userMetadata = await betterAuthComponent.getAuthUser(ctx)

    // You can combine them if you want
    return { ...userMetadata, ...user }
  },
})

export const myFunction = mutation({
  args: {
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const auth = createAuth(ctx)
    const headers = await betterAuthComponent.getHeaders(ctx)
    const session = await auth.api.getSession({
      headers,
    })
    if (!session) {
      return null
    }
    // Do something with the session
    const user = await auth.api.updateUser({
      body: {
        image: args.image,
      },
      headers,
    })

    console.log(user.status)
    console.log(user)
    return user
  },
})
