/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // generateBuildId forces cache invalidation on every restart
  generateBuildId: async () => `build-${Date.now()}`,
}

export default nextConfig
