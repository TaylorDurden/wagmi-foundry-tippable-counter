// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract TippableCounter is Ownable {
    uint256 public counter;

    event Incremented(
        address indexed sender,
        uint8 incrementedBy,
        uint256 ethSent
    );

    constructor() Ownable(msg.sender) {}

    function increment(uint8 incrementBy) external payable {
        require(msg.value >= 0.001 ether, "Fee required to increment");
        require(
            incrementBy >= 1 && incrementBy <= 10,
            "incrementBy not in range"
        );
        counter += incrementBy;

        emit Incremented(msg.sender, incrementBy, msg.value);
    }

    function withdraw() external onlyOwner {
        counter = 0;
        (bool success, ) = address(owner()).call{value: address(this).balance}(
            ""
        );
        require(success);
    }
}
