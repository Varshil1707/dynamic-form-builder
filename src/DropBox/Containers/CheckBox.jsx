import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";

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

  const regex = /^[A-Za-z ]*$/;
  const [isValid, setIsValid] = useState(false);
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
                    if(regex.test(e.target.value)) {
                      setIsValid(false)
                      newArray[index].data.checkBoxLabel = e.target.value;
                      return newArray;
                    }else {
                      setIsValid(true)
                      return prev
                    }
                  })
          }
          value={
            value ? value.checkBoxLabel : elements[index].data.checkBoxLabel
          }
        />
      </Box>
      {isValid && (
        <Typography color="error">Only Characters are Allowed</Typography>
      )}
    </div>
  );
};
export default MultipalText;
