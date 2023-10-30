import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => 
{
  const [address, setAddress] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [contractOwners, setContractOwners] = useState('');

  const handleSearch = () => {
    onSearch(address, contractAddress, contractCode);
  };

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Your ETH address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ margin: '10px 0' }} // Add some margin to separate the inputs
      />
      <input
        type="text"
        placeholder="NFT Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        style={{ margin: '10px 0' }} // Add some margin to separate the inputs
      />
      {/* <input
        type="text"
        placeholder="NFT Contract Owners"
        value={contractOwners}
        onChange={(e) => setContractOwners(e.target.value)}
        style={{ margin: '10px 0' }} // Add some margin to separate the inputs
      /> */}
      <button onClick={handleSearch}>search</button>
    </div>
  );
};

export default SearchBar;
