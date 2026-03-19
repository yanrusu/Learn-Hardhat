const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank test", function () {
  it("deposit & withdraw with correct mapping update", async function () {

    const [owner,addr1] = await ethers.getSigners();
    const token = await ethers.getContractFactory("ERC20");
    const Token = await token.deploy(1000);
    await Token.waitForDeployment();

    const bank = await ethers.getContractFactory("SimpleBank_with_ERC20");
    const Bank = await bank.deploy(await Token.getAddress());
    await Bank.waitForDeployment();

    await Token.connect(owner).transfer(addr1.address, 100);
    await Token.connect(addr1).approve(await Bank.getAddress(), 100);
    console.log("DEPOSIT 100");
    await Bank.connect(addr1).deposit(100);
    console.log(await Bank.deposits(addr1.address));
    console.log("B_token",await Bank.balanceOf(addr1.address));
    expect(await Bank.deposits(addr1.address)).to.equal(100);
    console.log("WITHDRAW 50");
    await Bank.connect(addr1).withdraw(50);
    console.log(await Bank.deposits(addr1.address));
    console.log("B_token",await Bank.balanceOf(addr1.address));
    expect(await Bank.deposits(addr1.address)).to.equal(50);
    // await Bank.connect(owner).withdraw(60);
    await expect(
      Bank.connect(addr1).withdraw(60)
    ).to.be.revertedWith("insufficient deposit");
  });
});