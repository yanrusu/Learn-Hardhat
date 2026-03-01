// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Sender{
    function send_with_transfer(address payable addr) external payable {
        addr.transfer(msg.value);
    }

    function send_with_call(address addr) external payable{
        (bool ok ,) = addr.call{value: msg.value}("");
        require(ok,"call failed");
    }
}