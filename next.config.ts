import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore: eslint config is valid but missing in strict NextConfig type
  eslint: {
    ignoreDuringBuilds: true,
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