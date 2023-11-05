import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [address, setAddress] = useState('');
    const [contractAddress, setContractAddress] = useState('');

    const connectMetaMask = async () => {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            alert('Please install MetaMask first.');
            return;
        }

        // Request account access
        let accounts;
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAddress(accounts[0]);
        } catch (error) {
            alert('You rejected the request.');
        }
    };

    const disconnectWallet = () => {
        setAddress(''); // Clear the user's address
    };

    const handleSearch = () => {
        onSearch(address, contractAddress);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {address ? (
                <>
                    <span>Connected Address: {address}</span>
                    <button onClick={disconnectWallet}>Disconnect Wallet</button>
                </>
            ) : (
                <button onClick={connectMetaMask}>Connect MetaMask</button>
            )}
            <input
                type="text"
                placeholder='Your ETH address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ margin: '10px 0' }}
            />
            <input 
                type="text"
                placeholder='NFT Contract address'
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                style={{ margin: '10px 0' }}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
