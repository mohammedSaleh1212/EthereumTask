

const { ethers } = require("ethers");
const INFURA_URL = "https://mainnet.infura.io/v3/423150519d6842cbb425088ebbc57329";
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

async function getLast10Transfers() {
    const latestBlockNumber = await provider.getBlockNumber();
    const blockRange = 20;
    const startBlock = latestBlockNumber - blockRange + 1;

    let transfers = [];

    for (let i = latestBlockNumber; i >= startBlock && transfers.length < 10; i--) {
        const block = await provider.getBlockWithTransactions(i);

        for (let tx of block.transactions) {
      
            if (tx.value.gt(0)) {
                transfers.push({
                    blockNumber: tx.blockNumber,
                    from: tx.from,
                    to: tx.to,
                    value: ethers.utils.formatEther(tx.value),
                    hash: tx.hash
                });

                if (transfers.length === 10) {
                    break;
                }
            }
        }

        if (transfers.length === 10) {
            break;
        }
    }

    return transfers;
}

getLast10Transfers().then(transfers => {
    console.log("Last 10 ETH Transfer Transactions:", JSON.stringify(transfers, null, 2));
}).catch(error => {
    console.error("Error:", error);
});


