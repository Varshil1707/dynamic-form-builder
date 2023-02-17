/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Image3 } from "./Image3";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
import Image from "./Image";
import Comment from "./Comment";
import MultipalText from "./MultipalText";
import Table1 from "./Table";
import Inputprevi from "./PreviewComponents/Inputpreview";
import RadioBox from "./PreviewComponents/RadioBox";
import CheckBox from "./PreviewComponents/Checkbox";
import TextArea from "./PreviewComponents/TextArea";
//import Footer from '../../LeftBar/Footer'

const drawerWidth = 240;

const Preview = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  //Api State
  const [elements, setElements] = useState([]);

  const param = useParams();
  console.log("param", param);

  useEffect(() => {
    document.getElementById("drawerButton").style.display = "none";

    axios({ url: `https://dynamic-form-builder-json-server.onrender.com/elements${param.id}`, method: "get" })
      .then((response) => {
        setElements(response.data.dataElements);

        // let dataElements = response.data.dataElements;
        // dataElements = dataElements.filter(
        //   (dataElement) => dataElement != null
        // );
        // const elements = dataElements.map((dataElement) => dataElement[0]);
        // setElements([...elements]);
      })
      .catch((error) => {
        console.log("error", error.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(elements);

  return (
    <>
      <Box
        minHeight={"700px"}
        border={1}
        boxShadow={10}
        p={3}
        mt={9}
        sx={{ flexGrow: 1 }}
      >
        {elements.map((element, index) => {
          let jsx;

          if (element.type === "Input") {
            jsx = (
              <>
                {element.data.map((item, index) => (
                  <Inputprevi
                    key={index}
                    name={item.inputFieldName}
                    placeholder={item.label}
                    type={item.typeSelectField}
                  />
                ))}
              </>
            );
          } else if (element.type === "RadioBox") {
            jsx = (
              <>
                {/* {element.data.map((item, index) => ( */}
                  <RadioBox
                    data = {element.data}
                  />
                {/* ))} */}
              </>
            );
          } else if (element.type === "CheckBox") {
            jsx = (
              <>
                {element.data.map((item, index) => (
                  <CheckBox key={index} value={item.checkBoxLabelValue} label = {item.checkBoxLabelValue}  />
                ))}
              </>
            );
          } else if (element.type === "TextArea") {
            jsx = (
              <>
                {element.data.map((item, index) => (
                  <TextArea key={index} placeholder={`${item.place_holder}`} />
                ))}
              </>
            );
          }
          return (
            <Box key={index} m={2}>
              {jsx}
            </Box>
          );
        })}
      </Box>
    </>
  );
};
export default Preview;
