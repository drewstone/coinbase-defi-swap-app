import React, { useState } from 'react';
import { COMMON_TOKENS, formatAddress, formatBalance } from '../utils/tokens';

interface TokenSelectorProps {
  selectedToken: any;
  onSelect: (token: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onSelect,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          width: '90%',
          maxWidth: '400px',
          maxHeight: '500px',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            Select Token
          </h3>
        </div>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {COMMON_TOKENS.map((token) => (
            <div
              key={token.address}
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #f7fafc',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.2s',
              }}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f7fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>
                  {token.symbol}
                </div>
                <div style={{ color: '#718096', fontSize: '14px' }}>
                  {token.name}
                </div>
              </div>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                {token.symbol.slice(0, 2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};