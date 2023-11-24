import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CollectionPage = () => {
  const router = useRouter();
  const { contract_address, chain_id } = router.query;
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(true); // Set to true by default
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contract_address && chain_id) { // Ensure both values are present
      const fetchCollectionData = async () => {
        try {
          const response = await fetch(`/api/collectionApi?chain_id=${chain_id}&contract_address=${contract_address}`);
          if (!response.ok) throw new Error('Failed to fetch collection data');
          const data = await response.json();
          setCollectionData(data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCollectionData();
    }
  }, [contract_address, chain_id]); // Dependency array includes both variables

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>NFT Collection for Contract Address: {contract_address}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {collectionData && collectionData.map((nft, index) => (
          <div key={index} style={{ width: '25%', padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
            <img 
              src={nft.metadata?.image || '/path/to/default/image.png'} 
              alt={nft.metadata?.name || 'NFT Image'} 
              style={{ width: '100%' }} 
            />
            <h3>{nft.metadata?.name || 'NFT Name'}</h3>
            <p><strong>Token ID:</strong> {nft.token_id}</p>
            {/* 可以添加其他NFT相关信息 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
