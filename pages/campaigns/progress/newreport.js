import React, {useState} from "react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import {Link, Router} from "../../../routes";
import {Button, Form, Input, Message} from "semantic-ui-react";
const { create } = require('ipfs-http-client');
const ipfs = create({ host: '127.0.0.1', port: 5001, protocol: 'http' }); // leaving out the arguments will default to these values

const ProgressReportForm = ({address}) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(false);
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      const result = await ipfs.add(image);
      console.log(result.path);

      await campaign.methods.createProgressReport(progress, description, result.path).send({
        from: accounts[0]
      });
      await setLoading(false);
      await Router.pushRoute(`/campaigns/${address}/progress`);

      /*      await campai gn.methods.createProgressReport(progress, description, result[0].hash).send({
              from: accounts[0]
            });
            setLoading(false);
            Router.pushRoute(`/campaigns/${address}/progress`);*/
    } catch (e) {
      console.log(e);
      setLoading(false);
      setErrorMessage(e.message);
    }
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