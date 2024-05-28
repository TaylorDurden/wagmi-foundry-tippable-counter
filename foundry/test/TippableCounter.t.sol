// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/TippableCounter.sol";

contract CounterTest is Test {
    TippableCounter counter = new TippableCounter();
    address alice = address(1);
    address bob = address(2);

    function setUp() public {
        // init account balances
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
    }

    function test_increment() public {
        vm.prank(alice);
        counter.increment{value: 0.01 ether}(1);
        require(counter.counter() == 1);
        require(address(counter).balance == 0.01 ether);
    }

    function testFail_incrementTooHigh() public {
        vm.prank(alice);
        counter.increment{value: 0.01 ether}(11);
        vm.expectRevert("incrementBy not in Range 0 to 10");
    }

    function testFail_incrementNoValue() public {
        vm.prank(alice);
        counter.increment{value: 0 ether}(1);
        vm.expectRevert("Fee required to increment");
    }

    function testFuzz_increment(uint8 amount) public {
        vm.assume(amount >= 1);
        vm.assume(amount <= 10);
        vm.prank(alice);
        counter.increment{value: 0.01 ether}(amount);
    }
}
