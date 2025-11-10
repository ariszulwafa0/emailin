import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Environment-specific configurations
  experimental: {
    optimizeCss: true,
  },
  
  // Image optimization
  images: {
    domains: [
      'localhost', // for development
      // Add your production domain here
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Build optimizations
  typescript: {
    ignoreBuildErrors: false, // Set to false for production
  },
  
  // ESLint in production
  eslint: {
    ignoreDuringBuilds: false, // Set to false for production
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects for production
  async redirects() {
    return [
      // Add any redirects here if needed
    ];
  },
  
  // Webpack configuration for production
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module: any) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: -10,
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;