import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Comment = ({ radioLabel, radioValue, saveRadioInputs }) => {
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
          inputRef={radioValue}
        />
        <TextField
          id="outlined-basic"
          placeholder="Enter label for radio box"
          variant="outlined"
          inputRef={radioLabel}
        />

        <Button onClick={saveRadioInputs}>Confirm</Button>
      </Box>
    </div>
  );
};
export default Comment;
