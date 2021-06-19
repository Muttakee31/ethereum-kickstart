import React from "react";
import instance from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import { Link } from "../routes";

const CampaignIndex = ({campaignList}) => {

  const renderCampaigns = () => {
    const items = campaignList.map(item => {
      return (
          {
            header: item,
            description: (
                <Link route={`campaigns/${item}`}>
                  <a>View Campaign</a>
                </Link>
            ),
            fluid: true
          }
      )
    })
    return <Card.Group items={items} />;
  }

  return(
      <>
        <Link to="/campaigns/newcampaign">
          <a>
            <Button icon='add circle' content='Create campaign' primary floated='right' />
          </a>
        </Link>
        {renderCampaigns()}
      </>
  )
}

CampaignIndex.getInitialProps = async (ctx) => {
  const campaignList = await instance.methods.getDeployedContracts().call();
  return { campaignList };
}


export default CampaignIndex;
