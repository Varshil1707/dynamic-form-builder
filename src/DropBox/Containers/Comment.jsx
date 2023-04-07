import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

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
  
  const regex = /^[A-Za-z ]*$/
  const [isValid, setIsValid] = useState(false)

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
                    if(regex.test(e.target.value)){
                      newArray[index].data[index2].radioValue = e.target.value;
                      setIsValid(false)
                      return newArray;
                    }else{
                      setIsValid(true)
                      return prev
                    }

                  })
              : (e) =>
                  setElements((prev) => {
                    let newArray = [...prev];
                    if(regex.test(e.target.value)){
                      setIsValid(false)
                      newArray[index].data.radioValue =
                      e.target.value;
                      return newArray;
                    }else{
                      setIsValid(true)
                      return prev
                    }
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
                if(regex.test(e.target.value)){
                  newArray[index].data.radioLabel =
                  e.target.value;
                  setIsValid(false)
                  return newArray;
                }else{
                  setIsValid(true)
                  return prev
                }
              })
          }
          value={value ? value.radioLabel : elements[index].data.radioLabel} 
        />

      
      </Box>
      {isValid &&   <Typography  color="error">
      Only Characters are Allowed
    </Typography>}
    </div>
  );
};
export default Comment;
