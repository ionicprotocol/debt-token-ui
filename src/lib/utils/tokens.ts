import { formatUnits } from "viem";
import { modeMainnetConfig, ION_TOKENS } from "../contracts/config";
import { mode } from "viem/chains";

/**
 * Get token information by address
 * @param address Token address
 * @returns Token information or undefined if not found
 */
export function getTokenByAddress(address: string) {
  const tokens = ION_TOKENS[mode.id];
  return tokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Get token configuration from modeMainnetConfig
 * @param address Token address
 * @returns Token configuration or undefined if not found
 */
export function getTokenConfig(address: string) {
  return modeMainnetConfig.tokenConfigs.find(
    (config) => config.address.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Format token amount based on its decimals
 * @param amount Amount in wei
 * @param address Token address
 * @param displayDecimals Number of decimals to display
 * @returns Formatted amount as string
 */
export function formatTokenAmount(
  amount: bigint,
  address: string,
  displayDecimals = 4
) {
  const token = getTokenByAddress(address);
  if (!token) return "0";

  const formatted = formatUnits(amount, token.decimals);

  // Limit to displayDecimals
  const parts = formatted.split(".");
  if (parts.length === 2 && parts[1].length > displayDecimals) {
    return `${parts[0]}.${parts[1].substring(0, displayDecimals)}`;
  }

  return formatted;
}

/**
 * Calculate the debt token amount based on token configuration
 * @param tokenAddress Token address
 * @param amount Amount of token provided as collateral
 * @returns Calculated debt token amount or 0n if token not found
 */
export function calculateDebtTokenAmount(tokenAddress: string, amount: bigint) {
  const tokenConfig = getTokenConfig(tokenAddress);
  if (!tokenConfig) return BigInt(0);

  const token = getTokenByAddress(tokenAddress);
  if (!token) return BigInt(0);

  // Calculate the proportion of total supplied
  const proportion = (amount * BigInt(10000)) / tokenConfig.totalSupplied;

  // Calculate the corresponding amount of illegitimate borrowed
  return (tokenConfig.illegitimateBorrowed * proportion) / BigInt(10000);
}

/**
 * Get all available ion tokens
 * @returns Array of ion tokens
 */
export function getAllIonTokens() {
  return ION_TOKENS[mode.id];
}
