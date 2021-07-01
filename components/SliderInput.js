import React, { useState } from "react";
import { Slider } from "react-semantic-ui-range";
import "semantic-ui-css/semantic.min.css";
import { Label, Grid, Input } from "semantic-ui-react";

const SliderInput = ({progressRate, setProgress}) => {
  const [value, setValue] = useState(progressRate);

  const settings = {
    start: Number(progressRate),
    min: 0,
    max: 100,
    step: 1,
    onChange: value => {
      setValue(value);
      setProgress(value);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Label color="red">{value}</Label>
        <Slider value={value} color="red" settings={settings} />
      </Grid.Column>
    </Grid>
  );
};

export default SliderInput;