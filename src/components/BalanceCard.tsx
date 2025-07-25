import { useAccount } from 'wagmi';
import { useIonicDebtTokenInfo, useIonicDebtTokenBalance } from '@/lib/hooks/useIonicDebtToken';

export function BalanceCard() {
  const { isConnected } = useAccount();
  const { name, symbol, isLoading: isInfoLoading } = useIonicDebtTokenInfo();
  const { formattedBalance, isLoading: isBalanceLoading } = useIonicDebtTokenBalance();

  const isLoading = isInfoLoading || isBalanceLoading;

  if (!isConnected) {
    return null;
  }

  return (
    <div className="p-6 bg-card rounded-xl border border-border shadow-lg">
      <h2 className="text-lg font-medium text-card-foreground">Your Balance</h2>
      <div className="mt-2">
        {isLoading ? (
          <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
        ) : (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-card-foreground">{formattedBalance}</span>
            <span className="ml-2 text-muted-foreground">{symbol || 'dION'}</span>
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {name || 'IonicDebtToken'} is a debt token that represents your position in the Ionic
        protocol.
      </p>
    </div>
  );
}
