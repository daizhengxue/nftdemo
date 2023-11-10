import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { method, query } = req;
  console.log('Request received in chainbaseApi handler'); // print this log

  // Set CORS-related response headers to allow requests from any origin.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const chainId = query.chain_id;
    let address = query.address;

    // Check if the input address is an ENS name
    if (address.endsWith('.eth')) {
      const ensResponse = await fetch(`https://api.chainbase.online/v1/ens/records?chain_id=${chainId}&domain=${address}`, {
        headers: {
          accept: 'application/json',
          'x-api-key': process.env.CHAINBASE_API_KEY,
        },
      });
      const ensData = await ensResponse.json();
      address = ensData.data.address; // Ensure the address is correctly resolved from the ENS name
    }

    const baseUrl = `https://api.chainbase.online/v1/account/nfts?chain_id=${chainId}`;
    let targetUrl = `${baseUrl}&address=${address}&limit=100`;

    if (query.contract_address) {
      targetUrl += `&contract_address=${query.contract_address}`;
    }
    console.log('Requesting URL:', targetUrl);
    // Using fetch to request the target URL.
    const backendResponse = await fetch(targetUrl, {
      headers: {
        accept: 'application/json',
        'x-api-key': process.env.CHAINBASE_API_KEY,
      },
    });

    // Checking if the response is successful.
    if (!backendResponse.ok) {
      res.status(backendResponse.status).json({ error: 'Error' });
    } else {
      // Sending the response from the target server to the client.
      const backendResponseData = await backendResponse.json();
      res.status(backendResponse.status).json(backendResponseData);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
}