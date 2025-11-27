//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CheckAddr {
    function isContract(address addr) public view returns (string memory) {
        if (addr.code.length == 0) {
            return "EOA"; // Address zero is not a contract
        }
        return "Contract";
    }
}

// contract CheckAddr {
//     function isContract(address addr) public view returns (bool) {
//         uint32 size;
//         assembly {
//             size := extcodesize(addr)
//         }
//         return (size > 0);
//     }
// }