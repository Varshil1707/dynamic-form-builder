import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

const MultipalText = ({ index, setCheckBoxLabel, saveCheckBox, value, setElements, index2 }) => {

  let innerIndex
for(let i = 0 ; i <= index;i++) {
  innerIndex = i
}
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
        // onChange={(e) => setCheckBoxLabel(e.target.value)}
        onChange={value ? (e)=>setElements((prev) => {
          const newValue = [...prev]
          newValue[index].data[index2].checkBoxLabel = e.target.value
          return newValue
        }) : (e) => setCheckBoxLabel(e.target.value)}
        value={value && value.checkBoxLabel}
      />

       {!value && <Button onClick={() => saveCheckBox(innerIndex,index)}>Confirm</Button>}
    </Box>
  );
};
export default MultipalText;
