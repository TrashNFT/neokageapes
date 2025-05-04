/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['localhost', 'neokageapes.xyz'],
    unoptimized: true,
  },
  transpilePackages: ['framer-motion'],
  basePath: '',
}

module.exports = nextConfig 