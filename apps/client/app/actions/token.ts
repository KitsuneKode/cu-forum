'use server'

import { ConvexError } from 'convex/values'
import { fetchMutation } from 'convex/nextjs'
import { api, getToken } from '@cu-forum/convex'
import { createAuth } from '@cu-forum/convex/auth'

// Authenticated mutation via server function
export async function createPost(text: string, isCompleted: boolean = false) {
  const token = await getToken(createAuth)
  if (!token) {
    throw new ConvexError('No token found')
  }
  await fetchMutation(api.task.create, { text, isCompleted })
}
