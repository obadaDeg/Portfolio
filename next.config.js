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
      child_process: false,
      worker_threads: false,
    }

    // Externalize server-only modules
    if (isServer) {
      config.externals.push(
        'sharp',
        'mongodb',
        'pino',
        'pino-pretty',
        'thread-stream',
        'sonic-boom'
      )
    }

    // Ignore problematic warnings
    config.ignoreWarnings = [
      { module: /node_modules\/express\/lib\/view\.js/ },
      { module: /node_modules\/payload\/dist\/config\/load\.js/ },
    ]

    return config
  },
}

module.exports = nextConfig
