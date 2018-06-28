pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string response) public {
        address newCampaign = new Campaign(response, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    //storage variables
    string public jsonResponse;
    address public manager;

    constructor(string response, address creator) public {
        manager = creator;
        jsonResponse = response;
    }
}
