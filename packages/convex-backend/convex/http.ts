import { createAuth } from '../src/lib/auth'
import { betterAuthComponent } from './auth'
import { httpRouter } from 'convex/server'

const http = httpRouter()

betterAuthComponent.registerRoutes(http, createAuth)

export default http
