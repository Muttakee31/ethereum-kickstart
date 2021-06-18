pragma solidity ^0.4.17;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedContracts() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        address recipient;
        uint value;
        bool completed;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] private requests;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }


    function Campaign(uint minimum, address creator) public {
        minimumContribution = minimum;
        manager = creator;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    // function random() private view returns (uint) {
    //     return uint(keccak256(block.difficulty, now, approvers));

    // }

    function createRequest(string description, uint value, address recipient)
    public restricted{
        Request memory req = Request({
        description: description,
        value: value,
        recipient: recipient,
        completed: false,
        approvalCount: 0
        });
        requests.push(req);
    }

    /*function getApprovers() public view returns (mapping()){
        return approvers;
    }*/

    function approveRequest(uint requestIndex) public {
        Request storage selectedRequest = requests[requestIndex];
        require(approvers[msg.sender]);
        require(!selectedRequest.approvals[msg.sender]);

        selectedRequest.approvalCount += 1;
        selectedRequest.approvals[msg.sender] = true;
    }

    function finalizeRequest(uint requestIndex) public {
        Request storage selectedRequest = requests[requestIndex];
        require(!selectedRequest.completed);
        require(selectedRequest.approvalCount > (approversCount /2));
        selectedRequest.completed = true;
    }

    function getAllRequests() private view returns (Request[]){
        return requests;
    }
}