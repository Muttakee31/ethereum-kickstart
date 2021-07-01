import Campaign from "../../../ethereum/campaign";
import ShowCampaign from "../show";
import React from "react";
import {Header, Image, Progress, Segment} from "semantic-ui-react";

const ProgressDetails = ({description, image}) => {
  return (
    <>
      <h3>Show Progress report</h3>
      <Header as='h5' attached='top'>
        Progress
      </Header>
      <Segment attached style={{borderTop: 'none'}}>
        <Progress percent={23} color='teal' progress />
      </Segment>
      <Header as='h5' attached>
        Description
      </Header>
      <Segment attached style={{borderTop: 'none'}}>
        kajdnjf sfdfjsjlf sfslfdjlf slfs fksfks
      </Segment>
      <Header as='h5' attached>
        Image
      </Header>
      <Segment attached style={{borderTop: 'none'}}>
        <Image src='https://ipfs.io/ipfs/QmP414E7iPAX2QKqhvzvbWfwTDZUTbazLE8xdjwMy9b6zj' height='200' width='200' />
      </Segment>
    </>
  );
}

ProgressDetails.getInitialProps = async (props) => {
  const campaign = await Campaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsLength: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  };
}

export default ProgressDetails;