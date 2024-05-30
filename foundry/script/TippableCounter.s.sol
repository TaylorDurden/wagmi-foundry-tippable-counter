// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/TippableCounter.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        TippableCounter counter = new TippableCounter();
        counter.increment{value: 0.01 ether}(1);
        vm.stopBroadcast();
    }
}
