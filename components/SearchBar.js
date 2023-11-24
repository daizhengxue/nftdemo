import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [inputAddress, setInputAddress] = useState(''); //  The address manually entered by the user
    const [connectedAddress, setConnectedAddress] = useState(''); // The address connected from MetaMask
    const [contractAddress, setContractAddress] = useState('');

    const connectMetaMask = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask first.');
            return;
        }

        let accounts;
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAddress(accounts[0]);
            setInputAddress(''); //  address is cleared after connection
        } catch (error) {
            alert('You rejected the request.');
        }
    };

    const disconnectWallet = () => {
        setConnectedAddress(''); //  Clear the connected MetaMask address
        setInputAddress(''); //  Clear the input address at the same time
    };

    const handleSearch = () => {
        const addressToSearch = connectedAddress || inputAddress;
        onSearch(addressToSearch, contractAddress);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {connectedAddress ? (
                <>
                    <span>Connected Address: {connectedAddress}</span>
                    <button onClick={disconnectWallet}>Disconnect Wallet</button>
                </>
            ) : (
                <>
                    <button onClick={connectMetaMask}>Connect MetaMask</button>
                    <input
                        type="text"
                        placeholder='Your ETH address or ENS name'
                        value={inputAddress}
                        onChange={(e) => setInputAddress(e.target.value)}
                        style={{ margin: '10px 0', width: '300px' }}
                    />
                </>
            )}
            <input 
                type="text"
                placeholder='NFT Contract address (optional)'
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                style={{ margin: '10px 0', width: '300px' }}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
