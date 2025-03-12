import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useChainId,
} from "wagmi";
import { parseUnits, formatUnits, Address } from "viem";
import { CONTRACT_ADDRESSES } from "../contracts/config";
import IonicDebtTokenABI from "../contracts/IonicDebtToken.json";
import IonTokenABI from "../contracts/IonToken.json";
import { useState, useEffect } from "react";

// Hook for getting IonicDebtToken contract address based on current chain
export function useIonicDebtTokenAddress() {
  const chainId = useChainId();

  return {
    address: CONTRACT_ADDRESSES[chainId]?.IonicDebtToken || null,
    chainId,
  };
}

// Hook for getting IonicDebtToken name and symbol
export function useIonicDebtTokenInfo() {
  const { address } = useIonicDebtTokenAddress();

  const { data: name, isLoading: isNameLoading } = useReadContract({
    address,
    abi: IonicDebtTokenABI.abi,
    functionName: "name",
    query: {
      enabled: !!address,
    },
  });

  const { data: symbol, isLoading: isSymbolLoading } = useReadContract({
    address,
    abi: IonicDebtTokenABI.abi,
    functionName: "symbol",
    query: {
      enabled: !!address,
    },
  });

  const { data: decimals, isLoading: isDecimalsLoading } = useReadContract({
    address,
    abi: IonicDebtTokenABI.abi,
    functionName: "decimals",
    query: {
      enabled: !!address,
    },
  });

  return {
    name: name as string | undefined,
    symbol: symbol as string | undefined,
    decimals: decimals as number | undefined,
    isLoading: isNameLoading || isSymbolLoading || isDecimalsLoading,
  };
}

// Hook for getting user's IonicDebtToken balance
export function useIonicDebtTokenBalance() {
  const { address: contractAddress } = useIonicDebtTokenAddress();
  const { address: userAddress } = useAccount();
  const { decimals } = useIonicDebtTokenInfo();

  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: IonicDebtTokenABI.abi,
    functionName: "balanceOf",
    args: [userAddress],
    query: {
      enabled: !!contractAddress && !!userAddress,
    },
  });

  const formattedBalance =
    balance && decimals ? formatUnits(balance as bigint, decimals) : "0";

  return {
    balance: balance as bigint | undefined,
    formattedBalance,
    isLoading,
    refetch,
  };
}

// Hook for checking if an ionToken is whitelisted
export function useIsIonTokenWhitelisted(ionTokenAddress: Address | undefined) {
  const { address: contractAddress } = useIonicDebtTokenAddress();

  const { data: isWhitelisted, isLoading } = useReadContract({
    address: contractAddress,
    abi: IonicDebtTokenABI.abi,
    functionName: "whitelistedIonTokens",
    args: [ionTokenAddress],
    query: {
      enabled: !!contractAddress && !!ionTokenAddress,
    },
  });

  return {
    isWhitelisted: isWhitelisted as boolean | undefined,
    isLoading,
  };
}

// Hook for getting ionToken scale factors
export function useIonTokenScaleFactor(ionTokenAddress: Address | undefined) {
  const { address: contractAddress } = useIonicDebtTokenAddress();

  const { data: scaleFactor, isLoading } = useReadContract({
    address: contractAddress,
    abi: IonicDebtTokenABI.abi,
    functionName: "ionTokenScaleFactors",
    args: [ionTokenAddress],
    query: {
      enabled: !!contractAddress && !!ionTokenAddress,
    },
  });

  return {
    scaleFactor: scaleFactor as
      | { numerator: bigint; denominator: bigint }
      | undefined,
    isLoading,
  };
}

// Hook for previewing mint amount
export function usePreviewMint(
  ionTokenAddress: Address | undefined,
  amount: string
) {
  const { address: contractAddress } = useIonicDebtTokenAddress();
  const { decimals } = useIonicDebtTokenInfo();

  const [parsedAmount, setParsedAmount] = useState<bigint | undefined>(
    undefined
  );

  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      try {
        setParsedAmount(parseUnits(amount, 18)); // Assuming ionToken has 18 decimals
      } catch (error) {
        console.error("Error parsing amount:", error);
        setParsedAmount(undefined);
      }
    } else {
      setParsedAmount(undefined);
    }
  }, [amount]);

  const { data: tokensToMint, isLoading } = useReadContract({
    address: contractAddress,
    abi: IonicDebtTokenABI.abi,
    functionName: "previewMint",
    args: [ionTokenAddress, parsedAmount],
    query: {
      enabled: !!contractAddress && !!ionTokenAddress && !!parsedAmount,
    },
  });

  const formattedTokensToMint =
    tokensToMint && decimals
      ? formatUnits(tokensToMint as bigint, decimals)
      : "0";

  return {
    tokensToMint: tokensToMint as bigint | undefined,
    formattedTokensToMint,
    isLoading,
  };
}

// Hook for minting IonicDebtTokens
export function useMintIonicDebtToken() {
  const { address: contractAddress } = useIonicDebtTokenAddress();
  const {
    writeContractAsync,
    isPending: isWritePending,
    data: hash,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const mint = async (ionTokenAddress: Address, amount: string) => {
    if (!contractAddress || !ionTokenAddress || !amount) return;

    try {
      const parsedAmount = parseUnits(amount, 18); // Assuming ionToken has 18 decimals

      return await writeContractAsync({
        address: contractAddress,
        abi: IonicDebtTokenABI.abi,
        functionName: "mint",
        args: [ionTokenAddress, parsedAmount],
      });
    } catch (error) {
      console.error("Error minting tokens:", error);
      throw error;
    }
  };

  return {
    mint,
    isWritePending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

// Hook for approving ionToken to be spent by IonicDebtToken contract
export function useApproveIonToken() {
  const { address: contractAddress } = useIonicDebtTokenAddress();
  const {
    writeContractAsync,
    isPending: isWritePending,
    data: hash,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const approve = async (ionTokenAddress: Address, amount: string) => {
    if (!contractAddress || !ionTokenAddress || !amount) return;

    try {
      const parsedAmount = parseUnits(amount, 18); // Assuming ionToken has 18 decimals

      return await writeContractAsync({
        address: ionTokenAddress,
        abi: IonTokenABI.abi,
        functionName: "approve",
        args: [contractAddress, parsedAmount],
      });
    } catch (error) {
      console.error("Error approving tokens:", error);
      throw error;
    }
  };

  return {
    approve,
    isWritePending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

// Hook for getting ionToken balance
export function useIonTokenBalance(ionTokenAddress: Address | undefined) {
  const { address: userAddress } = useAccount();

  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: ionTokenAddress,
    abi: IonTokenABI.abi,
    functionName: "balanceOf",
    args: [userAddress],
    query: {
      enabled: !!ionTokenAddress && !!userAddress,
    },
  });

  const formattedBalance = balance
    ? formatUnits(balance as bigint, 18) // Assuming ionToken has 18 decimals
    : "0";

  return {
    balance: balance as bigint | undefined,
    formattedBalance,
    isLoading,
    refetch,
  };
}

// Hook for getting ionToken allowance
export function useIonTokenAllowance(ionTokenAddress: Address | undefined) {
  const { address: contractAddress } = useIonicDebtTokenAddress();
  const { address: userAddress } = useAccount();

  const {
    data: allowance,
    isLoading,
    refetch,
  } = useReadContract({
    address: ionTokenAddress,
    abi: IonTokenABI.abi,
    functionName: "allowance",
    args: [userAddress, contractAddress],
    query: {
      enabled: !!ionTokenAddress && !!userAddress && !!contractAddress,
    },
  });

  const formattedAllowance = allowance
    ? formatUnits(allowance as bigint, 18) // Assuming ionToken has 18 decimals
    : "0";

  return {
    allowance: allowance as bigint | undefined,
    formattedAllowance,
    isLoading,
    refetch,
  };
}
