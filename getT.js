const { ethers } = require("ethers");

// Replace with your Ethereum node provider URL (Infura, Alchemy, etc.)
const INFURA_URL = "https://mainnet.infura.io/v3/423150519d6842cbb425088ebbc57329";
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

async function getLast10Transactions() {
    const latestBlockNumber = await provider.getBlockNumber();
    const blockRange = 20; // Fetch the latest 20 blocks at once (adjust as needed)
    const startBlock = latestBlockNumber - blockRange + 1;

    const blockPromises = [];
    for (let i = startBlock; i <= latestBlockNumber; i++) {
        blockPromises.push(provider.getBlockWithTransactions(i));
    }

    const blocks = await Promise.all(blockPromises);
    const transactions = [];

    for (let block of blocks) {
        for (let tx of block.transactions) {
            transactions.push({
                blockNumber: tx.blockNumber,
                from: tx.from,
                to: tx.to,
                value: ethers.utils.formatEther(tx.value),
                hash: tx.hash
            });

            if (transactions.length === 10) {
                break;
            }
        }

        if (transactions.length === 10) {
            break;
        }
    }

    return transactions;
}

getLast10Transactions().then(transactions => {
    console.log("Last 10 Ethereum Transactions:", transactions);
}).catch(error => {
    console.error("Error:", error);
});
