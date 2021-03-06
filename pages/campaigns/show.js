import React from "react";
import Campaign from "../../ethereum/campaign";
import {Button, Card, Grid} from 'semantic-ui-react';
import ContributeForm from "../../components/ContributeForm";
import web3 from "../../ethereum/web3";
import {Link} from "../../routes.js";

const ShowCampaign = ({address, minimumContribution, balance, requestsLength, approversCount, manager}) => {

  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
            'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
            'You must contribute at least this much wei to become an approver'
      },
      {
        header: requestsLength,
        meta: 'Number of Requests',
        description:
            'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
            'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
            'The balance is how much money this campaign has left to spend.'
      }
    ];

    return <Card.Group items={items} />;
  }


  return(
      <>
        <h3>
          Show campaign
        </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Link route={`/campaigns/${address}/requests/`}>
                <a>
                  <Button color='linkedin'>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
            <Grid.Column width={3}>
              <Link route={`/campaigns/${address}/progress/`}>
                <a>
                  <Button color='green'>View progress</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
  )
}

ShowCampaign.getInitialProps = async (props) => {
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

export default ShowCampaign;