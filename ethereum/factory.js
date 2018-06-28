import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xEc86416937f2E3Dda655a4FB27E62f08F0e92FeF'
);

export default instance;
