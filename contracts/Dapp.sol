// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

struct Memo {
    string name;
    string message;
    uint256 timestamp;
    address from;
}

contract Dapp {
    address payable public owner;
    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyItem(string memory _name, string memory _message)
        external
        payable
    {
        require(msg.value > 0 ether, "Please Transfer some Ether");
        owner.transfer(msg.value);
        memos.push(Memo(_name, _message, block.timestamp, msg.sender));
    }

    function checkBalance(address _to) external view returns (uint256) {
        return address(_to).balance;
    }

    function changeOwnerShip(address _to) external {
        owner = payable(_to);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

}
