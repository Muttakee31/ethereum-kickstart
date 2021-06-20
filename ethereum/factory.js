import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface),
    '0xbA7b8EEBf9Da70cC070D4dE6e0a3319486929730');

export default instance;