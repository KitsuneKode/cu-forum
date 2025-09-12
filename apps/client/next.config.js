/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cu-forum/ui'],
  reactStrictMode: false,
  logging: {
    level: 'verbose', // or 'error', 'warn', 'info'
    fullUrl: true,
  },
}

export default nextConfig
