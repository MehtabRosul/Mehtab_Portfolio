/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable ESLint runs during production builds to avoid passing deprecated CLI options
  // (Some environments or custom tooling may pass options like `useEslintrc` or `extensions`
  // which newer ESLint versions reject). We still keep lint as a dev-time task.
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig

