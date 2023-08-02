import React, { useState, useEffect } from 'react';

const convertToHttpUrl = (url) => {
  if (url.startsWith('ipfs://')) {
    return `https://cloudflare-ipfs.com/ipfs/${url.split('ipfs://')[1]}`;
  }
  return url;
};

const handleImageError = (e) => {
  const ipfsPattern = /ipfs\/(Qm[1-9A-Za-z]{44}\/?.*)/;
  const match = e.target.src.match(ipfsPattern);
  if (match) {
    e.target.src = `https://cloudflare-ipfs.com/ipfs/${match[1]}`;
  }
};

const NftCard = ({ nft }) => {
  const maxTokenIdLength = 10;
  const truncatedTokenId = nft.token_id.length > maxTokenIdLength ? nft.token_id.substring(0, maxTokenIdLength) + '...' : nft.token_id;
  const imageUri = nft.image_uri || (nft.metadata ? nft.metadata.image : '');
  const imageUrl = convertToHttpUrl(imageUri);
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    fetch(imageUrl).then((response) => {
      if (response.headers.get('Content-Type').startsWith('video')) {
        setIsVideo(true);
      }
    });
  }, [imageUrl]);

  return (
    <div style={{ width: '25%', padding: '10px', border: '1px solid #ccc' }}>
      {isVideo ? (
        <video src={imageUrl} controls style={{ width: '100%' }} />
      ) : (
        <img src={imageUrl} alt={nft.name} style={{ width: '100%' }} onError={handleImageError} />
        )}
      <h3>{nft.name}</h3>
      <p><strong>Symbol:</strong> {nft.symbol}</p>
      <p><strong>Token ID:</strong> <span title={nft.token_id}>{truncatedTokenId}</span></p>
      <p><strong>Contract Address:</strong> {nft.contract_address}</p>
    </div>
  );
};

export default NftCard;

