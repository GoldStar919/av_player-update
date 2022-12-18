import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function BasicSelect({
  title = "",
  options = [],
  value: propsValue = options[0],
  onChange = () => {},
  ...props
}) {
  const [value, setValue] = useState("");

  function changeAirPlayType(newValue) {
    setValue(newValue.target.value);
    onChange(newValue.target.value);
  }

  useEffect(() => {
    if (propsValue) {
      setValue(propsValue);
    } else {
      setValue("");
    }
  }, [propsValue]);

  return (
    <Box className="mx-3">
      <FormControl className="w-full">
        <InputLabel id="demo-simple-select-label" className="!text-white">
          {title}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="!text-white"
          value={value}
          label={title}
          onChange={changeAirPlayType}
        >
          {options.map((item, itemIndex, self) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
