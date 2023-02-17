import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

export const Image3 = ({descriptionPlaceholderHandler,descriptionPlaceholderRef}) => {
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
          inputRef = {descriptionPlaceholderRef}
        />

        <Button onClick={descriptionPlaceholderHandler}  >Confirm</Button>
      </Box>
    </div>
  );
};
