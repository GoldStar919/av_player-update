import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useEffect } from "react";

export default function RadioButton(props) {
  const { indexes, setRadioValue } = props;
  const radiolist = indexes.content.map((index) => (
    <FormControlLabel
      key={index.value}
      value={index.value}
      control={<Radio />}
      label={index.label}
    />
  ));

  useEffect(() => {}, []);

  const handleChange = (newValue) => {
    if (indexes.id === 1) {
      setRadioValue(newValue.target.value);
    }
    if (indexes.id === 2) {
      setRadioValue(newValue.target.value);
    }
  };

  return (
    <FormControl>
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        className="!text-inherit"
      >
        {indexes.title}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        defaultValue={indexes.content[indexes.defaultIndex].value}
        name="row-radio-buttons-group"
        onChange={handleChange}
      >
        {radiolist}
      </RadioGroup>
    </FormControl>
  );
}
