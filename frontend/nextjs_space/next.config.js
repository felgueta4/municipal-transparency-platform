const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
  
  // Rewrite API requests to Railway backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://municipal-transparency-platform-production.up.railway.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
