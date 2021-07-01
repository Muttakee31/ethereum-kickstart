import React, {useState} from "react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import {Link, Router} from "../../../routes";
import {Button, Form, Input, Message} from "semantic-ui-react";

const ProgressReportForm = ({address}) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);


  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const campaign = Campaign(address);
    console.log(image);
    /*try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createProrgessReport(progress, description, image).send({
        from: accounts[0]
      });
      setLoading(false);
      Router.pushRoute(`/campaigns/${address}/progress`);
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.message);
    }*/
  }

  return(
    <>
      <h3>Create Progress report</h3>
      <Link route={`/campaigns/${address}/progress`}>
        <a>Back</a>
      </Link>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Progress rate</label>
          <Input
            value={progress}
            onChange={event => setProgress(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Image</label>
          <input
            type='file'
            onChange={event => setImage(event.target.files[0])}
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

ProgressReportForm.getInitialProps = async (props) => {
  const address = props.query.address;
  return {address};
}

export default ProgressReportForm;