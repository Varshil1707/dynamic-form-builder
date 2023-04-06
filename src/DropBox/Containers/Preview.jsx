/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
import Inputpreview from "./PreviewComponents/Inputpreview";
import RadioBox from "./PreviewComponents/RadioBox";
import CheckBox from "./PreviewComponents/CheckboxPreview";
import TextArea from "./PreviewComponents/TextArea";
import { LinearProgress } from "@mui/material";
//import Footer from '../../LeftBar/Footer'

const drawerWidth = 240;

const Preview = ({ id }) => {
  console.log(id);
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  //Api State
  const [elements, setElements] = useState([]);

  const param = useParams();

  useEffect(() => {
    setLoader(true);
    document.getElementById("drawerButton").style.display = "none";

    axios({
      // url: `https://dynamic-form-builder-json-server.onrender.com/elements/${param.id}`,
      // url: `http://localhost:3000/elements/${param.id}`,
      url: `https://todo-ac50c-default-rtdb.firebaseio.com/elements.json`,
      method: "get",
    })
      .then((response) => {
        console.log(response.data[`${id}`].elements);
        setElements(response.data[`${id}`].elements);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log("error", error.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {loader && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {elements.map((element, index) => {
          let jsx;
          console.log(element);
          if (element.type === "Input") {
            jsx = (
              <>
                <Inputpreview
                  key={index}
                  name={element.data.inputFieldName}
                  placeholder={element.data.label}
                  type={element.data.typeSelectField}
                />
              </>
            );
          } else if (element.type === "RadioBox") {
            jsx = (
              <>
                <RadioBox data={element.data} key={index} />
              </>
            );
          } else if (element.type === "CheckBox") {
            jsx = (
              <>
                <CheckBox
                  key={index}
                  value={element.data.checkBoxLabel}
                  label={element.data.checkBoxLabel}
                />
              </>
            );
          } else if (element.type === "TextArea") {
            jsx = (
              <>
                {/* {element.data.map((item, index) => ( */}
                <TextArea
                  key={index}
                  placeholder={`${element.data.descriptionPlaceHolder}`}
                />
                {/* ))} */}
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
