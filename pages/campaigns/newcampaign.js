import React, {useState} from "react";
import {Form, Button, Input, Message} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CreateCampaign = ({}) => {
  const [minContribution, setMinContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingFlag, setLoadingFlag] = useState(false);

  const onSubmit = async (event) => {
    setErrorMessage('');
    setLoadingFlag(true);
    event.preventDefault();
    try{
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0]
      });
      setLoadingFlag(false);
    } catch (e) {
      console.log(e);
      setLoadingFlag(false);
      setErrorMessage(e.message);
    }
  }

  return(
      <>
        <h3>
          Create a Campaign
        </h3>

        <Form onSubmit={onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Minimum contribution</label>
            <Input type='number' label='wei' labelPosition='right'
                   value={minContribution}
                   onChange={(e) => setMinContribution(e.target.valueAsNumber)}/>
          </Form.Field>
          <Message error header="Oops!" content={errorMessage}/>
          <Button primary loading={loadingFlag} >Create!</Button>
        </Form>
      </>
  )
}

export default CreateCampaign;