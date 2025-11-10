import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel optimizations
  compress: true,
  poweredByHeader: false,
  
  // Production optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // Image optimization for Vercel
  images: {
    domains: [
      'localhost',
      // Add your production domain here after deployment
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Build configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint for production
  eslint: {
    ignoreDuringBuilds: false,
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
  
  // Redirects
  async redirects() {
    return [];
  },
};

export default nextConfig;