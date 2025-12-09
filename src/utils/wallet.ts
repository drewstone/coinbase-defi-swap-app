import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { ethers } from 'ethers';
import { WalletState } from '../types';

const APP_NAME = 'Coinbase DeFi Swap';
const APP_LOGO_URL = 'https://coinbase.com/assets/favicon-32x32.png';
const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/'; // Replace with your Infura URL
const DEFAULT_CHAIN_ID = 1; // Ethereum Mainnet

export class WalletService {
  private coinbaseWallet: any;
  private provider: ethers.BrowserProvider | null = null;

  constructor() {
    this.coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
    });
  }

  async connectWallet(): Promise<WalletState> {
    try {
      const ethereum = this.coinbaseWallet.makeWeb3Provider(
        DEFAULT_ETH_JSONRPC_URL,
        DEFAULT_CHAIN_ID
      );

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      this.provider = new ethers.BrowserProvider(ethereum);
      const signer = await this.provider.getSigner();
      const address = await signer.getAddress();
      const balance = await this.provider.getBalance(address);

      return {
        address,
        provider: this.provider,
        balance: ethers.formatEther(balance),
        connected: true,
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async disconnectWallet(): Promise<void> {
    try {
      if (this.coinbaseWallet) {
        await this.coinbaseWallet.disconnect();
      }
      this.provider = null;
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw error;
    }
  }

  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  async sendTransaction(to: string, value: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    try {
      const signer = await this.provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(value),
      });

      const receipt = await tx.wait();
      return receipt.hash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  async getBalance(address?: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    try {
      const signer = await this.provider.getSigner();
      const walletAddress = address || await signer.getAddress();
      const balance = await this.provider.getBalance(walletAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }
}