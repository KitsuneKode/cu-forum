'use server'

import { ConvexError } from 'convex/values'
import { api, getToken } from '@cu-forum/convex'
import { createAuth } from '@cu-forum/convex/auth'
import { fetchMutation, fetchQuery } from 'convex/nextjs'

// Authenticated mutation via server function
export async function createPost(text: string, isCompleted: boolean = false) {
  const token = await getToken(createAuth)
  if (!token) {
    throw new ConvexError('No token found')
  }

  await fetchMutation(api.task.create, { text, isCompleted }, { token })
}

export const changeImage = async (image: string) => {
  const token = await getToken(createAuth)
  if (!token) {
    throw new ConvexError({
      message: 'No token found',
      code: 'UNAUTHORIZED',
    })
  }

  await fetchMutation(api.auth.myFunction, { image }, { token })
}
