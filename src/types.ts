export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  balance?: string;
}

export interface WalletState {
  address: string | null;
  provider: any | null;
  balance: string;
  connected: boolean;
}

export interface SwapInfo {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  exchangeRate: string;
  priceImpact: string;
  gasEstimate: string;
}