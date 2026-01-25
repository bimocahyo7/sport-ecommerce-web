import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
