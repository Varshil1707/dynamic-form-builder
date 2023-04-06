import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Comment = ({
  setRadioValue,
  setRadioLabel,
  saveRadioInputs,
  value,
  index,
  setElements,
  index2,
  elements,
}) => {
  let innerIndex;
  for (let i = 0; i <= index; i++) {
    innerIndex = i;
  }

  console.log(elements);
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
          onChange={
            value
              ? (e) =>
                  setElements((prev) => {
                    const newArray = [...prev];
                    newArray[index].data[index2].radioValue = e.target.value;

                    return newArray;
                  })
              : (e) =>
                  setElements((prev) => {
                    let newArray = [...prev];
                    newArray[index].data.radioValue =
                      e.target.value;
                    return newArray;
                  })
          }
          value={value ? value.radioValue : elements[index].data.radioValue}
        />
        <TextField
          id="outlined-basic"
          placeholder="Enter label for radio box"
          variant="outlined"
          onChange={
            value
              ? (e) =>
                  setElements((prev) => {
                    const newArray = [...prev];
                    newArray[index].data[index2].radioLabel = e.target.value;
                    return newArray;
                  })
              :  (e) =>
              setElements((prev) => {
                let newArray = [...prev];
                newArray[index].data.radioLabel =
                  e.target.value;
                return newArray;
              })
          }
          value={value ? value.radioLabel : elements[index].data.radioLabel} 
        />

      
      </Box>
    </div>
  );
};
export default Comment;
