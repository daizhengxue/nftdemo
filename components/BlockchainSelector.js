import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const useChainId = (initialNetwork) => {
  const networkToChainId = useMemo(() => ({
    ethereum: 1,
    polygon: 137,
    bsc: 56,
    avalanche: 43114,
    arbitrum: 42161,
    optimism: 10,
    base: 8453,
    zksync: 324,
  }), []);

  const [selectedNetwork, setSelectedNetwork] = useState(initialNetwork);
  const selectedChainId = networkToChainId[selectedNetwork];

  return {
    selectedNetwork,
    setSelectedNetwork,
    selectedChainId,
    networkToChainId 
  };
};

const BlockchainSelector = ({ setSelectedChainId }) => {
  const { selectedNetwork, setSelectedNetwork, selectedChainId, networkToChainId } = useChainId('ethereum');

  useEffect(() => {
    setSelectedChainId(selectedChainId);
  }, [selectedChainId]);

  const handleChange = (event) => {
    setSelectedNetwork(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <label htmlFor="blockchainSelector" style={{ order: -1 }}>
        Select a Blockchain Network:
      </label>
      <select id="blockchainSelector" value={selectedNetwork} onChange={handleChange}>
        {Object.keys(networkToChainId).map((network) => (
          <option key={network} value={network}>
            {capitalizeFirstLetter(network)}
          </option>
        ))}
      </select>
    </div>
  );
};

BlockchainSelector.propTypes = {
  setSelectedChainId: PropTypes.func.isRequired,
};

export default BlockchainSelector;
