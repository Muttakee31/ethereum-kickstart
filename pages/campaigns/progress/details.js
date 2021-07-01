import Campaign from "../../../ethereum/campaign";
import ShowCampaign from "../show";
import React from "react";
import Image from "next/image";
import {Progress, Segment} from "semantic-ui-react";

const ProgressDetails = ({description, image}) => {
  return (
    <>
      <h3>
        Show Progress report
        <Segment.Group>
          <Segment>
            Progress rate: <Progress percent={23} color='teal' progress style={{width: 500}}/>
          </Segment>
          <Segment>
            Description: lorem ipsum * 20
          </Segment>
          <Segment>
            Image: <Image src='https://ipfs.io/ipfs/QmP414E7iPAX2QKqhvzvbWfwTDZUTbazLE8xdjwMy9b6zj' height='200' width='200' />
          </Segment>
        </Segment.Group>
      </h3>
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