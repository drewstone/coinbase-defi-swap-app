# Coinbase DeFi Swap App

A simple DeFi swapping application built with React, TypeScript, and Coinbase Wallet Kit. This app allows users to connect their Coinbase Wallet and swap various ERC-20 tokens on the Ethereum network.

## Features

- **Coinbase Wallet Integration**: Secure wallet connection using Coinbase Wallet SDK
- **Token Swapping**: Swap between popular tokens (ETH, USDC, USDT, DAI, WBTC)
- **Real-time Price Estimation**: Get live quotes and exchange rates
- **Price Impact & Gas Estimation**: See transaction costs before swapping
- **Responsive Design**: Clean, modern UI that works on all devices
- **Error Handling**: Comprehensive error handling and user feedback

## Technology Stack

- **React 18** with TypeScript
- **Coinbase Wallet SDK** for wallet connectivity
- **Ethers.js** for blockchain interactions
- **Vite** for development and building
- **CSS3** with custom styling (no UI library required)

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- A Coinbase Wallet mobile app or browser extension

### Installation

1. Clone or navigate to the project directory:
```bash
cd projects/okKMNN2LwtAgOsB7/ses_4fad54608ffeaxutBY2ct52ZOu/coinbase-defi-swap-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open automatically in your browser at `http://localhost:3000`.

### Configuration

Update the RPC endpoint in `src/utils/wallet.ts`:

```typescript
const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID';
```

For testing, you can use public RPC endpoints or testnet URLs.

## Usage

1. **Connect Wallet**: Click "Connect Coinbase Wallet" to connect your wallet
2. **Select Tokens**: Choose the tokens you want to swap
3. **Enter Amount**: Input the amount you want to swap
4. **Review Quote**: See exchange rate, price impact, and gas estimate
5. **Execute Swap**: Confirm and execute the swap transaction

## Available Tokens

- **ETH** (Ethereum)
- **USDC** (USD Coin)
- **USDT** (Tether USD)
- **DAI** (Dai Stablecoin)
- **WBTC** (Wrapped Bitcoin)

## Security Notes

- This is a demo app for educational purposes
- Always verify transaction details before signing
- Use testnets for development and testing
- Never share your private keys or seed phrases

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Same as `npm run dev`

## Smart Contract Integration

This app uses a simulated swap function for demonstration purposes. For production use, you would integrate with actual DEX protocols like:

- Uniswap V3
- 1inch Aggregation
- 0x Protocol
- SushiSwap

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please refer to the Coinbase Wallet SDK documentation and Ethers.js documentation.