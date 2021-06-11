// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.17;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Inbox {

    string public message;

    constructor(string initial_message) public {
        message = initial_message;
    }

    function setMessage(string new_message) public {
        message = new_message;
    }
}
