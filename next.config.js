/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Allow Payload CMS admin to work properly
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Externalize native modules
    if (isServer) {
      config.externals.push('sharp', 'mongodb')
    }

    // Don't parse .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    })

    return config
  },
}

module.exports = nextConfig
