// All the code below is commented in case we need to scale to a postgres db or other endpoints is required

// import 'server-only' // <-- ensure this file cannot be imported from the client
// import { cache } from 'react'
// import { headers } from 'next/headers'
// import { createCaller } from '@cu-forum/trpc'
// import { prisma as db } from '@cu-forum/store'
// import { makeQueryClient } from './query-client'
// import { authWithPrisma } from '@cu-forum/auth/server'

// export const getQueryClient = cache(makeQueryClient)

// export const trpcCaller = cache(async () => {
//   const session = await authWithPrisma.api.getSession({
//     headers: await headers(),
//   })
//   return createCaller({ session, db })
// })
