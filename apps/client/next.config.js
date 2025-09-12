/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cu-forum/ui'],
  reactStrictMode: false,
  logging: {
    fetches: true,
    level: 'verbose', // or 'error', 'warn', 'info'
    fullUrl: true,
  },
}

export default nextConfig
