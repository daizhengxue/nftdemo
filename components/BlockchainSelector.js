import React, { useState, useEffect } from 'react';

const BlockchainSelector = ({ setSelectedChainId }) => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum'); // Set initial state to 'ethereum'

  const networkToChainId = {
    ethereum: 1,
    polygon: 137,
    bsc: 56,
    avalanche: 43114,
    arbitrum: 42161,
    optimism: 10,
    base: 8453,
    zksync: 324,
    // Add more mappings as needed
  };

  useEffect(() => {
    // Set the initial chainId when the component mounts
    const initialChainId = networkToChainId[selectedNetwork];
    setSelectedChainId(initialChainId);
  }, []); // Empty dependency array ensures this runs only once when component mounts

  const handleChange = (event) => {
    const selectedNetwork = event.target.value;
    setSelectedNetwork(selectedNetwork);
    const selectedChainId = networkToChainId[selectedNetwork];
    setSelectedChainId(selectedChainId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <label style={{ order: -1 }}>
        Select a Blockchain Network:
      </label>
      <select value={selectedNetwork} onChange={handleChange}>
        <option value="ethereum">Ethereum</option>
        <option value="polygon">Polygon</option>
        <option value="bsc">Binance Smart Chain</option>
        <option value="avalanche">Avalanche</option>
        <option value="arbitrum">Arbitrum</option>
        <option value="optimism">Optimism</option>
        <option value="base">Base</option>
        <option value="zksync">ZkSync</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default BlockchainSelector;
