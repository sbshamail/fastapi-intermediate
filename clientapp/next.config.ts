import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    dirs: ['src', 'utils', 'app', 'components', 'lib'], // Example directories to lint
  },
};

export default nextConfig;
