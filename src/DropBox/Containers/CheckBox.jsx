import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

const MultipalText = ({
  index,
  setCheckBoxLabel,
  saveCheckBox,
  value,
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
        placeholder="Enter label for Select option"
        variant="outlined"
        onChange={
          value
            ? (e) =>
                setElements((prev) => {
                  const newValue = [...prev];
                  newValue[index].data[index2].checkBoxLabel = e.target.value;
                  return newValue;
                })
            : (e) =>
                setElements((prev) => {
                  let newArray = [...prev];
                  newArray[index].data.checkBoxLabel = e.target.value;
                  return newArray;
                })
        }
        value={value ? value.checkBoxLabel : elements[index].data.checkBoxLabel}
      />

     
    </Box>
  );
};
export default MultipalText;
