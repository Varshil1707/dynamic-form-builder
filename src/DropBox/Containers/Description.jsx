import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

export const Image3 = ({index,setDescriptionPlaceholder,descriptionPlaceholderHandler,value,index2,setElements}) => {
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
          sx={{width : "50%"}}
          onChange = {value ? (e) => setElements((prev) => {
            const newValue = [...prev]
            newValue[index].data[index2].descriptionPlaceholder = e.target.value
            return newValue
          }) : (e) => setDescriptionPlaceholder(e.target.value)} 
          value={ value && value.descriptionPlaceholder}
        />

      {!value && <Button onClick={() => descriptionPlaceholderHandler(index)}>Confirm</Button>}
      </Box>
    </div>
  );
};
