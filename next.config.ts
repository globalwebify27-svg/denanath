import type { NextConfig } from "next";

// Trigger dev server reload to rebuild routing cache
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  outputFileTracingExcludes: {
    '*': [
      './public/uploads/**/*'
    ]
  },
  // @ts-ignore: typescript config is valid but missing in strict NextConfig type
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;