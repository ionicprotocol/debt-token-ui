import { Address, getAddress, parseUnits } from "viem";

/**
 * Configuration for Mode Mainnet IonicDebtToken deployment
 */
export const modeMainnetConfig = {
  // Core deployment parameters
  masterPriceOracleAddress: getAddress(
    "0x2BAF3A2B667A5027a83101d218A9e8B73577F117"
  ), // Mode mainnet master price oracle address
  usdcAddress: getAddress("0xd988097fb8612cc24eec14542bc03424c656005f"), // Mode mainnet USDC address

  // Token configurations
  tokenConfigs: [
    // ionuniBTC
    {
      address: "0xa48750877a83f7dEC11f722178C317b54a44d142",
      totalSupplied: parseUnits("39.54389903", 8),
      illegitimateBorrowed: parseUnits("39.5017", 8),
    },
    // ionwrsETH
    {
      address: "0x49950319aBE7CE5c3A6C90698381b45989C99b46",
      totalSupplied: parseUnits("242.951519406048997355", 18),
      illegitimateBorrowed: parseUnits("238.4285", 18),
    },
    // ionWETH
    {
      address: "0x71ef7EDa2Be775E5A7aa8afD02C45F059833e9d2",
      totalSupplied: parseUnits("433.822454462637139154", 18),
      illegitimateBorrowed: parseUnits("195.581", 18),
    },
    // ionweETH.mode
    {
      address: "0xA0D844742B4abbbc43d8931a6Edb00C56325aA18",
      totalSupplied: parseUnits("162.545523226895754146", 18),
      illegitimateBorrowed: parseUnits("157.3945", 18),
    },
    // ionWBTC
    {
      address: "0xd70254C3baD29504789714A7c69d60Ec1127375C",
      totalSupplied: parseUnits("2.5308917", 8),
      illegitimateBorrowed: parseUnits("2.3762", 8),
    },
    // ionSTONE
    {
      address: "0x959fa710ccbb22c7ce1e59da82a247e686629310",
      totalSupplied: parseUnits("98.229499907501992876", 18),
      illegitimateBorrowed: parseUnits("96.4513", 18),
    },
    // ionUSDC
    {
      address: "0x2BE717340023C9e14C1Bb12cb3ecBcfd3c3fB038",
      totalSupplied: parseUnits("692393.588153", 6),
      illegitimateBorrowed: parseUnits("150068.2597", 6),
    },
    // ionUSDT
    {
      address: "0x94812F2eEa03A49869f95e1b5868C6f3206ee3D3",
      totalSupplied: parseUnits("145235.014021", 6),
      illegitimateBorrowed: parseUnits("55020.487", 6),
    },
    // ionweETH (OLD)
    {
      address: "0x9a9072302B775FfBd3Db79a7766E75Cf82bcaC0A",
      totalSupplied: parseUnits("26.909897310645108597", 18),
      illegitimateBorrowed: parseUnits("13.8343", 18),
    },
  ],
};

// Contract addresses - replace with actual deployed addresses
export const CONTRACT_ADDRESSES: Record<number, Record<string, Address>> = {
  // Mode Mainnet
  34443: {
    IonicDebtToken: "0x0000000000000000000000000000000000000000" as Address,
  },
};

// Ion Tokens for Mode Mainnet
export const ION_TOKENS: Record<
  number,
  Array<{ address: Address; name: string; symbol: string; decimals: number }>
> = {
  34443: [
    {
      address: "0xa48750877a83f7dEC11f722178C317b54a44d142" as Address,
      name: "Ionic uniBTC",
      symbol: "ionuniBTC",
      decimals: 8,
    },
    {
      address: "0x49950319aBE7CE5c3A6C90698381b45989C99b46" as Address,
      name: "Ionic wrsETH",
      symbol: "ionwrsETH",
      decimals: 18,
    },
    {
      address: "0x71ef7EDa2Be775E5A7aa8afD02C45F059833e9d2" as Address,
      name: "Ionic WETH",
      symbol: "ionWETH",
      decimals: 18,
    },
    {
      address: "0xA0D844742B4abbbc43d8931a6Edb00C56325aA18" as Address,
      name: "Ionic weETH.mode",
      symbol: "ionweETH.mode",
      decimals: 18,
    },
    {
      address: "0xd70254C3baD29504789714A7c69d60Ec1127375C" as Address,
      name: "Ionic WBTC",
      symbol: "ionWBTC",
      decimals: 8,
    },
    {
      address: "0x959fa710ccbb22c7ce1e59da82a247e686629310" as Address,
      name: "Ionic STONE",
      symbol: "ionSTONE",
      decimals: 18,
    },
    {
      address: "0x2BE717340023C9e14C1Bb12cb3ecBcfd3c3fB038" as Address,
      name: "Ionic USDC",
      symbol: "ionUSDC",
      decimals: 6,
    },
    {
      address: "0x94812F2eEa03A49869f95e1b5868C6f3206ee3D3" as Address,
      name: "Ionic USDT",
      symbol: "ionUSDT",
      decimals: 6,
    },
    {
      address: "0x9a9072302B775FfBd3Db79a7766E75Cf82bcaC0A" as Address,
      name: "Ionic weETH (OLD)",
      symbol: "ionweETH",
      decimals: 18,
    },
  ],
};

// Default chain ID
export const DEFAULT_CHAIN_ID = 34443; // Mode Mainnet
