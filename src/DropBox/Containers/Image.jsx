import React from "react";
import Box from "@mui/material/Box";
import { Button, MenuItem, selectClasses, TextField } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Option, Select } from "@mui/joy";

const Image = ({
  index,
  setInputField,
  setPlaceholderFiledName,
  setTypeSelectField,
  saveInputs,
}) => {
  // setData({inputType : fieldInput,placeholderFieldName : label,selectTypeName : selectOption})
  // manage state

  return (
    <div>
      <Box
        component="form"
        // id={`image-container-${index}`}
        // className="image-container"
        // border={1}
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
        variant = "outlined"
          placeholder="Enter Field Name"
          onChange={(e) => setInputField(e.target.value)}
        />
        <TextField
          placeholder="Enter Placeholder Field"
          variant = "outlined"
          onChange={(e) => setPlaceholderFiledName(e.target.value)}
        />
        <Select
          onChange={(e, newValue) => setTypeSelectField(newValue)}
          placeholder="Select Field Type..."
          indicator={<KeyboardArrowDown />}
          sx={{
            width: 240,
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
        >
          <Option value="text">Text</Option>
          <Option value="number">Number</Option>
          <Option value="email">Email</Option>
        </Select>
        <Button onClick={saveInputs}>Save</Button>
      </Box>
    </div>
  );
};

export default Image;
