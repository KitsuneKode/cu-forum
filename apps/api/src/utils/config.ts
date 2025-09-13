import { ConfigLoader } from '@cu-forum/common/config-loader'

const backendConfigSchema = {
  jwtSecret: () => process.env.JWT_SECRET || '',
  port: () => Number(process.env.PORT) || 8080,
  frontendUrl: () => process.env.FRONTEND_URL || '',
  databaseUrl: () => process.env.DATABASE_URL || '',
  nodeEnv: () => process.env.NODE_ENV || 'development',
  betterAuthUrl: () => process.env.BETTER_AUTH_URL || '',
  betterAuthSecret: () => process.env.BETTER_AUTH_SECRET || '',
}

const config = ConfigLoader.getInstance(backendConfigSchema, 'api')
export default config
