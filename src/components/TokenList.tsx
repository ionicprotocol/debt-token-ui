import { formatUnits } from 'viem';
import { getAllIonTokens, getTokenConfig } from '@/lib/utils/tokens';

export function TokenList() {
  const tokens = getAllIonTokens();

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-card-foreground">Available Ion Tokens</h2>
        <p className="text-sm text-muted-foreground">
          These tokens can be used as collateral for minting IonicDebtTokens
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Token
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Total Supplied
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Illegitimate Borrowed
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {tokens.map((token) => {
              const config = getTokenConfig(token.address);
              return (
                <tr key={token.address} className="hover:bg-accent">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-card-foreground">{token.name}</div>
                        <div className="text-sm text-muted-foreground">{token.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-muted-foreground">
                      {`${token.address.substring(0, 6)}...${token.address.substring(
                        token.address.length - 4,
                      )}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-card-foreground">
                      {config ? formatUnits(config.totalSupplied, token.decimals) : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-card-foreground">
                      {config ? formatUnits(config.illegitimateBorrowed, token.decimals) : 'N/A'}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
