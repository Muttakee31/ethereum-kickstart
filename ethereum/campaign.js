import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const Campaign = (address) => {
  return new web3.eth.Contract(JSON.parse(campaignFactory.interface),
      address)
};

export default Campaign;