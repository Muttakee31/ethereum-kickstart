import Campaign from "../../../ethereum/campaign";
import ShowCampaign from "../show";
import React from "react";
import {Button, Grid, Header, Image, Progress, Segment} from "semantic-ui-react";
import {Link} from "../../../routes";

const ProgressDetails = ({address, rate, description, imagePath}) => {
  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3 style={{verticalAlign: 'middle'}}>Show Progress report</h3>
        <Link route={`/campaigns/${address}/progress/new`}>
          <a>
            <Button color='instagram'>Update progress</Button>
          </a>
        </Link>
      </div>
      <Header as='h5' attached='top'>
        Progress
      </Header>
      <Segment attached style={{borderTop: 'none'}}>
        <Progress percent={rate} color='red' progress />
      </Segment>
      <Header as='h5' attached>
        Description
      </Header>
      <Segment attached style={{borderTop: 'none'}}>
        {description}
      </Segment>
      <Header as='h5' attached>
        Image
      </Header>
      <Segment attached style={{borderTop: 'none'}}>
        {imagePath ?
          <Image src={`https://ipfs.io/ipfs/${imagePath}`} height='200' />
          :
          <div />
        }
      </Segment>
    </>
  );
}

ProgressDetails.getInitialProps = async (props) => {
  const campaign = await Campaign(props.query.address);
  const progress = await campaign.methods.progress().call();
  return {
    address: props.query.address,
    rate: progress['rate'],
    description: progress['description'],
    imagePath: progress['imagePath']
  };
}

export default ProgressDetails;