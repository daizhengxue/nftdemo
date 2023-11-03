import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import NftCard from '../components/NftCard';
import BlockchainSelector from '../components/BlockchainSelector';  

const Home = () => {
  const [nftData, setNftData] = useState(null);
  const [selectedChainId, setSelectedChainId] = useState('');

  const handleSearch = async (address, contractAddress) => {
    setNftData(null);
    try {
      const response = await axios.get(`/api/chainbaseApi?address=${address}&contract_address=${contractAddress}&chain_id=${selectedChainId}`);
      setNftData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/logo.png" alt="Chainbase Logo" style={{ marginTop: '20px', width: '300px', height: '50px' }} />
      
      <BlockchainSelector setSelectedChainId={setSelectedChainId} />
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
