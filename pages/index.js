import React from "react";
import instance from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";

const CampaignIndex = ({campaignList}) => {

  const renderCampaigns = () => {
    const items = campaignList.map(item => {
      return (
          {
            header: item,
            description: 'View Campaign',
            fluid: true
          }
      )
    })
    return <Card.Group items={items} />;
  }

  return(
      <>
        <Button icon='add circle' content='Create campaign' primary floated='right' />
        {renderCampaigns()}
      </>
  )
}

CampaignIndex.getInitialProps = async (ctx) => {
  const campaignList = await instance.methods.getDeployedContracts().call();
  return { campaignList };
}


export default CampaignIndex;
