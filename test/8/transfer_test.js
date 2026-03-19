const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("transfer test", function () {
  it("Should fail on transfer", async function () {
    const Receive = await ethers.getContractFactory("Receive_sample");
    const receive = await Receive.deploy();
    await receive.waitForDeployment();

    const Sender = await ethers.getContractFactory("Sender");
    const sender = await Sender.deploy();
    await sender.waitForDeployment();

    // await sender.send_with_transfer(await receive.getAddress(), {
    //     value: ethers.parseEther("0.1"),
    //   })

    await expect(
      sender.send_with_transfer(await receive.getAddress(), {
        value: ethers.parseEther("0.1"),
      })
    ).to.be.reverted;
    
    })

  it("Should success on call", async function () {
    const Receive = await ethers.getContractFactory("Receive_sample");
    const receive = await Receive.deploy();
    await receive.waitForDeployment();

    const counter = await receive.counter();
    console.log(counter);
    const Sender = await ethers.getContractFactory("Sender");
    const sender = await Sender.deploy();
    await sender.waitForDeployment();

    await sender.send_with_call(await receive.getAddress(),{
        value: ethers.parseEther("0.1"),
    })    
    const counter_after = await receive.counter();
    console.log(counter_after);
  });
});