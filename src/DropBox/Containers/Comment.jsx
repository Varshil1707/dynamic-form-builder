import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Comment = ({ setRadioValue, setRadioLabel, saveRadioInputs, value, index,setElements,index2 }) => {
  return (
    <div>
      <Box
        component="form"
        border={1}
        p={2}
        mb={2}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& #uploadImage": {
            display: "none",
          },
          gap: 2,
        }}
      >
        <TextField
          id="outlined-basic"
          placeholder="Enter value for Radio box"
          variant="outlined"
          // onChange={(e) => setRadioValue(e.target.value)} 
          onChange={value ? (e) =>
            setElements((prev) => {
              const newArray = [...prev];
              newArray[index].data[index2].radioValue =
                e.target.value;

              return newArray;
            }) : (e) => setRadioValue(e.target.value)  }
          value={value && value.radioValue}
        />
        <TextField
          id="outlined-basic"
          placeholder="Enter label for radio box"
          variant="outlined"
          onChange={value ? (e) => setElements((prev) => {
            const newArray = [...prev]
            newArray[index].data[index2].radioLabel = e.target.value
            return newArray
          }) : (e) => setRadioLabel(e.target.value) }
          value={value && value.radioLabel}
        />

        {!value && <Button onClick={() => saveRadioInputs(index)}>Confirm</Button>}
      </Box>
    </div>
  );
};
export default Comment;
