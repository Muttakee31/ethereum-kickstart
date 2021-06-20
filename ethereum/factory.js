import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface),
    '0xaF2665C19374fb0d8b5f91a1DEC93F51cB19c984');

export default instance;