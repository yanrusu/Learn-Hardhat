const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("fallback test", function () {
    
  it("count should plus", async function () {
    const [owner] = await ethers.getSigners();
    const Fcontract = await ethers.getContractFactory("Fallback_test");
    const contract = await Fcontract.deploy();
    await contract.waitForDeployment();

    const iface = new ethers.Interface([
    "function counter(uint256)",
    ]);

    await owner.sendTransaction({
    to: await contract.getAddress(),
    data: iface.encodeFunctionData("counter", [1])
    });

    const counter_after = await contract.count()
    console.log(counter_after)
    })
});