// const { ethers } = require("ethers");

// const INFURA_URL = process.env.INFURA_URL || "https://mainnet.infura.io/v3/423150519d6842cbb425088ebbc57329";
// const TRANSFER_COUNT = 10;

// const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

// async function getLastTransfers(transferCount = TRANSFER_COUNT) {
//     try {
//         const latestBlock = await provider.getBlockNumber();
//         let transfers = [];
//         let promises = [];

//         for (let i = latestBlock; i >= 0 && transfers.length < transferCount; i--) {
//             promises.push(provider.getBlockWithTransactions(i).then(block => {
//                 for (let tx of block.transactions) {
//                     if (tx.value.gt(0)) {
//                         transfers.push({
//                             blockNumber: tx.blockNumber,
//                             from: tx.from,
//                             to: tx.to,
//                             value: ethers.utils.formatEther(tx.value),
//                             hash: tx.hash
//                         });
//                         if (transfers.length === transferCount) {
//                             return; 
//                         }
//                     }
//                 }
//             }).catch(error => {
//                 console.error(`Error fetching block ${i}:`, error);
//             }));

//             if (i % 10 === 0) {
//                 await Promise.all(promises);
//                 promises = [];
//             }
//         }

//         await Promise.all(promises);

//         // Convert the array of transactions to a JSON string and return it
//         return JSON.stringify(transfers.slice(0, transferCount), null, 2); // Optional: 2-space indentation for readability
//     } catch (error) {
//         console.error("Error in getLastTransfers:", error);
//         throw error;
//     }
// }

// getLastTransfers().then(transfersJson => {
//     console.log(transfersJson); // This will now print the JSON string
// }).catch(error => {
//     console.error("Error:", error);
// });


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


