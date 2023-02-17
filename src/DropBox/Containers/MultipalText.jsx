import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextareaAutosize, TextField } from "@mui/material";

const MultipalText = ({ index, checkBoxLabel,saveCheckBox }) => {
  return (
    <Box
      component="form"
      // id={`image-container-${index}`}
      // className="image-container"
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
        inputRef={checkBoxLabel}
      />

      <Button
        onClick={saveCheckBox}
      >
        Confirm
      </Button>
    </Box>
  );
};
export default MultipalText;
