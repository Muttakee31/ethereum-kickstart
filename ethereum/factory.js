import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface),
    '0x904c944FE66351669844bFB65e078Fd8E37a5f0a');

export default instance;