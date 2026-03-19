// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.20;

contract Fallback_test{
    uint256 public count ;

    fallback() external {
    bytes4 selector = bytes4(msg.data[:4]);
    if(selector == bytes4(keccak256("counter(uint256)"))){
        uint256 x = abi.decode(msg.data[4:], (uint256));
        count += x;
        return ;
    }


}
}