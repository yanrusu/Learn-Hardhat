const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
    const provider = new ethers.JsonRpcProvider(`https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

    const privateKey = process.env.ARBITRUM_SEPOLIA_PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, provider);

    const eip1559Unsigned = {
    chainId: 421614,
    nonce: 17,
    maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
    maxFeePerGas: ethers.parseUnits("30", "gwei"),
    gasLimit: 21000,
    to: "0xa0dc4b9e63af73e9df14607bc50b8be87a9f7888",
    value: ethers.parseEther("0.00001"),
    data: "0x",
    type: 2, 
    };


    const sign_tx = await wallet.signTransaction(eip1559Unsigned);
    const sign_tx_hash = ethers.keccak256(sign_tx);
    console.log("sign_tx_hash:",sign_tx_hash)


    const txResponse = await wallet.sendTransaction(eip1559Unsigned); //ethers v6 sign + eth_sendRawTransaction
    console.log("txResponse:", txResponse);
    console.log("Signed Tx:", txResponse.hash);


    const receipt = await txResponse.wait();
    console.log("receipt:",receipt)
    console.log("Transaction mined in block:", receipt.blockNumber);
}

main().catch(console.error);
