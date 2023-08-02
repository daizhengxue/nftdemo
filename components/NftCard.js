import React from 'react';

const convertToHttpUrl = (url) => {
  // If the URL starts with 'ipfs://', replace it directly with Cloudflare's IPFS gateway URL.
  if (url.startsWith('ipfs://')) {
    return `https://cloudflare-ipfs.com/ipfs/${url.split('ipfs://')[1]}`;
  }

// If the URL contains an IPFS path pattern, attempt to match and replace it with Cloudflare's IPFS gateway URL.
  const ipfsPattern = /ipfs\/(Qm[1-9A-Za-z]{44}\/?.*)/;
  const match = url.match(ipfsPattern);
  if (match) {
    return `https://cloudflare-ipfs.com/ipfs/${match[1]}`;
  }

// If no match is found, return the original URL.
  return url;
};


const NftCard = ({ nft }) => {
  const maxTokenIdLength = 10;
  const truncatedTokenId = nft.token_id.length > maxTokenIdLength ? nft.token_id.substring(0, maxTokenIdLength) + '...' : nft.token_id;
  const imageUrl = convertToHttpUrl(nft.image_uri) || '/placeholder.png'; // use placeholder imag

  return (
    <div style={{ width: '25%', padding: '10px', border: '1px solid #ccc' }}>
      <img src={imageUrl} alt={nft.name} style={{ width: '100%' }} onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.png"; }} />
      <h3>{nft.name}</h3>
      <p><strong>Symbol:</strong> {nft.symbol}</p>
      <p><strong>Token ID:</strong> <span title={nft.token_id}>{truncatedTokenId}</span></p>
      <p><strong>Contract Address:</strong> {nft.contract_address}</p>
    </div>
  );
};

export default NftCard;
