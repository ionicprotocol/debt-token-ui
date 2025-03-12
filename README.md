# Ionic Debt UI

A Next.js-based UI for interacting with the IonicDebtToken smart contract on Mode Mainnet. This application allows users to mint IonicDebtTokens by providing whitelisted ionTokens as collateral.

## Features

- Connect to wallet using various connectors (MetaMask, WalletConnect, etc.)
- View IonicDebtToken balance
- Mint IonicDebtTokens by providing ionTokens as collateral
- Preview mint amount before minting
- Modern and responsive UI
- Exclusive support for Mode Mainnet

## Technologies Used

- Next.js 15
- TypeScript
- Wagmi & Viem for Ethereum interactions
- TanStack Query for data fetching
- Tailwind CSS for styling
- Radix UI for accessible components

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ionic-debt-ui.git
cd ionic-debt-ui
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_MODE_RPC_URL=your_mode_rpc_url (optional, defaults to https://mainnet.mode.network)
```

4. Update contract addresses:

Edit `src/lib/contracts/config.ts` to include the correct contract addresses for your deployed IonicDebtToken contract on Mode Mainnet.

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Testing with Local RPC

For local testing, you can set the `NEXT_PUBLIC_MODE_RPC_URL` environment variable to point to your localhost RPC:

```
NEXT_PUBLIC_MODE_RPC_URL=http://localhost:8545
```

This allows you to test the application against a local node or fork of Mode Mainnet.

### Build

Build the application for production:

```bash
pnpm build
```

### Run Production Build

Start the production server:

```bash
pnpm start
```

## Contract Interaction

The UI interacts with the IonicDebtToken contract on Mode Mainnet, which allows users to:

1. Check if an ionToken is whitelisted
2. Preview the amount of IonicDebtTokens they will receive
3. Approve the IonicDebtToken contract to spend their ionTokens
4. Mint IonicDebtTokens by providing ionTokens as collateral

## Mode Mainnet

This application is designed to work exclusively with Mode Mainnet (Chain ID: 34443). Users will need to configure their wallets to connect to Mode Mainnet to use this application.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
- `src/lib`: Utility functions and hooks
  - `src/lib/contracts`: Contract ABIs and configuration
  - `src/lib/hooks`: Custom hooks for contract interactions
- `src/components/ui`: Reusable UI components

## License

MIT
