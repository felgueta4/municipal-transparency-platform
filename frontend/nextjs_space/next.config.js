const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  // Only use outputFileTracingRoot in local development, not in Vercel
  // This prevents "Cannot read properties of undefined (reading 'fsPath')" error
  ...(process.env.VERCEL ? {} : {
    experimental: {
      outputFileTracingRoot: path.join(__dirname, '../'),
    },
  }),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
