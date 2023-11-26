import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CollectionPage = () => {
  const router = useRouter(); // get router object
  const { contract_address, chain_id } = router.query; // get contract_address and chain_id from the query string
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const convertToHttpUrl = (url) => {
    if (typeof url === 'string' && url.startsWith('ipfs://')) {
      return `https://cloudflare-ipfs.com/ipfs/${url.split('ipfs://')[1]}`;
    }
    return url;
  };
    
  // checkIfVideo
  const checkIfVideo = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const contentType = response.headers.get('Content-Type');
      return contentType && contentType.startsWith('video');
    } catch (error) {
      console.error('Error checking image type:', error);
      return false;
    }
  };

  // handleImageError
  const processNFTData = async (nfts) => {
    return Promise.all(nfts.map(async (nft) => {
      const imageUrl = convertToHttpUrl(nft.metadata?.image || '');
      const isVideo = await checkIfVideo(imageUrl);
      return { ...nft, imageUrl, isVideo };
    }));
  };

  useEffect(() => {
    if (contract_address && chain_id) {
      const fetchCollectionData = async () => {
        try {
          const response = await fetch(`/api/collectionApi?chain_id=${chain_id}&contract_address=${contract_address}`);// fetch collection data onece the contract_address and chain_id are available
          if (!response.ok) throw new Error('Failed to fetch collection data');
          const data = await response.json();
          const processedData = await processNFTData(data.data);
          setCollectionData(processedData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCollectionData();
    }
  }, [contract_address, chain_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>NFT Collection for Contract Address: {contract_address}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {collectionData && collectionData.map((nft, index) => (
          <div key={index} style={{ width: '25%', padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
            {nft.isVideo ? (
              <video src={nft.imageUrl} controls style={{ width: '100%' }} />
            ) : (
              <img src={nft.imageUrl} alt={nft.metadata?.name || 'NFT Image'} style={{ width: '100%' }} />
            )}
            <h3>{nft.metadata?.name || 'NFT Name'}</h3>
            <p><strong>Token ID:</strong> {nft.token_id}</p>
            {/* add other nft info */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
