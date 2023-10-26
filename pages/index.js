import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import NftCard from '../components/NftCard';

const Home = () => {
  const [nftData, setNftData] = useState(null);

  const handleSearch = async (address, contractAddress) => {
    setNftData(null);
    try {
      const response = await axios.get(`/api/chainbaseApi?address=${address}&contract_address=${contractAddress}`);
      setNftData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/logo1.png" alt="Inflaxion Logo" style={{ marginTop: '20px', width: '300px', height: '50px' }} />
      <SearchBar onSearch={handleSearch} />

      {nftData && nftData.length > 0 ? (
        <div>
          <h2>NFTs for Address: {nftData[0].owner}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {nftData.map((nft) => (
              <NftCard key={`${nft.contract_address}-${nft.token_id}`} nft={nft} />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
