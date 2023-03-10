import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Image from "./Containers/Image";
import Comment from "./Containers/Comment";
import MultipalText from "./Containers/MultipalText";
import { Image3 } from "./Containers/Image3";
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

const UpdateForm = ({ setId }) => {
  const [elements, setElements] = useState([]);
  const [childElements, setChildElements] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [emptyFieldMessage, setEmptyFieldMessage] = useState("");

  const [inputFieldName, setInputFieldName] = useState("");
  const [label, setLabel] = useState("");
  const [typeSelectField, setTypeSelectField] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [radioLabel, setRadioLabel] = useState("");
  const [checkBoxLabel, setCheckBoxLabel] = useState("");
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState("");

  const [inputs, setInputs] = useState([]);
  const [radioFieldValues, setRadioFieldValues] = useState([]);
  const [checkBoxFieldValues, setCheckBoxFieldValues] = useState([]);
  const [descriptionValueState, setDescriptionValueState] = useState([]);

  const param = useParams();
  apiID = param.id;

  const saveInputs = (index) => {
    let dataArray = [];
    const existingIndex = inputs.find((element) => element.index === index);

    if (!inputFieldName || !label || !typeSelectField) {
      setEmptyFieldMessage("Please Fill ALl The Fields");
    } else {
      if (!existingIndex) {
        setInputs((prev) => {
          dataArray.push(...prev, {
            inputFieldName,
            label,
            typeSelectField,
          });
          return dataArray;
        });
      } else {
        const updatedState = inputs.map((item) => {
          if (item.index === index) {
            item.index = index;
            item.inputFieldName = inputFieldName;
            item.label = label;
          }
          return item;
        });

        setInputs(updatedState);
      }
      setEmptyFieldMessage("Added");
    }

    setOpen(true);
  };

  const saveRadioInputs = (index) => {
    let radioValuesArray = [];
    const existingIndex = radioFieldValues.find(
      (element) => element.index === index
    );

    if (!radioValue || !radioLabel) {
      setEmptyFieldMessage("Please Fill ALl the Fields");
    } else {
      if (!existingIndex) {
        setRadioFieldValues((prev) => {
          radioValuesArray.push(...prev, {
            index,
            radioValue,
            radioLabel,
          });
          return radioValuesArray;
        });
      } else {
        const updatedRadioState = radioFieldValues.map((item) => {
          if (item.index === index) {
            item.index = index;
            item.radioValue = radioValue;
            item.radioLabel = radioLabel;
          }
          return item;
        });
        setRadioFieldValues(updatedRadioState);
      }
      setEmptyFieldMessage("Added");
    }
    setOpen(true);
  };

  const saveCheckBox = (index) => {
    let radioValuesArray = [];
    const existingIndex = checkBoxFieldValues.find(
      (element) => element.index === index
    );
    if (!checkBoxLabel) {
      setEmptyFieldMessage("Please Fill All The Fields");
    } else {
      if (!existingIndex) {
        setCheckBoxFieldValues((prev) => {
          radioValuesArray.push(...prev, {
            checkBoxLabel,
          });
          return radioValuesArray;
        }); 
      } else {
        const updateCheckboxState = checkBoxFieldValues.map((item) => {
          if (item.index === index) {
            item.index = index;
            item.checkBoxLabel = checkBoxLabel;
          }
          return item;
        });
        setCheckBoxFieldValues(updateCheckboxState);
      }
      setEmptyFieldMessage("Added");
    }
    setOpen(true);
  };

  const descriptionPlaceholderHandler = (index) => {
    let radioValuesArray = [];
    const existingIndex = descriptionValueState.find(
      (element) => element.index === index
    );

    if (!descriptionPlaceholder) {
      setEmptyFieldMessage("Please Fill All The Fields");
    } else {
      if (!existingIndex) {
        setDescriptionValueState((prev) => {
          radioValuesArray.push(...prev, {
            descriptionPlaceholder,
          });
          return radioValuesArray;
        });
      } else {
        const updatedDescriptionState = descriptionValueState.map((item) => {
          if (item.index === index) {
            item.index = index;
            item.descriptionPlaceholder = descriptionPlaceholder;
          }
          return item;
        });
        setDescriptionValueState(updatedDescriptionState);
      }
      setEmptyFieldMessage("Added");
    }

    setOpen(true);
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
    setElements([...elements, id]);
  };
  const processComment = (id) => {
    console.log("processComment");
    setElements([...elements, id]);
  };
  const processMultipalText = (id) => {
    console.log("processMultipalText");
    setElements([...elements, id]);
  };
  const processImage3 = (id) => {
    console.log("processImage3");
    setElements([...elements, id]);
  };

  const complete = () => {
    console.log("complete");

    console.log("elements==>", elements);
  
    const uniqueElements = [...new Set(elements)];
    console.log("uniqueElements ====>", uniqueElements);

    const dataElements = uniqueElements.map((element) => {
      let newElement;
      if (element === "Input") {
        newElement = { type: element, data: inputs };
      } else if (element.type === "Input") {
        newElement = { type: element.type, data: element.data };
      } else if (element === "RadioBox") {
        newElement = { type: element, data: radioFieldValues };
      } else if (element.type === "RadioBox") {
        newElement = { type: element.type, data: element.data };
      } else if (element === "CheckBox") {
        newElement = { type: element, data: checkBoxFieldValues };
      } else if (element.type === "CheckBox") {
        newElement = { type: element.type, data: element.data };
      } else if (element === "TextArea") {
        newElement = { type: element, data: descriptionValueState };
      } else if (element.type === "TextArea") {
        newElement = { type: element.type, data: element.data };
      }

      return newElement;
    });

    const data = {
      dataElements,
    };

    console.log("Line 262", data);
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
    // console.log("dragEnter");
    droppedTargetRef.current.style.backgroundColor = "rgba(0,0,0,.1)";
  };

  const dragLeave = (ev) => {
    // console.log("dragLeave");
    droppedTargetRef.current.style.backgroundColor = "transparent";
  };

  const deleteMe = (index,index2) => {
    console.log(index2,index)


    const newElements = elements.filter(
      (element, elementIndex) => elementIndex !== index || element[index].data.index !== index2
    );




    const newChildElements = childElements.filter(
      (childElement, elementIndex) => elementIndex !== index
    );
    setElements([...newElements]);
    setChildElements([...newChildElements]);

  };

  useEffect(() => {
    setLoader(true);
    console.log("apiID", apiID);
    if (apiID) {
      axios({ url: `http://localhost:3000/elements/${apiID}`, method: "get" })
        // axios({ url: `https://dynamic-form-builder-json-server.onrender.com/elements/${apiID}`, method: "get" })
        .then((response) => {
          console.log(response.data.dataElements);
          const res = response.data.dataElements.map((item) => item);
          setElements(res);

          setLoader(false);
        })
        .catch((error) => {
          console.log("error", error.message);
          setLoader(false);
        });
    }
  }, []);
  console.log(elements);

  // const inputsData = elements.filter((item) => item.type === "Input")

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
                {element.data.map((item, index2) => (
                  <>
                    <DeleteMe deleteMe={() => deleteMe(index,index2)}  />
                    <Image
                      key={index}
                      index={index}
                      index2={index2}
                      value={item}
                      setElements={setElements}
                    />
                    <Snackbar
                      open={open}
                      autoHideDuration={1000}
                      onClose={handleClose}
                      message="Added"
                      action={action}
                    />
                  </>
                ))}
              </>
            );
          } else if (element === "Input") {
            jsx = (
              <>
                <DeleteMe deleteMe={deleteMe} index={index} />
                <Image
                  index={index}
                  key={index}
                  setInputField={setInputFieldName}
                  setPlaceholderFiledName={setLabel}
                  setTypeSelectField={setTypeSelectField}
                  saveInputs={saveInputs}
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
                {element.data.map((item, index2) => (
                  <>
                    <DeleteMe deleteMe={()=>deleteMe(index,index2)}  />
                    <Comment
                      index={index}
                      key={index}
                      index2={index2}
                      saveRadioInputs={saveRadioInputs}
                      radioValue={radioValue}
                      radioLabel={radioLabel}
                      value={item}
                      setElements={setElements}
                    />
                    <Snackbar
                      open={open}
                      autoHideDuration={1000}
                      onClose={handleClose}
                      message="Added"
                      action={action}
                    />
                  </>
                ))}
              </>
            );
          } else if (element === "RadioBox") {
            jsx = (
              <>
                <DeleteMe deleteMe={deleteMe} index={index} />
                <Comment
                  index={index}
                  key={index}
                  saveRadioInputs={saveRadioInputs}
                  setRadioValue={setRadioValue}
                  setRadioLabel={setRadioLabel}
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
                {element.data.map((item, index2) => (
                  <>
                    <DeleteMe deleteMe={deleteMe} index={index} />
                    <MultipalText
                      key={index}
                      index={index}
                      index2={index2}
                      checkBoxLabel={checkBoxLabel}
                      saveCheckBox={saveCheckBox}
                      value={item}
                      setElements={setElements}
                    />
                    <Snackbar
                      open={open}
                      autoHideDuration={1000}
                      onClose={handleClose}
                      message="Added"
                      action={action}
                    />
                  </>
                ))}
              </>
            );
          } else if (element === "CheckBox") {
            jsx = (
              <>
                <DeleteMe deleteMe={deleteMe} index={index} />
                <MultipalText
                  index={index}
                  key={index}
                  setCheckBoxLabel={setCheckBoxLabel}
                  saveCheckBox={saveCheckBox}
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
                {element.data.map((item, index2) => (
                  <>
                    <DeleteMe deleteMe={deleteMe} index={index} />
                    <Image3
                      index={index}
                      key={index}
                      index2={index2}
                      descriptionPlaceholderHandler={
                        descriptionPlaceholderHandler
                      }
                      value={item}
                      setElements={setElements}
                    />
                    <Snackbar
                      open={open}
                      autoHideDuration={1000}
                      onClose={handleClose}
                      message="Added"
                      action={action}
                    />
                  </>
                ))}
              </>
            );
          } else if (element === "TextArea") {
            jsx = (
              <>
                <DeleteMe deleteMe={deleteMe} index={index} />
                <Image3
                  index={index}
                  key={index}
                  setDescriptionPlaceholder={setDescriptionPlaceholder}
                  descriptionPlaceholderHandler={descriptionPlaceholderHandler}
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

export default UpdateForm;
