// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InterfaceIdViewer {
    function erc20InterfaceId() external pure returns (bytes4) {
        return type(IERC20).interfaceId;
    }

    function erc721InterfaceId() external pure returns (bytes4) {
        return type(IERC721).interfaceId;
    }
}
