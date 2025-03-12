import { useState, useEffect } from "react";
import { Address } from "viem";
import { useAccount, useChainId } from "wagmi";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useToast } from "./ui/ToastContext";
import { mode } from "viem/chains";
import { getAllIonTokens } from "@/lib/utils/tokens";
import {
  useIonicDebtTokenInfo,
  useMintIonicDebtToken,
  useApproveIonToken,
  useIonTokenBalance,
  useIonTokenAllowance,
  useIsIonTokenWhitelisted,
  usePreviewMint,
} from "@/lib/hooks/useIonicDebtToken";

export function MintForm() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { addToast } = useToast();
  const { name, symbol } = useIonicDebtTokenInfo();

  const [selectedIonToken, setSelectedIonToken] = useState<Address | undefined>(
    undefined
  );
  const [amount, setAmount] = useState<string>("");
  const [step, setStep] = useState<"select" | "approve" | "mint">("select");

  const ionTokens = getAllIonTokens();
  const { isWhitelisted } = useIsIonTokenWhitelisted(selectedIonToken);
  const { formattedBalance: ionTokenBalance } =
    useIonTokenBalance(selectedIonToken);
  const { formattedAllowance, refetch: refetchAllowance } =
    useIonTokenAllowance(selectedIonToken);

  // Use the contract's previewMint function to calculate tokens to mint
  const { formattedTokensToMint, isLoading: isPreviewLoading } = usePreviewMint(
    selectedIonToken,
    amount
  );

  const {
    approve,
    isWritePending: isApprovePending,
    isConfirming: isApproveConfirming,
    isConfirmed: isApproveConfirmed,
  } = useApproveIonToken();

  const {
    mint,
    isWritePending: isMintPending,
    isConfirming: isMintConfirming,
    isConfirmed: isMintConfirmed,
  } = useMintIonicDebtToken();

  // Reset form when chain changes
  useEffect(() => {
    setSelectedIonToken(undefined);
    setAmount("");
    setStep("select");
  }, [chainId]);

  // Move to next step when approval is confirmed
  useEffect(() => {
    if (isApproveConfirmed) {
      refetchAllowance();
      setStep("mint");
      addToast({
        title: "Approval Successful",
        description: "Your ionToken has been approved for spending.",
      });
    }
  }, [isApproveConfirmed, refetchAllowance, addToast]);

  // Show success message when mint is confirmed
  useEffect(() => {
    if (isMintConfirmed) {
      addToast({
        title: "Mint Successful",
        description: `You have successfully minted ${formattedTokensToMint} ${
          symbol || "dION"
        } tokens.`,
      });
      setAmount("");
      setStep("select");
    }
  }, [isMintConfirmed, formattedTokensToMint, symbol, addToast]);

  const handleSelectIonToken = (value: string) => {
    setSelectedIonToken(value as Address);
    setStep("select");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMaxClick = () => {
    setAmount(ionTokenBalance);
  };

  const handleApprove = async () => {
    if (!selectedIonToken || !amount) return;

    try {
      await approve(selectedIonToken, amount);
    } catch (error) {
      console.error("Error approving tokens:", error);
      addToast({
        title: "Approval Error",
        description: "Failed to approve tokens. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMint = async () => {
    if (!selectedIonToken || !amount) return;

    try {
      await mint(selectedIonToken, amount);
    } catch (error) {
      console.error("Error minting tokens:", error);
      addToast({
        title: "Mint Error",
        description: "Failed to mint tokens. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedIonToken || !amount) {
      addToast({
        title: "Input Error",
        description: "Please select an ionToken and enter an amount.",
        variant: "destructive",
      });
      return;
    }

    if (!isWhitelisted) {
      addToast({
        title: "Token Error",
        description: "Selected ionToken is not whitelisted.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > parseFloat(ionTokenBalance)) {
      addToast({
        title: "Balance Error",
        description: "Insufficient ionToken balance.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(formattedAllowance) < parseFloat(amount)) {
      setStep("approve");
    } else {
      setStep("mint");
    }
  };

  // Check if connected to Mode Mainnet
  const isConnectedToMode = chainId === mode.id;
  if (!isConnectedToMode) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-center text-gray-500">
          Please connect to Mode Mainnet to mint {symbol || "dION"} tokens.
        </p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-center text-gray-500">
          Please connect your wallet to mint {symbol || "dION"} tokens.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        Mint {name || "IonicDebtToken"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ion-token">Select ionToken</Label>
          <Select
            value={selectedIonToken as string}
            onValueChange={handleSelectIonToken}
          >
            <SelectTrigger id="ion-token" className="bg-white">
              <SelectValue placeholder="Select an ionToken" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {ionTokens.map((token) => (
                <SelectItem
                  key={token.address}
                  value={token.address}
                  className="bg-white hover:bg-gray-100"
                >
                  {token.symbol} ({token.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedIonToken && (
            <div className="text-sm text-gray-500">
              Balance: {ionTokenBalance}{" "}
              {ionTokens.find((t) => t.address === selectedIonToken)?.symbol}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="amount">Amount</Label>
            {selectedIonToken && (
              <button
                type="button"
                onClick={handleMaxClick}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                MAX
              </button>
            )}
          </div>
          <Input
            id="amount"
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={handleAmountChange}
            className="bg-white"
          />
        </div>

        {amount && selectedIonToken && (
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="text-sm font-medium">Preview</div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">You will receive:</span>
              <span className="font-medium">
                {isPreviewLoading
                  ? "Loading..."
                  : `${formattedTokensToMint} ${symbol || "dION"}`}
              </span>
            </div>
          </div>
        )}

        <div>
          {step === "select" && (
            <Button type="submit" className="w-full">
              Continue
            </Button>
          )}

          {step === "approve" && (
            <Button
              type="button"
              onClick={handleApprove}
              disabled={isApprovePending || isApproveConfirming}
              className="w-full"
            >
              {isApprovePending || isApproveConfirming
                ? "Approving..."
                : "Approve"}
            </Button>
          )}

          {step === "mint" && (
            <Button
              type="button"
              onClick={handleMint}
              disabled={isMintPending || isMintConfirming}
              className="w-full"
            >
              {isMintPending || isMintConfirming ? "Minting..." : "Mint"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
