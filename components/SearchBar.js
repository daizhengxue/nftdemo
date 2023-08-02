import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [address, setAddress] = useState('');

  const handleSearch = () => {
    onSearch(address);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Your ETH address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>
    </div>
  );
};

export default SearchBar;
