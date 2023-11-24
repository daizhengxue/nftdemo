// 文件: pages/api/collectionApi.js

import fetch from 'node-fetch';

export default async function collectionApiHandler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  // Set CORS-related response headers to allow requests from any origin.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { chain_id, contract_address } = query;
  if (!chain_id || !contract_address) {
    return res.status(400).json({ error: 'Missing chain_id or contract_address query parameters' });
  }

  const collectionUrl = `https://api.chainbase.online/v1/nft/collection/items?chain_id=${chain_id}&contract_address=${contract_address}&limit=100`;

  try {
    const response = await fetch(collectionUrl, {
      headers: {
        accept: 'application/json',
        'x-api-key': process.env.CHAINBASE_API_KEY, // Make sure to set your API key in the environment variable
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('collectionApiHandler error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
