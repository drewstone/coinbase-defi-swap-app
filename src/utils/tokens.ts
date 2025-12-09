import { Token } from '../types';

export const COMMON_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6417c4c4c4c4c4c4c4c4c4c4c4c4c4c',
    decimals: 6,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8,
  },
];

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatBalance(balance: string, decimals = 4): string {
  const num = parseFloat(balance);
  if (isNaN(num)) return '0';
  return num.toFixed(decimals);
}

export function formatAmount(amount: string, token: Token): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return '0';
  return num.toFixed(Math.min(token.decimals, 6));
}

export function calculateExchangeRate(
  fromAmount: string,
  toAmount: string,
  fromToken: Token,
  toToken: Token
): string {
  const from = parseFloat(fromAmount);
  const to = parseFloat(toAmount);
  
  if (isNaN(from) || isNaN(to) || from === 0) return '0';
  
  return (to / from).toFixed(6);
}

export function calculatePriceImpact(
  fromAmount: string,
  toAmount: string,
  marketRate: string
): string {
  const actualRate = parseFloat(toAmount) / parseFloat(fromAmount);
  const expectedRate = parseFloat(marketRate);
  
  if (isNaN(actualRate) || isNaN(expectedRate) || expectedRate === 0) return '0';
  
  const priceImpact = Math.abs(((actualRate - expectedRate) / expectedRate) * 100);
  return priceImpact.toFixed(2);
}

export function validateAmount(amount: string, balance: string): boolean {
  const amountNum = parseFloat(amount);
  const balanceNum = parseFloat(balance);
  
  return !isNaN(amountNum) && amountNum > 0 && amountNum <= balanceNum;
}

export async function simulateSwap(
  fromToken: Token,
  toToken: Token,
  fromAmount: string
): Promise<{
  toAmount: string;
  exchangeRate: string;
  gasEstimate: string;
  priceImpact: string;
}> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const fromAmountNum = parseFloat(fromAmount);
  if (isNaN(fromAmountNum) || fromAmountNum <= 0) {
    throw new Error('Invalid amount');
  }
  
  let toAmountNum: number;
  
  if (fromToken.symbol === 'ETH' && toToken.symbol === 'USDC') {
    toAmountNum = fromAmountNum * 2000 + (Math.random() - 0.5) * 100;
  } else if (fromToken.symbol === 'USDC' && toToken.symbol === 'ETH') {
    toAmountNum = fromAmountNum / 2000 + (Math.random() - 0.5) * 0.0001;
  } else {
    toAmountNum = fromAmountNum * (0.95 + Math.random() * 0.1);
  }
  
  const exchangeRate = (toAmountNum / fromAmountNum).toFixed(6);
  const gasEstimate = (0.001 + Math.random() * 0.005).toFixed(6);
  const priceImpact = (Math.random() * 0.5).toFixed(2);
  
  return {
    toAmount: toAmountNum.toFixed(toToken.decimals),
    exchangeRate,
    gasEstimate,
    priceImpact,
  };
}