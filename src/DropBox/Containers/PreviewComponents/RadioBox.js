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
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
        {data.map((item) => (
          <FormControlLabel
            value={item.radioValueField}
            control={<Radio  />}
            label={item.radioLabelField}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
