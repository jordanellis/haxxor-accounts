pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string response) public {
        address newCampaign = new Campaign(response);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    //storage variables
    string public jsonResponse;

    constructor(string response) public {
        jsonResponse = response;
    }
}
