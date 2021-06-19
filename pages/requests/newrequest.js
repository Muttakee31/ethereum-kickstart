import React, {useState} from "react";
import {Button, Card, Form, Grid, Input, Message} from 'semantic-ui-react';
import web3 from "../../ethereum/web3";
import {Link} from "../../routes.js";
import Campaign from "../../ethereum/campaign";
import RequestIndex from "./index";

const NewRequest = ({address}) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);



  return(
      <>
        <h3>Create requests</h3>
        <Link route={`/campaigns/${address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
                value={description}
                onChange={event => setDescription(event.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
                value={value}
                onChange={event => setValue(event.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
                value={recipient}
                onChange={event => setRecipient(event.target.value)}
            />
          </Form.Field>

          <Message error header="Oops!" content={errorMessage} />
          <Button primary loading={loading}>
            Create!
          </Button>
        </Form>
      </>
  )
}
NewRequest.getInitialProps = async (props) => {
  const address = props.query.address;
  return {address};
}

export default NewRequest;