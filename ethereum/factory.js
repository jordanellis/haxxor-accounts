var web3 = require('web3');
var CampaignFactory = require('./build/CampaignFactory.json');


const instance = web3.eth && new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xEc86416937f2E3Dda655a4FB27E62f08F0e92FeF'
);

return instance;