/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables strict mode for React
  swcMinify: true, // Uses SWC for faster builds and smaller output
  output: 'standalone', // Outputs a standalone build folder for deployment
  experimental: {
    outputFileTracing: true, // Reduces unnecessary files in the build output
  },
  images: {
    domains: ["res.cloudinary.com","test.com","www.uspupils.com"], // Optimize external images
    formats: ['image/webp'], // Support modern image formats
  },
  webpack: (config, { isServer }) => {
    // Custom Webpack configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Exclude unnecessary Node.js modules
      };
    }
    return config;
  },
};

module.exports = nextConfig;
