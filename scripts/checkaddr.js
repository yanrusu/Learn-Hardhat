//用ethers.js套件檢查（套件其他的相關）
const { ethers } = require("ethers");
const prompt = require("prompt-sync")();
require('dotenv').config();

// 跟節點連線
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

const address = prompt("請輸入要檢查的地址：");

async function checkAddressType(addr) {
    // 讀取某個地址在鏈上存放的「合約 bytecode」
    const code = await provider.getCode(addr);

    if (code === "0x") {
        // 如果 bytecode 是空的0x，代表這是 EOA（外部帳戶）
        console.log(`${addr} 是 EOA (外部帳戶）`);
    } else {
        console.log(`${addr} 是 Contract（合約帳戶）`);
    }
}

checkAddressType(address);
