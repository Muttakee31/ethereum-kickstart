import React from 'react';
import {Button, Table} from "semantic-ui-react";
import web3 from '../ethereum/web3';
import Campaign from "../ethereum/campaign";

const RequestRow = ({idx, request, totalApprovers, address}) => {
  const readyToFinalize = request.approvalCount > totalApprovers / 2;
  const onApprove = async () => {
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(idx).send({from: accounts[0]});
    } catch (e) {
      console.log(e.message);
    }
  }

  const onFinalize = async () => {
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(idx).send({from: accounts[0]});
    } catch (e) {
      console.log(e.message);
    }
  }

  const {Row, Cell} = Table;
  return (
    <Row disabled={request.completed} positive={!request.completed && readyToFinalize}>
      <Cell>{idx}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{request.approvalCount}/{totalApprovers}</Cell>
      <Cell>
        {request.completed ?
            null : <Button color='green' basic onClick={onApprove}>Approve</Button>
        }
      </Cell>
      <Cell>
        {request.completed ?
            null :  <Button color='teal' basic onClick={onFinalize}>Finalize</Button>
        }
      </Cell>
    </Row>
  )
}

export default RequestRow;