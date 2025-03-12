import { http, createConfig } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { mode } from "viem/chains";

// Get RPC URL from environment variable or use default
const getModeRpcUrl = () => {
  return process.env.NEXT_PUBLIC_MODE_RPC_URL || "https://mainnet.mode.network";
};

// Define supported chains - only Mode Mainnet
export const chains = [mode] as const;

// Create Wagmi config
export const config = createConfig({
  chains,
  transports: {
    [mode.id]: http(getModeRpcUrl()),
  },
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId:
        process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
        "YOUR_WALLET_CONNECT_PROJECT_ID",
    }),
  ],
});
