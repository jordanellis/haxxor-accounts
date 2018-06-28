import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x75b0585729a7DfED382F4706A111bBeaF8d9Eb5F'
);

export default instance;
