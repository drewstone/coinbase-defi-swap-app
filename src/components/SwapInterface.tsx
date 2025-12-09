import React, { useState } from 'react';
import { TokenSelector } from './TokenSelector';
import { COMMON_TOKENS, simulateSwap, validateAmount } from '../utils/tokens';

interface SwapInterfaceProps {
  walletAddress: string;
  walletBalance: string;
  onSwap: (fromToken: any, toToken: any, fromAmount: string, toAmount: string) => Promise<void>;
}

export const SwapInterface: React.FC<SwapInterfaceProps> = ({
  walletAddress,
  walletBalance,
  onSwap,
}) => {
  const [fromToken, setFromToken] = useState(COMMON_TOKENS[0]); // ETH
  const [toToken, setToToken] = useState(COMMON_TOKENS[1]); // USDC
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showFromSelector, setShowFromSelector] = useState(false);
  const [showToSelector, setShowToSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [swapInfo, setSwapInfo] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFromAmountChange = async (value: string) => {
    setFromAmount(value);
    setError('');

    if (!value || parseFloat(value) <= 0) {
      setToAmount('');
      setSwapInfo(null);
      return;
    }

    if (!validateAmount(value, walletBalance)) {
      setError('Insufficient balance');
      setToAmount('');
      setSwapInfo(null);
      return;
    }

    try {
      setLoading(true);
      const result = await simulateSwap(fromToken, toToken, value);
      setToAmount(result.toAmount);
      setSwapInfo(result);
      setError('');
    } catch (err) {
      setError('Failed to get quote');
      setToAmount('');
      setSwapInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    
    setSwapInfo(null);
    setError('');
  };

  const handleSwap = async () => {
    if (!fromAmount || !toAmount || !validateAmount(fromAmount, walletBalance)) {
      setError('Invalid amount or insufficient balance');
      return;
    }

    try {
      await onSwap(fromToken, toToken, fromAmount, toAmount);
      setFromAmount('');
      setToAmount('');
      setSwapInfo(null);
      setError('');
    } catch (err) {
      setError('Swap failed. Please try again.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>
          From
        </label>
        <div style={{ display: 'flex', background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            placeholder="0.0"
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              fontSize: '18px',
              fontWeight: '600',
              outline: 'none',
            }}
          />
          <div
            onClick={() => setShowFromSelector(true)}
            style={{
              padding: '16px',
              background: '#f7fafc',
              borderLeft: '1px solid #e2e8f0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#edf2f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f7fafc';
            }}
          >
            {fromToken.symbol}
            <span style={{ fontSize: '12px' }}>▼</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
        <button
          onClick={handleSwapTokens}
          style={{
            background: '#e2e8f0',
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0052ff';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'rotate(180deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#e2e8f0';
            e.currentTarget.style.color = 'black';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          ↓
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>
          To
        </label>
        <div style={{ display: 'flex', background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
          <input
            type="number"
            value={toAmount}
            placeholder="0.0"
            readOnly
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              fontSize: '18px',
              fontWeight: '600',
              outline: 'none',
              backgroundColor: '#f7fafc',
            }}
          />
          <div
            onClick={() => setShowToSelector(true)}
            style={{
              padding: '16px',
              background: '#f7fafc',
              borderLeft: '1px solid #e2e8f0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#edf2f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f7fafc';
            }}
          >
            {toToken.symbol}
            <span style={{ fontSize: '12px' }}>▼</span>
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>
          Getting best price...
        </div>
      )}

      {swapInfo && !loading && (
        <div style={{ background: '#f7fafc', borderRadius: '8px', padding: '16px', marginBottom: '20px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#718096' }}>Exchange Rate</span>
            <span style={{ fontWeight: '600' }}>1 {fromToken.symbol} = {swapInfo.exchangeRate} {toToken.symbol}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#718096' }}>Price Impact</span>
            <span style={{ fontWeight: '600', color: parseFloat(swapInfo.priceImpact) > 1 ? '#e53e3e' : 'inherit' }}>
              {swapInfo.priceImpact}%
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#718096' }}>Gas Estimate</span>
            <span style={{ fontWeight: '600' }}>{swapInfo.gasEstimate} ETH</span>
          </div>
        </div>
      )}

      {error && (
        <div style={{ background: '#fed7d7', color: '#c53030', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <button
        onClick={handleSwap}
        disabled={!fromAmount || !toAmount || loading}
        style={{
          width: '100%',
          padding: '16px',
          background: fromAmount && toAmount && !loading 
            ? 'linear-gradient(135deg, #0052ff 0%, #003d99 100%)' 
            : '#cbd5e0',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: fromAmount && toAmount && !loading ? 'pointer' : 'not-allowed',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          if (fromAmount && toAmount && !loading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 82, 255, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {loading ? 'Loading...' : 'Swap'}
      </button>

      <TokenSelector
        selectedToken={fromToken}
        onSelect={setFromToken}
        isOpen={showFromSelector}
        onClose={() => setShowFromSelector(false)}
      />

      <TokenSelector
        selectedToken={toToken}
        onSelect={setToToken}
        isOpen={showToSelector}
        onClose={() => setShowToSelector(false)}
      />
    </div>
  );
};