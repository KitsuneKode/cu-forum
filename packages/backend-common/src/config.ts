import { ConfigLoader } from '@cu-forum/common/config-loader'

const backendCommonConfigSchema = {
  port: () => Number(process.env.PORT) || 8080,
  frontendUrl: () => process.env.FRONTEND_URL || '',
  databaseUrl: () => process.env.DATABASE_URL || '',
  environment: () => process.env.NODE_ENV || '',
}

export const config = ConfigLoader.getInstance(backendCommonConfigSchema, 'backend-common')
