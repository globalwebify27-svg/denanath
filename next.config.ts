import type { NextConfig } from "next";

// Trigger dev server reload to rebuild routing cache
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
        'node_modules/eslint',
        'node_modules/typescript',
        'node_modules/prettier',
        'public/**/*',
      ],
    },
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