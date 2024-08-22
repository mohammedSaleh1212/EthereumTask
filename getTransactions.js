
require('dotenv').config();
const ethers = require('ethers');
const axios = require('axios');
const apiKey = process.env.ETHERSCAN_API_KEY;
const etherscanAPI = axios.create({
    baseURL: 'https://api.etherscan.io/api',
    params: {
        apikey: apiKey,
    },
});

const address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const formatTransaction = (tx) => {
    return `Hash: ${tx.hash}, From: ${tx.from}, To: ${tx.to}, Value: ${ethers.utils.formatEther(tx.value)} ETH, Block: ${tx.blockNumber}`;
};

const getLastTenTransactions = async () => {
    try {
        const response = await etherscanAPI.get('', {
            params: {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                sort: 'desc',
                offset: 10,
                page: 1,
            },
        });

        const transactions = response.data.result;

        console.log('Last ten transactions:');
        transactions.forEach(tx => {
            console.log(formatTransaction(tx));
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
};

getLastTenTransactions();

