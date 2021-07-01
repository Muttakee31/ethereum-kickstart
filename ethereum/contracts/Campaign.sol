pragma solidity ^0.4.17;

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

    struct Progress {
        uint rate;
        string description;
        string imagePath;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    Progress public progress;
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

    function createProgressReport(uint rate, string description, string hash) public restricted {
        Progress memory pro = Progress({
        rate: rate,
        description: description,
        imagePath: hash
        });
        progress = pro;
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

    function finalizeRequest(uint requestIndex) public restricted {
        Request storage selectedRequest = requests[requestIndex];
        require(!selectedRequest.completed);
        require(selectedRequest.approvalCount > (approversCount /2));

        selectedRequest.recipient.transfer(selectedRequest.value);
        selectedRequest.completed = true;
    }

/*    function getAllRequests() public view returns (Request[]){
        return requests;
    }*/

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}