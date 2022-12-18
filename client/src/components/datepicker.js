import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, TextField } from '@material-ui/core';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getDateTimeString } from "../actions";

const useStyles = makeStyles(() =>
  createStyles({
    noBorder: {
      outline: "none",
      border: "none",
      color: "#fff",
    },
    whiteText:{
        color: "#fff",
    }
  })
);

export default function DatePicker(props) {

    const { date, setDateValue } = props;

    const [value, setValue] = useState(dayjs(date));
    const classes = useStyles();
        
    const handleChange = (newValue) => {
        setValue(newValue);
        setDateValue(getDateTimeString(newValue));
    };

    return (
        <Box className="mx-3 mt-1">
            <form noValidate>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            className="!text-white"
                        />
                    </Stack>
                </LocalizationProvider>
            </form>
        </Box >
    );

};