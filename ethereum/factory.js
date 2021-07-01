import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface),
    '0xfd638ae2c3632abEf067865D8f647223d0818b41');

export default instance;