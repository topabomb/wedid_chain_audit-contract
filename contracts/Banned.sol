//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Banned is OwnableUpgradeable {
    using EnumerableSet for EnumerableSet.AddressSet;
    enum BannedMode {
        white,
        black,
        allowAll,
        denyAll
    }
    BannedMode public mode;
    EnumerableSet.AddressSet whiteList;
    EnumerableSet.AddressSet blackList;

    function initialize() public initializer {
        __Ownable_init();
        mode = BannedMode.allowAll;
    }

    function isBanned(address dapp) public view returns (bool) {
        bool banned = false;
        if (mode == BannedMode.white) {
            banned = !EnumerableSet.contains(whiteList, dapp);
        } else if (mode == BannedMode.black) {
            banned = EnumerableSet.contains(blackList, dapp);
        } else if (mode == BannedMode.allowAll) {
            banned = false;
        } else if (mode == BannedMode.denyAll) {
            banned = true;
        }
        return banned;
    }

    function addWhite(address dapp) public onlyOwner {
        EnumerableSet.add(whiteList, dapp);
    }

    function removeWhite(address dapp) public onlyOwner {
        EnumerableSet.remove(whiteList, dapp);
    }

    function addBlack(address dapp) public onlyOwner {
        EnumerableSet.add(blackList, dapp);
    }

    function removeBlack(address dapp) public onlyOwner {
        EnumerableSet.remove(blackList, dapp);
    }

    function setMode(BannedMode _mode) public onlyOwner {
        mode = _mode;
    }
}
