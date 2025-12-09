import React, { useState, useEffect } from 'react';
import { WalletService } from './utils/wallet';
import { SwapInterface } from './components/SwapInterface';
import { formatAddress, formatBalance } from './utils/tokens';

interface WalletState {
  address: string | null;
  provider: any;
  balance: string;
  connected: boolean;
}

const App: React.FC = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    provider: null,
    balance: '0',
    connected: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const walletService = new WalletService();

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError('');
      const walletData = await walletService.connectWallet();
      setWalletState(walletData);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await walletService.disconnectWallet();
      setWalletState({
        address: null,
        provider: null,
        balance: '0',
        connected: false,
      });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect wallet');
    }
  };

  const handleSwap = async (fromToken: any, toToken: any, fromAmount: string, toAmount: string) => {
    if (!walletState.connected || !walletState.provider) {
      setError('Wallet not connected');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const txHash = await walletService.sendTransaction(toToken.address, fromAmount);
      
      const successMessage = `Swap successful! Transaction hash: ${txHash}`;
      alert(successMessage);
      
      const newBalance = await walletService.getBalance();
      setWalletState(prev => ({
        ...prev,
        balance: newBalance,
      }));
    } catch (err: any) {
      setError(err.message || 'Swap failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const provider = walletService.getProvider();
        if (provider) {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balance = await walletService.getBalance(address);
          
          setWalletState({
            address,
            provider,
            balance,
            connected: true,
          });
        }
      } catch (error) {
        // No existing connection
      }
    };

    checkExistingConnection();
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <h1>🔄 Coinbase DeFi Swap</h1>
        <p>Swap tokens securely with Coinbase Wallet</p>
      </div>

      <div className="wallet-section">
        {walletState.connected ? (
          <div className="connected-wallet">
            <div>
              <div className="wallet-address">
                {formatAddress(walletState.address || '')}
              </div>
              <div className="balance">
                {formatBalance(walletState.balance)} ETH
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              style={{
                padding: '8px 16px',
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="connect-button"
          >
            {loading ? 'Connecting...' : 'Connect Coinbase Wallet'}
          </button>
        )}
      </div>

      {error && (
        <div style={{ padding: '0 20px' }}>
          <div className="error">{error}</div>
        </div>
      )}

      {walletState.connected && (
        <div className="swap-section">
          <SwapInterface
            walletAddress={walletState.address || ''}
            walletBalance={walletState.balance}
            onSwap={handleSwap}
          />
        </div>
      )}

      {loading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div className="loading">Processing transaction...</div>
        </div>
      )}
    </div>
  );
};

export default App;