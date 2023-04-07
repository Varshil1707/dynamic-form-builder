import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Image from "./Containers/Input";
import Comment from "./Containers/Comment";
import MultipalText from "./Containers/CheckBox";
import { Image3 } from "./Containers/Description";
import Table1 from "./Containers/Table";
import Button from "@mui/material/Button";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

const url = window.location.href;
const urlSplit = url.split("/");
let apiID = urlSplit[urlSplit.length - 1];
apiID = !isNaN(apiID);

const DeleteMe = ({ deleteMe, index }) => {
  return (
    <>
      <Box align="right">
        <Button className="deleteBtn" onClick={() => deleteMe(index)}>
          Delete
        </Button>
      </Box>
    </>
  );
};

const Index = ({ setId }) => {
  const [elements, setElements] = useState([]);
  const [childElements, setChildElements] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);

  const [inputFieldName, setInputFieldName] = useState("");
  const [label, setLabel] = useState("");
  const [typeSelectField, setTypeSelectField] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [radioLabel, setRadioLabel] = useState("");
  const [checkBoxLabel, setCheckBoxLabel] = useState("");
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState("");
  const [emptyFieldMessage, setEmptyFieldMessage] = useState("");

  const param = useParams();
  apiID = param.id;

  const saveInputs = (innerIndex, index) => {
    let dataArray;

    setElements((prev) => {
      dataArray = [...prev];
      dataArray[index].data = { inputFieldName, label, typeSelectField };
      dataArray[index].data = { inputFieldName, label, typeSelectField };
      return dataArray;
    });
  };

  const saveRadioInputs = (innerIndex, index) => {
    let dataArray;

    setElements((prev) => {
      dataArray = [...prev];
      dataArray[index].data = { radioValue, radioLabel };
      return dataArray;
    });
  };

  const saveCheckBox = (innerIndex, index) => {
    let dataArray;

    setElements((prev) => {
      dataArray = [...prev];
      dataArray[index].data = { checkBoxLabel };
      return dataArray;
    });
  };

  const descriptionPlaceholderHandler = (innerIndex, index) => {
    let dataArray;

    setElements((prev) => {
      dataArray = [...prev];
      dataArray[index].data = { descriptionPlaceholder };
      return dataArray;
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const droppedTargetRef = useRef(null);

  const processImage = (id) => {
    console.log("processImage", elements);
    // setElements([...elements, {type : id, data :[]}]);
    setElements([
      ...elements,
      {
        type: id,
        data: { inputFieldName: "", label: "", typeSelectField: "" },
      },
    ]);
  };
  const processComment = (id) => {
    console.log("processComment");
    setElements([
      ...elements,
      { type: id, data: { radioValue: "", radioLabel: "" } },
    ]);
  };
  const processMultipalText = (id) => {
    console.log("processMultipalText");
    setElements([...elements, { type: id, data: { checkBoxLabel: "" } }]);
  };
  const processImage3 = (id) => {
    console.log("processImage3");
    setElements([
      ...elements,
      { type: id, data: { descriptionPlaceHolder: "" } },
    ]);
  };

  const complete = () => {
    console.log("complete");
    setLoader(true);
    if (elements.every(obj => Object.values(obj.data).every(val => val !== ''))) {
      const data = {
        elements,
      };
      let axiosCall = {
        url: "https://todo-ac50c-default-rtdb.firebaseio.com/elements.json",
        method: "post",
      };
      axios({ ...axiosCall, contentType: "application/json", data })
        .then((response) => {
          setOpen(true);
          setEmptyFieldMessage("Data Added Successfully");
          const data = response.data;
          console.log("response", response.data.name);
          setId(response.data.name);
          setLoader(false);
        })
        .catch((error) => {
          setOpen(true);
          setEmptyFieldMessage("Error Occured");
          console.log("error", error);
          setLoader(false);
        });

    }else{
        console.log("not done")
        setOpen(true)
        setEmptyFieldMessage("Kindly Fill All the Values")
        setLoader(false)
    }
    
  };

  const drop = (ev) => {
    document.getElementById("completeBtn").style.display = "block";
    document.getElementById("previewText").style.display = "none";
    document.querySelectorAll("[class*=deleteBtn]").forEach((element) => {
      element.style.display = "block";
    });

    console.log("drop");
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    console.log(id);
    switch (id) {
      case "Input":
        processImage(id);
        break;
      case "RadioBox":
        processComment(id);
        break;
      case "CheckBox":
        processMultipalText(id);
        break;
      case "TextArea":
        processImage3(id);
        break;

      default:
        console.log("processDefault");
    }

    droppedTargetRef.current.style.backgroundColor = "transparent";
  };

  const dragOver = (ev) => {
    ev.preventDefault();
    // console.log('dragOver');
  };

  const dragEnter = (ev) => {
    console.log("dragEnter");
    droppedTargetRef.current.style.backgroundColor = "rgba(0,0,0,.1)";
  };

  const dragLeave = (ev) => {
    console.log("dragLeave");
    droppedTargetRef.current.style.backgroundColor = "transparent";
  };

  const deleteMe = (index) => {
    const newElements = elements.filter(
      (element, elementIndex) => elementIndex !== index
    );
    const newChildElements = childElements.filter(
      (childElement, elementIndex) => elementIndex !== index
    );
    setElements([...newElements]);
    setChildElements([...newChildElements]);
  };

  return (
    <>
      <Typography
        color="primary"
        variant="h3"
        id="previewText"
        mb={2}
        display="none"
      >
        Preview
      </Typography>
      {loader && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Box
        minHeight={"700px"}
        border={1}
        boxShadow={10}
        p={3}
        onDrop={drop} //dragged element dropped on the target
        ref={droppedTargetRef}
        onDragOver={dragOver} //when the elementis dragged over the targeted space
        onDragEnter={dragEnter} //when the element enters the targeted space
        onDragLeave={dragLeave} // leaves at the drop target
        id="droppedbox"
      >
        {elements.map((element, index) => {
          let jsx;
          if (element.type === "Input") {
            jsx = (
              <>
                <DeleteMe deleteMe={deleteMe} index={index} />
                <Image
                  index={index}
                  setInputField={setInputFieldName}
                  setPlaceholderFiledName={setLabel}
                  setTypeSelectField={setTypeSelectField}
                  saveInputs={saveInputs}
                  inputFieldName={inputFieldName}
                  elements={elements}
                  setElements={setElements}
                />
                <Snackbar
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleClose}
                  message={emptyFieldMessage}
                  action={action}
                />
              </>
            );
          } else if (element.type === "RadioBox") {
            jsx = (
              <>
                <DeleteMe deleteMe={deleteMe} index={index} />
                <Comment
                  index={index}
                  imgArr={childElements[index]}
                  saveRadioInputs={saveRadioInputs}
                  setRadioValue={setRadioValue}
                  setRadioLabel={setRadioLabel}
                  elements={elements}
                  setElements={setElements}
                />
                <Snackbar
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleClose}
                  message={emptyFieldMessage}
                  action={action}
                />
              </>
            );
          } else if (element.type === "CheckBox") {
            jsx = (
              <>
                <DeleteMe deleteMe={deleteMe} index={index} />
                <MultipalText
                  index={index}
                  imgArr={childElements[index]}
                  checkBoxLabel={checkBoxLabel}
                  setCheckBoxLabel={setCheckBoxLabel}
                  saveCheckBox={saveCheckBox}
                  setElements={setElements}
                  elements={elements}
                />
                <Snackbar
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleClose}
                  message={emptyFieldMessage}
                  action={action}
                />
              </>
            );
          } else if (element.type === "TextArea") {
            jsx = (
              <>
                <DeleteMe deleteMe={deleteMe} index={index} />
                <Image3
                  index={index}
                  setDescriptionPlaceholder={setDescriptionPlaceholder}
                  descriptionPlaceholderHandler={descriptionPlaceholderHandler}
                  setElements={setElements}
                  elements={elements}
                />
                <Snackbar
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleClose}
                  message={emptyFieldMessage}
                  action={action}
                />
              </>
            );
          }
          return <Box key={index}>{jsx}</Box>;
        })}
        {
          <Button
            sx={{ display: !!elements.length ? "block" : "none!important" }}
            variant="contained"
            id={"completeBtn"}
            onClick={complete}
          >
            Complete
          </Button>
        }
      </Box>
    </>
  );
};

export default Index;
