import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface),
    '0xe9999b9ea0B38aE4cc372678905fbF6bca37d1f4');

export default instance;