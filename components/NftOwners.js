network_id = '1'; // See https://docs.chainbase.com/reference/supported-chains to get the id of different chains.
contract_addr = '0xed5af388653567af2f388e6224dc7c4b3241c544'; // Take Azuki's contract address as an example.
const CHAINBASE_API_KEY = process.env.CHAINBASE_API_KEY;


const axios = require('axios');
const options = {
    url: `https://api.chainbase.online/v1/nft/owners?chain_id=${network_id}&contract_address=${contract_addr}`,
    method: 'GET',
    headers: {
        'x-api-key': CHAINBASE_API_KEY, // 
        'accept': 'application/json'
    }
};
axios(options)
    .then(response => console.log(response.data.data))
    .catch(error => console.log(error));