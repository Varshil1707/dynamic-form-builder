import React from "react";
import Box from "@mui/material/Box";
import { Button, selectClasses, TextField } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Option, Select } from "@mui/joy";
import{ uid} from "uid/single"

const Image = ({
  index,
  setInputField,
  setPlaceholderFiledName,
  setTypeSelectField,
  saveInputs,
  value,
  setElements,
  index2,
  elements
}) => {

let innerIndex
for(let i = 0 ; i <= index;i++) {
  innerIndex = i
}


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

          onChange={
            value
              ? (e) =>
                  setElements((prev) => {
                    const newArray = [...prev];
                    newArray[index].data[index2].inputFieldName =
                      e.target.value;

                    return newArray;
                  })  
              // : (e) => setInputField(e.target.value)
              : (e) => setElements((prev) => {
                let newArray = [...prev]
                newArray[index].data.inputFieldName = e.target.value
                return newArray
              })
          }  
          value={value ? value.inputFieldName : elements[index].data.inputFieldName}
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
              :  (e) => setElements((prev) => {
                let newArray = [...prev]
                newArray[index].data.label = e.target.value
                return newArray
              })
          }
          value={value ? value.label : elements[index].data.label}
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
              : (e,newValue) => setElements((prev) => {
                let newArray = [...prev]
                newArray[index].data.typeSelectField = newValue
                return newArray
              })
          }
          placeholder="Select Field Type..."
          indicator={<KeyboardArrowDown />}
          // value={value && value.typeSelectField}
          value={value ? value.typeSelectField : elements[index].data.typeSelectField}
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

      </Box>
    </div>
  );
};

export default Image;
