import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Inputpreview({ name, type, placeholder }) {
  return (
    <Box component="form" m={2} autoComplete="off">
      <TextField
        placeholder={`${placeholder}`}
        label={`${name}`}
        variant="outlined"
        size="normal"
      />
    </Box>
  );
}
