import { appRouter } from '@cu-forum/trpc/routers'
import { createTRPCContext } from '@cu-forum/trpc/trpc'
import type { AppRouter } from '@cu-forum/trpc/routers'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
type RouterOutputs = inferRouterOutputs<AppRouter>

const expressMiddleWare = createExpressMiddleware({
  router: appRouter,
  createContext: createTRPCContext,
})

export { expressMiddleWare, appRouter, createTRPCContext }
export type { AppRouter, RouterInputs, RouterOutputs }
