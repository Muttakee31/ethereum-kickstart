import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface),
    '0x51CD601cBF1e994c13Ce983Eccbb14D56DDE4207');

export default instance;