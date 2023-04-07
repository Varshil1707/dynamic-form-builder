import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";

export const Image3 = ({
  index,
  value,
  index2,
  setElements,
  elements,
}) => {
  let innerIndex;
  for (let i = 0; i <= index; i++) {
    innerIndex = i;
  }

  console.log(elements);

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
          placeholder="Enter Placeholder value for Description"
          variant="outlined"
          sx={{ width: "50%" }}
          onChange={
            value
              ? (e) =>
                  setElements((prev) => {
                    const newValue = [...prev];
                    newValue[index].data[index2].descriptionPlaceholder =
                      e.target.value;
                    return newValue;
                  })
              : (e) =>
                  setElements((prev) => {
                    let newArray = [...prev];
                    if(regex.test(e.target.value)){
                      setIsValid(false)
                      newArray[index].data.descriptionPlaceHolder =
                      e.target.value; 
                      return newArray;
                    }else {
                      setIsValid(true)
                      return prev
                    }
                  })
          }
          value={
            value
              ? value.descriptionPlaceholder
              : elements[index].data.descriptionPlaceHolder
          }
        />
      </Box>
      {isValid &&   <Typography  color="error">
      Only Characters are Allowed
    </Typography>}
    </div>
  );
};
