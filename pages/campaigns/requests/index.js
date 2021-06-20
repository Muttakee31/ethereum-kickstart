import React from "react";
import {Button, Table} from 'semantic-ui-react';
import {Link} from "../../../routes.js";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";


const RequestIndex = ({address, requests, requestCount, approverCount}) => {
  const {Header, Row, HeaderCell, Body} = Table;

  const renderRequests = () => {
    requests.map((req, index) => {
      return (
          <RequestRow
            key={index}
            request={req}
            address={address}
            totalApprovers={approverCount}
            />
      )
    })
  }

  return(
      <>
        <h3>List of requests</h3>
        <Link route={`campaigns/${address}/requests/new`}>
          <a>
            <Button primary floated='right' style={{marginBottom: 10}}>Add request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {renderRequests}
          </Body>
        </Table>
        <div>Found {requestCount} request(s).</div>
      </>
  )
}

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);
  console.log(campaign);
  const requestCount = campaign.methods.getRequestCount().call();
  const approverCount = campaign.methods.approvers().call();
  const requests = await Promise.all(
      Array(requestCount)
          .fill().map((element, index) => {
        return campaign.methods.requests(index).call();
      }));
  return {address, requests, requestCount, approverCount};
}
export default RequestIndex;