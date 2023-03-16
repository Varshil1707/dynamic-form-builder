import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonsGroup({ data }) {
  console.log(data);
  return (
    <FormControl>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
        {data.map((item) => (
          <FormControlLabel
            value={item.radioValue}
            control={<Radio />}
            label={item.radioLabel}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
