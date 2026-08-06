import type { NextConfig } from "next";

// Trigger dev server reload to rebuild routing cache
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      './&': false,
    };
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    // Limit workers to prevent Prisma from spawning too many instances and causing OOM on 8GB machine
    cpus: 1,
    memoryBasedWorkersCount: true,
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

import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  // Prevent memory exhaustion during build by excluding the massive public images/media from precache manifest
  exclude: [
    /\.(png|jpe?g|svg|gif|webp)$/i,
    /\.mp4$/i,
    /_next\/static\/media\//,
  ],
});

export default withSerwist(nextConfig);