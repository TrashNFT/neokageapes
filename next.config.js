/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'neokageapes.xyz'],
    unoptimized: true,
  },
  transpilePackages: ['framer-motion'],
  basePath: '',
}

module.exports = nextConfig 