
    const { ethers } = require('ethers');

const infuraProjectId = '423150519d6842cbb425088ebbc57329';
const provider = new ethers.providers.InfuraProvider('homestead', infuraProjectId);

async function getLatestBlockNumber() {
  return await provider.getBlockNumber();
}

async function getTransactionsFromBlock(blockNumber) {
  const block = await provider.getBlockWithTransactions(blockNumber);
  return block.transactions;
}

async function getLastTenTransferTransactions() {
  const latestBlockNumber = await getLatestBlockNumber();
  let transactions = [];
  let blockNumber = latestBlockNumber;

  while (transactions.length < 10 && blockNumber >= 0) {
    const blockTransactions = await getTransactionsFromBlock(blockNumber);
    const transferTransactions = blockTransactions.filter(tx => tx.data === '0x');
    transactions = transactions.concat(transferTransactions);
    blockNumber--;
  }

  return transactions.slice(0, 10);
}

getLastTenTransferTransactions().then(transactions => {
  transactions.forEach(tx => {
    console.log(`Hash: ${tx.hash}, From: ${tx.from}, To: ${tx.to}, Value: ${ethers.utils.formatEther(tx.value)} ETH,Block: ${parseInt(tx.blockNumber)}`);
  });
}).catch(error => {
  console.error('Error fetching transactions:', error);
});
