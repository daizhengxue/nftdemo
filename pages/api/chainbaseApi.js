import fetch from 'node-fetch';

// set up headers
const headers = {
  accept: 'application/json',
  'x-api-key': process.env.CHAINBASE_API_KEY,
};

export default async function handler(req, res) {
  const { method, query } = req;
  console.log('Request received in chainbaseApi handler');

  // set CORS headers and handle OPTIONS method
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const chainId = query.chain_id;
    let address = query.address;

    // if address is an ENS name, resolve it
    if (address.endsWith('.eth')) {
      const ensResponse = await fetch(`https://api.chainbase.online/v1/ens/records?chain_id=${chainId}&domain=${address}`, { headers });
      const ensData = await ensResponse.json();
      address = ensData.data.address;
    }

    // construct URL
    const params = new URLSearchParams({ chain_id: chainId, address, limit: '100' });
    if (query.contract_address) {
      params.append('contract_address', query.contract_address);
    }
    //fetch(`https://api.chainbase.online/v1/account/nfts?${params}`, { headers });
    const targetUrl = `https://api.chainbase.online/v1/account/nfts?${params}`;
    console.log('Requesting URL:', targetUrl); // in case you want to debug
    const backendResponse = await fetch(targetUrl, { headers });

    if (!backendResponse.ok) {
      return res.status(backendResponse.status).json({ error: 'Error' });
    }

    const backendResponseData = await backendResponse.json();
    res.status(200).json(backendResponseData);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
