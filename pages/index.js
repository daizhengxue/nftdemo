import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import NftCard from '../components/NftCard';
import NftOwners from '../components/NftOwners';
import fetch from 'isomorphic-fetch';


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
  const fetchNftOwners = async (contractAddress) => {
    try {
      // Check if nftData is null or empty
      if (!nftData || nftData.length === 0) {
        console.log('No NFT data available to fetch NFT owners.');
        return;
      }
  
      const response = await axios.get(`/api/fetchNftOwnersWithoutCollection?contract_address=${contractAddress}`);
      console.log('NFT Owners:', response.data);
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
        <div>
          <p>No NFTs found for the given address and contract.</p>
        </div>
      )}

<button onClick={() => {
  if (nftData && nftData.length > 0) {
    fetchNftOwners(nftData[0].contract_address);
  } else {
    console.log('No NFT data available to fetch NFT owners.');
  }
}}>
  Get NFT Owners
</button>

    </div>
  );
};

export default Home;
