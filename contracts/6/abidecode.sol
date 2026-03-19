//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Decode {
    function decodeExample(bytes calldata data) external pure returns(address to, uint16 amount, uint8 b, uint256 d) {
        bytes calldata args = data[4:];
        (to, amount, b, d) = abi.decode(args, (address, uint16 , uint8 ,uint256));
    }
}
