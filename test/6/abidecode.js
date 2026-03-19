const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("abidecode", function() {
    it("Shoulde Decode", async function() {
        const [owner] = await ethers.getSigners();
        const contract = await ethers.getContractFactory("Decode");
        const decoder = await contract.deploy();
        await decoder.waitForDeployment();
        console.log("deployed address:", await decoder.getAddress());

        const data = "0x8a8570830000000000000000000000004b657ffc121d2a29988d1ad97f9ef06d90b666460000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b2d05e00"
        const decodedata = await decoder.decodeExample(data)
        console.log(decodedata)

    });
});
