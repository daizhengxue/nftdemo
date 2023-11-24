import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const convertToHttpUrl = (url) => {
  if (typeof url === 'string' && url.startsWith('ipfs://')) {
    return `https://cloudflare-ipfs.com/ipfs/${url.split('ipfs://')[1]}`;
  }
  return url;
};

const handleImageError = (e,setImageError) => {
  const ipfsPattern = /ipfs\/(Qm[1-9A-Za-z]{44}\/?.*)/;
  const match = e.target.src.match(ipfsPattern);
  if (match) {
    e.target.src = `https://cloudflare-ipfs.com/ipfs/${match[1]}`;
  }
  else {
    setImageError(true);
  }
};

const NftCard = ({ nft,chainId }) => {
  //console.log('Chain ID:', chainId); // 
  //console.log(`nftcardcontract_address: ${nft.contract_address}, chain_id: ${chainId}`);
  const maxTokenIdLength = 10;
  const truncatedTokenId = nft.token_id.length > maxTokenIdLength ? nft.token_id.substring(0, maxTokenIdLength) + '...' : nft.token_id;
  const imageUri = nft.image_uri || (nft.metadata ? nft.metadata.image : '');
  const imageUrl = convertToHttpUrl(imageUri);
  const [isVideo, setIsVideo] = useState(false);
  const [imageError, setImageError] = useState(false);
  //console.log('Image URL:', imageUrl); 

  useEffect(() => {
    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('video')) {
          setIsVideo(true);
        }
      })
      .catch((error) => {
        // This is where errors can be logged or default images can be set, but it will not cause unhandled runtime errors.
        console.error('Error fetching image:', error);
      });
  }, [imageUrl]);

  return (
    <div style={{ width: '25%', padding: '10px', border: '1px solid #ccc' }}>
      {isVideo ? (
        <video src={imageUrl} controls style={{ width: '100%' }} />
      ): imageError ? (
        <div>NFT not shown</div> // If the image fails to load, display this message.
      ) 
       : (
          <img src={imageUrl} alt={nft.name} style={{ width: '100%' }} onError={(e) => handleImageError(e, setImageError)} />
        )}
      <h3>{nft.name}</h3>
      <p><strong>Symbol:</strong> {nft.symbol}</p>
      <p><strong>Token ID:</strong> <span title={nft.token_id}>{truncatedTokenId}</span></p>
      <p><strong>Contract Address:</strong> <Link href={`/collection/${nft.contract_address}?chain_id=${chainId}`} onClick={() => console.log(`contract_address: ${nft.contract_address}, chain_id: ${chainId}`)}>{nft.contract_address}</Link></p>
</div>
  );
};

export default NftCard;

