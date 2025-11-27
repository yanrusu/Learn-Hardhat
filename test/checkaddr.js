const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CheckAddr", function() {
    it("Should identify EOA and Contract addresses", async function() {
        const [owner] = await ethers.getSigners();
        const contract = await ethers.getContractFactory("CheckAddr");
        const checkAddr = await contract.deploy();
        await checkAddr.waitForDeployment();
        console.log("deployed address:", await checkAddr.getAddress());

        const addrtype = await checkAddr.isContract(owner.address)
        expect(addrtype).to.equal("EOA");
        console.log(`This address ${owner.address} is a: ${addrtype}`);

        const eoaAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Example EOA address
        const addrtype2 = await checkAddr.isContract(eoaAddress)
        expect(addrtype2).to.equal("EOA");
        console.log(`This address ${eoaAddress} is a: ${addrtype2}`);

        const addrtype3  = await checkAddr.isContract(await checkAddr.getAddress())
        expect(addrtype3).to.equal("Contract");
        console.log(`This address ${await checkAddr.getAddress()} is a: ${addrtype3}`);

    });
});
