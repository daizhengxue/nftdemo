import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [inputAddress, setInputAddress] = useState(''); // 用户手动输入的地址 The address manually entered by the user
    const [connectedAddress, setConnectedAddress] = useState(''); // 从MetaMask连接的地址 The address connected from MetaMask
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
            setInputAddress(''); // MetaMask连接后清空手动输入地址 address is cleared after connection
        } catch (error) {
            alert('You rejected the request.');
        }
    };

    const disconnectWallet = () => {
        setConnectedAddress(''); // 清除连接的MetaMask地址 Clear the connected MetaMask address
        setInputAddress(''); // 同时清除手动输入的地址 Clear the input address at the same time
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
                        style={{ margin: '10px 0' }}
                    />
                </>
            )}
            <input 
                type="text"
                placeholder='NFT Contract address (optional)'
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                style={{ margin: '10px 0' }}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
