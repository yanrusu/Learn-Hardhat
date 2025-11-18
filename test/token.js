const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner,addr1,addr2,...address] = await ethers.getSigners();
    // 取得Hardhat本地節點，可使用的帳戶 (有多少個地址？)
    console.log(owner);
    // console.log(`Address 1: ${addr1.address}`);
    // console.log(`Address 2: ${addr2.address}`);
    // address.forEach((addr, index) => {
    //   console.log(`Address ${index + 3}: ${addr.address}`);
    // });
    const Token = await ethers.getContractFactory("Token");
    // 在artifacts的Token.json取得合約資訊建立成物件
    //console.log(Token.bytecode)
    const nonce = await ethers.provider.getTransactionCount(owner.address);
    //跟節點要目前發了幾次交易
    const hardhatToken = await Token.connect(owner).deploy({ nonce });
    //用owner地址發佈合約 指定nonce (nonce值的意義？)
    await hardhatToken.waitForDeployment();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    console.log(hardhatToken.address);
  });

  it("Should transfer tokens between accounts", async function() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("Token");

    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    console.log(await hardhatToken.getAddress());
  });
});
