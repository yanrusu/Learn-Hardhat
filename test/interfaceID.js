const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InterfaceIdViewer", function () {
  it("should print ERC20 and ERC721 interface IDs", async function () {
    const InterfaceIdViewer = await ethers.getContractFactory("InterfaceIdViewer");
    const viewer = await InterfaceIdViewer.deploy();
    await viewer.waitForDeployment();

    const erc20Id = await viewer.erc20InterfaceId();
    const erc721Id = await viewer.erc721InterfaceId();

    console.log("Solidity ERC20 Interface ID:", erc20Id);
    console.log("Solidity ERC721 Interface ID:", erc721Id);

    function selector(sig) {
    return ethers.keccak256(ethers.toUtf8Bytes(sig)).slice(0, 10);
    }

    function interfaceId(sigs) {
    let id = 0n;
    for (const sig of sigs) {
        id ^= BigInt(selector(sig));
    }
    return "0x" + id.toString(16).padStart(8, "0");
    }

    /* ERC20 */
    const ERC20 = [
    "totalSupply()",
    "balanceOf(address)",
    "transfer(address,uint256)",
    "allowance(address,address)",
    "approve(address,uint256)",
    "transferFrom(address,address,uint256)"
    ];

    console.log("Script ERC20 Interface ID:", interfaceId(ERC20));

    /* ERC721 */
    const ERC721 = [
    "balanceOf(address)",
    "ownerOf(uint256)",
    "safeTransferFrom(address,address,uint256)",
    "transferFrom(address,address,uint256)",
    "approve(address,uint256)",
    "getApproved(uint256)",
    "setApprovalForAll(address,bool)",
    "isApprovedForAll(address,address)",
    "safeTransferFrom(address,address,uint256,bytes)"
    ];

    console.log("Script ERC721 Interface ID:", interfaceId(ERC721));    
    console.log("ERC721 Script == Solidity:", erc721Id === interfaceId(ERC721));
    console.log("ERC20 Script == Solidity:", erc20Id === interfaceId(ERC20));
  });
});