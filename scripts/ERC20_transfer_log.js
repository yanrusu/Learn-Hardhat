const { ethers } = require("hardhat");

const log = {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000a0df350d2637096571f7a701cbc1c5fdE30dF76A",
        "0x000000000000000000000000bBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    ],
    data: "0x00000000000000000000000000000000000000000000000000000000000003e8",
};

async function main() {
    const iface = new ethers.Interface([
        "event Transfer(address indexed from, address indexed to, uint256 value)",
    ]);

    // 解析 event log 中的 indexed(from/to) 與 data(value)
    const decoded = iface.decodeEventLog("Transfer", log.data, log.topics);

    console.log("from:", decoded.from);
    console.log("to  :", decoded.to);
    console.log("value:", decoded.value); 
}



main().catch(console.error);


