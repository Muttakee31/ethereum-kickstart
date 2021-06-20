import React from "react";
import {Button, Table} from 'semantic-ui-react';
import {Link} from "../../../routes.js";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";


const RequestIndex = ({address, requests, requestCount, approverCount}) => {
  const {Header, Row, HeaderCell, Body} = Table;

  return(
      <>
        <h3>List of requests</h3>
        <Link route={`/campaigns/${address}/requests/new`}>
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
          <Table.Body>
            {requests.map((req, index) => {
              return (
                  <RequestRow
                      idx={index}
                      request={req}
                      address={address}
                      totalApprovers={approverCount}
                  />
              )
            })}
          </Table.Body>
        </Table>
        <div>Found {requestCount} request(s).</div>
      </>
  )
}

RequestIndex.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approverCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
      Array(parseInt(requestCount))
          .fill().map((element, index) => {
            return campaign.methods.requests(index).call();
          })
  );
  return {address, requests, requestCount, approverCount};
}
export default RequestIndex;