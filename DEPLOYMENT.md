# Vercel Deployment Guide

This guide will help you deploy your Ionic Debt Token UI to Vercel.

## Prerequisites

1. [Vercel account](https://vercel.com)
2. [WalletConnect Project ID](https://cloud.reown.com)
3. Mode Network contract addresses

## Environment Variables

Before deploying, you need to set up the following environment variables in your Vercel project settings:

### Required Variables

| Variable                               | Description                                                   | Example           |
| -------------------------------------- | ------------------------------------------------------------- | ----------------- |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Your WalletConnect project ID from https://cloud.reown.com    | `a1b2c3d4e5f6...` |
| `NEXT_PUBLIC_IONIC_DEBT_TOKEN_ADDRESS` | Your deployed IonicDebtToken contract address on Mode Mainnet | `0x1234567890...` |

### Optional Variables

| Variable                   | Description                 | Default                        |
| -------------------------- | --------------------------- | ------------------------------ |
| `NEXT_PUBLIC_MODE_RPC_URL` | Custom Mode Network RPC URL | `https://mainnet.mode.network` |

## Deployment Steps

### Option 1: Deploy from Git Repository

1. **Connect your repository to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect this as a Next.js project

2. **Configure environment variables:**

   - In your Vercel project settings, go to "Environment Variables"
   - Add all the required variables listed above
   - Make sure to add them for all environments (Production, Preview, Development)

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Option 2: Deploy from CLI

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Set environment variables:**
   ```bash
   vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
   vercel env add NEXT_PUBLIC_IONIC_DEBT_TOKEN_ADDRESS
   vercel env add NEXT_PUBLIC_MODE_RPC_URL
   ```

## Build Configuration

The project includes optimized configuration for Vercel:

- **next.config.ts**: Configured with standalone output, image optimization, and security headers
- **vercel.json**: Custom configuration for pnpm, function timeouts, and CORS headers
- **package.json**: Uses pnpm as the package manager with optimized scripts

## Post-Deployment

1. **Verify deployment:**

   - Visit your deployed URL
   - Check that the WalletConnect modal works
   - Test connecting to Mode Network
   - Verify contract interactions work

2. **Update metadata:**

   - Update the `metadata.url` in `src/context/index.tsx` to match your deployed domain
   - Redeploy after making this change

3. **Monitor:**
   - Check Vercel dashboard for deployment logs
   - Monitor function execution times
   - Review any error logs

## Troubleshooting

### Common Issues

1. **Build failures:**

   - Check that all environment variables are set
   - Verify TypeScript compilation passes locally
   - Review build logs in Vercel dashboard

2. **WalletConnect not working:**

   - Verify `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is correct
   - Check that your domain is added to your WalletConnect project settings
   - Update the metadata URL in the context provider

3. **Contract interaction failures:**
   - Verify `NEXT_PUBLIC_IONIC_DEBT_TOKEN_ADDRESS` is correct
   - Check that the contract is deployed on Mode Mainnet
   - Verify RPC URL is accessible

### Performance Optimization

- The project is configured with:
  - Standalone output for optimal serverless functions
  - Image optimization for better performance
  - Security headers for better SEO and security
  - Webpack optimizations for smaller bundle sizes

## Support

If you encounter issues:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review the [Next.js deployment guide](https://nextjs.org/docs/deployment)
3. Check your environment variables in Vercel dashboard
4. Review build and function logs
