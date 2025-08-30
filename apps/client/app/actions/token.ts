'use server'

import { fetchMutation } from 'convex/nextjs'
import { api, getToken } from '@cu-forum/convex'
import { createAuth } from '@cu-forum/convex/auth'

// Authenticated mutation via server function
export async function createPost(title: string, content: string) {
  const token = await getToken(createAuth)
  await fetchMutation(api.task.create, { title, content }, { token })
}
