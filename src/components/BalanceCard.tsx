import { useAccount } from "wagmi";
import {
  useIonicDebtTokenInfo,
  useIonicDebtTokenBalance,
} from "@/lib/hooks/useIonicDebtToken";

export function BalanceCard() {
  const { isConnected } = useAccount();
  const { name, symbol, isLoading: isInfoLoading } = useIonicDebtTokenInfo();
  const { formattedBalance, isLoading: isBalanceLoading } =
    useIonicDebtTokenBalance();

  const isLoading = isInfoLoading || isBalanceLoading;

  if (!isConnected) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-medium text-gray-900">Your Balance</h2>
      <div className="mt-2">
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{formattedBalance}</span>
            <span className="ml-2 text-gray-500">{symbol || "dION"}</span>
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-500">
        {name || "IonicDebtToken"} is a debt token that represents your position
        in the Ionic protocol.
      </p>
    </div>
  );
}
