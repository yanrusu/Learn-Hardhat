const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC721", function () {
  async function deployMyERC721() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const nft = await ethers.deployContract("MyERC721");
    await nft.waitForDeployment();
    return { nft, owner, addr1, addr2 };
  }

  it("should set name/symbol and initial state", async function () {
    const { nft } = await deployMyERC721();

    expect(await nft.name()).to.equal("MyERC721");
    expect(await nft.symbol()).to.equal("MYNFT");
    expect(await nft.totalSupply()).to.equal(0);
  });

  it("should mint with exact 0.001 ETH", async function () {
    const { nft, owner } = await deployMyERC721();

    await nft.connect(owner).mint({ value: ethers.parseEther("0.001") });

    expect(await nft.totalSupply()).to.equal(1);
    expect(await nft.balanceOf(owner.address)).to.equal(1);
    expect(await nft.ownerOf(1)).to.equal(owner.address);
  });

  it("should revert when mint value is incorrect", async function () {
    const { nft, owner } = await deployMyERC721();

    await expect(
      nft.connect(owner).mint({ value: ethers.parseEther("0.0009") })
    ).to.be.revertedWith("Mint price is 0.001 ETH");
  });

  it("should not mint more than max supply", async function () {
    const { nft, owner } = await deployMyERC721();

    const mintPrice = ethers.parseEther("0.001");

    for (let i = 0; i < 100; i++) {
      await nft.connect(owner).mint({ value: mintPrice });
    }

    expect(await nft.totalSupply()).to.equal(100);

    await expect(nft.connect(owner).mint({ value: mintPrice })).to.be.revertedWith(
      "Max supply reached"
    );
  });

  it("should approve and safeTransferFrom by approved address", async function () {
    const { nft, owner, addr1, addr2 } = await deployMyERC721();

    await nft.connect(owner).mint({ value: ethers.parseEther("0.001") });
    await nft.connect(owner).approve(addr1.address, 1);

    expect(await nft.getApproved(1)).to.equal(addr1.address);

    await nft
      .connect(addr1)
      ["safeTransferFrom(address,address,uint256)"](owner.address, addr2.address, 1);

    expect(await nft.ownerOf(1)).to.equal(addr2.address);
    expect(await nft.balanceOf(owner.address)).to.equal(0);
    expect(await nft.balanceOf(addr2.address)).to.equal(1);
  });

  it("should safeTransferFrom by operator approved for all", async function () {
    const { nft, owner, addr1, addr2 } = await deployMyERC721();

    await nft.connect(owner).mint({ value: ethers.parseEther("0.001") });
    await nft.connect(owner).setApprovalForAll(addr1.address, true);

    expect(await nft.isApprovedForAll(owner.address, addr1.address)).to.equal(true);

    await nft
      .connect(addr1)
      ["safeTransferFrom(address,address,uint256,bytes)"](
        owner.address,
        addr2.address,
        1,
        "0x1234"
      );

    expect(await nft.ownerOf(1)).to.equal(addr2.address);
  });

  it("should revert transfer when caller is not owner nor approved", async function () {
    const { nft, owner, addr1, addr2 } = await deployMyERC721();

    await nft.connect(owner).mint({ value: ethers.parseEther("0.001") });

    await expect(
      nft
        .connect(addr1)
        ["safeTransferFrom(address,address,uint256)"](owner.address, addr2.address, 1)
    ).to.be.revertedWith("Not owner nor approved");
  });
});
