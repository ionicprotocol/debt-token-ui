import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for optimal Vercel deployment
  output: 'standalone',

  // Optimize images for better performance
  images: {
    domains: ['avatars.githubusercontent.com'],
    unoptimized: false,
  },

  // Environment variables validation at build time
  env: {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_MODE_RPC_URL: process.env.NEXT_PUBLIC_MODE_RPC_URL,
    NEXT_PUBLIC_IONIC_DEBT_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_IONIC_DEBT_TOKEN_ADDRESS,
  },

  // Experimental features for better performance
  experimental: {
    // Enable turbo for faster builds (already in package.json dev script)
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],
      },
    },
  },

  // Webpack configuration for better bundle optimization
  webpack: (config, { isServer }) => {
    // Optimize bundle size for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Headers for better security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
