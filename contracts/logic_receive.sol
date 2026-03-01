// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Receive_sample{
    uint256 public counter;
    receive() external payable{
        counter+=1;
    }
}