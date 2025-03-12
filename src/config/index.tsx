import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { AppKitNetwork, defineChain } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const customNetwork: AppKitNetwork = defineChain({
  id: 34443,
  caipNetworkId: "eip155:34443",
  chainNamespace: "eip155",
  name: "Mode Mainnet (Local)",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_MODE_RPC_URL || "https://mainnet.mode.network",
      ],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.mode.network" },
  },
});

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [customNetwork];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
