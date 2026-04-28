import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for better React practices
  reactStrictMode: true,

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },

  // Ignore TypeScript errors during build (optional, untuk speed build)
  // typescript: {
  //   ignoreBuildErrors: true,
  // },

  // ESLint ignore during build untuk production
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
