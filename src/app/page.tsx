'use client';

import { MintForm } from '@/components/MintForm';
import { BalanceCard } from '@/components/BalanceCard';
import { Layout } from '@/components/Layout';
import { TokenList } from '@/components/TokenList';
export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Ionic Debt Token Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <MintForm />
          </div>
          <div>
            <BalanceCard />
          </div>
        </div>

        <div className="mb-8">
          <TokenList />
        </div>

        <div className="bg-card rounded-xl border border-border shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-card-foreground">About Ionic Debt Tokens</h2>
          <p className="text-muted-foreground mb-4">
            Ionic Debt Tokens (dION) are ERC20 tokens that represent your debt position in the Ionic
            Protocol. By minting dION tokens, you are providing whitelisted ionTokens as collateral.
          </p>
          <p className="text-muted-foreground mb-4">
            Each ionToken has a specific scale factor that determines how many dION tokens you
            receive when providing it as collateral. The scale factor is set by the protocol
            governance and can be updated over time.
          </p>
          <p className="text-muted-foreground">To mint dION tokens, you need to:</p>
          <ol className="list-decimal list-inside text-muted-foreground mt-2 space-y-1">
            <li>Select a whitelisted ionToken</li>
            <li>Enter the amount you want to provide</li>
            <li>Approve the IonicDebtToken contract to spend your ionTokens</li>
            <li>Mint dION tokens</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
