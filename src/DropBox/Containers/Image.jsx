import React from "react";
import Box from "@mui/material/Box";
import { Button, selectClasses, TextField } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Option, Select } from "@mui/joy";

const Image = ({
  index,
  setInputField,
  setPlaceholderFiledName,
  setTypeSelectField,
  saveInputs,
  value,
  setElements,
  index2,
}) => {
  return (
    <div>
      <Box
        component="form"
        p={2}
        border={1}
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
          variant="outlined"
          name="inputValue"
          placeholder="Enter Field Name"
          // onChange={handleChangeInputs}
          // onChange={(e) => setInputField(e.target.value)}
          onChange={
            value
              ? (e) =>
                  setElements((prev) => {
                    const newArray = [...prev];
                    console.log(newArray[index].data[index2].inputFieldName);
                    newArray[index].data[index2].inputFieldName =
                      e.target.value;

                    return newArray;
                  })  
              : (e) => setInputField(e.target.value)
          }
          value={value && value.inputFieldName}
        />
        <TextField
          placeholder="Enter Placeholder Field"
          variant="outlined"
          onChange={
            value
              ? (e) =>
                  setElements((prev) => {
                    const newArray = [...prev];
                    newArray[index].data[index2].label = e.target.value;

                    return newArray;
                  })
              : (e) => setPlaceholderFiledName(e.target.value)
          }
          value={value && value.label}
        />
        <Select
          // onChange={(e, newValue) => setTypeSelectField(newValue)}
          onChange={
            value
              ? (e, newValue) =>
                  setElements((prev) => {
                    const newArray = [...prev];
                    newArray[index].data[index2].typeSelectField = newValue;
                    return newArray;
                  })
              : (e, newValue) => setTypeSelectField(newValue)
          }
          placeholder="Select Field Type..."
          indicator={<KeyboardArrowDown />}
          value={value && value.typeSelectField}
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
       {!value && <Button onClick={() => saveInputs(index)}>Save</Button>}
      </Box>
    </div>
  );
};

export default Image;
