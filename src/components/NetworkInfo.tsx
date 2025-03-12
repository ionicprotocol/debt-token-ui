import { useChainId } from "wagmi";
import { mode } from "viem/chains";

export function NetworkInfo() {
  const chainId = useChainId();

  // Check if connected to Mode Mainnet
  const isConnectedToMode = chainId === mode.id;

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnectedToMode ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="font-medium">
            {isConnectedToMode
              ? "Connected to Mode Mainnet"
              : "Please connect to Mode Mainnet"}
          </span>
        </div>
      </div>
    </div>
  );
}
