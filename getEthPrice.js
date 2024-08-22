
require('dotenv').config();
const axios = require('axios');

// Create an Axios instance
const cryptocompareKey = process.env.CRYPTOCOMPARE_KEY;
const cryptoCompareAPI = axios.create({
    baseURL: 'https://min-api.cryptocompare.com/data',
    params: {
        api_key: cryptocompareKey,
    },
});

const getEthPrice = async () => {
    try {
        const response = await cryptoCompareAPI.get('/price', {
            params: {
                fsym: 'ETH',
                tsyms: 'USDT,USDC',
            },
        });

        console.log('Ethereum (ETH) Price:');
        console.log(`In USDT: ${response.data.USDT}`);
        console.log(`In USDC: ${response.data.USDC}`);
    } catch (error) {
        console.error('Error fetching ETH price:', error);
    }
};

getEthPrice();


