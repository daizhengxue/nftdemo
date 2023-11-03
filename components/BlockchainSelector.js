import React, { useState } from 'react';

const BlockchainSelector = ({ setSelectedChainId }) => {
  const [localSelectedChainId, setLocalSelectedChainId] = useState('');

  const networkToChainId = {
    ethereum: 1,
    polygon: 137,
    bsc: 56,
    // Add more mappings as needed
  };

  const handleChange = (event) => {
    const selectedNetwork = event.target.value;
    const selectedChainId = networkToChainId[selectedNetwork];
    setLocalSelectedChainId(selectedChainId);
    setSelectedChainId(selectedChainId); // Update the chainId in the Home component
  };

  return (
    <div>
      <label>
        Select a Blockchain Network:
        <select onChange={handleChange}>
          <option value="">--Please choose an option--</option>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="bsc">Binance Smart Chain</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <p>The selected chain ID is: {localSelectedChainId}</p>
    </div>
  );
};

export default BlockchainSelector;
