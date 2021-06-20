import React, {useState} from "react";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";
import {Router} from "../routes";
import {Button, Form, Input, Message} from "semantic-ui-react";
import Campaign from "../ethereum/campaign";

const ContributeForm = ({address}) => {
  const [contribution, setContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingFlag, setLoadingFlag] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoadingFlag(true);
    try{
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);

      console.log(accounts);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, 'ether')
      });
      setLoadingFlag(false);
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (e) {
      console.log(e);
      setLoadingFlag(false);
      setErrorMessage(e.message);
    }
  }

  return(
      <>
        <h3>
          Contribute here
        </h3>

        <Form onSubmit={onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Amount to contribute</label>
            <Input type='number' label='ether' labelPosition='right'
                   value={contribution}
                   onChange={(e) => setContribution(e.target.value)}/>
          </Form.Field>
          <Message error header="Oops!" content={errorMessage}/>
          <Button primary loading={loadingFlag} >Create!</Button>
        </Form>
      </>
  )
}
export default ContributeForm;