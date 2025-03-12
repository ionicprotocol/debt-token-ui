import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./ui/Button";
import { useToast } from "./ui/ToastContext";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { addToast } = useToast();

  const handleConnect = async (connectorId: string) => {
    try {
      const connector = connectors.find((c) => c.id === connectorId);
      if (connector) {
        connect({ connector });
      }
    } catch (error) {
      console.error("Failed to connect:", error);
      addToast({
        title: "Connection Error",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
      addToast({
        title: "Disconnect Error",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <Button variant="outline" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => handleConnect(connector.id)}
          disabled={!connector.ready || isPending}
          isLoading={isPending}
        >
          {connector.name}
        </Button>
      ))}
    </div>
  );
}
