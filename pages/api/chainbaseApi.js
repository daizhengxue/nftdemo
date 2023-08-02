import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { method, query } = req;
  console.log('Request received in chainbaeApi handler'); // print this log

  // Set CORS-related response headers to allow requests from any origin.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  try {

    const baseUrl = 'https://api.chainbase.online/v1/account/nfts?chain_id=1';
    const targetUrl = `${baseUrl}&address=${query.address}`;

    console.log('Target URL:', targetUrl); // print target URL to test

    // Using fetch to request the target URL.
    const backendResponse = await fetch(targetUrl, {
      headers: {
        accept: 'application/json',
        //'x-api-key':process.env.CHAINBASE_API_KEY,
        'x-api-key':'demo',
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
