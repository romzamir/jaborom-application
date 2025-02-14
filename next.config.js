/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {},
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
