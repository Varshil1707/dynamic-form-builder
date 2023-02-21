import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Image from "./Containers/Image";
import Comment from "./Containers/Comment";
import MultipalText from "./Containers/MultipalText";
import { Image3 } from "./Containers/Image3";
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
  const [elementData, setElementData] = useState([]);
  const [open, setOpen] = useState(false);

  const [inputFieldName, setInputFieldName] = useState("");
  const [label, setLabel] = useState("");
  const [typeSelectField, setTypeSelectField] = useState("");

  const [inputs, setInputs] = useState([]);
  const [radioFieldValues, setRadioFieldValues] = useState([]);
  const [checkBoxFieldValues, setCheckBoxFieldValues] = useState([]);
  const [descriptionValueState, setDescriptionValueState] = useState([]);

  const param = useParams();
  apiID = param.id;
  console.log(apiID);

  const radioValue = useRef();
  const radioLabel = useRef();
  const checkBoxLabel = useRef();
  const descriptionPlaceholderRef = useRef();

  const saveInputs = () => {
    setOpen(true);
    let dataArray = [];
    setInputs((prev) => {
      dataArray.push(...prev, {
        inputFieldName,
        label,
        typeSelectField,
      });
      return dataArray;
    });
  };

  const saveRadioInputs = () => {
    setOpen(true);
    const radioValueField = radioValue.current.value;
    const radioLabelField = radioLabel.current.value;

    let radioValuesArray = [];

    setRadioFieldValues((prev) => {
      radioValuesArray.push(...prev, {
        radioValueField,
        radioLabelField,
      });
      return radioValuesArray;
    });
  };

  const saveCheckBox = () => {
    setOpen(true);
    const checkBoxLabelValue = checkBoxLabel.current.value;

    let radioValuesArray = [];

    setCheckBoxFieldValues((prev) => {
      radioValuesArray.push(...prev, {
        checkBoxLabelValue,
      });
      return radioValuesArray;
    });
  };

  const descriptionPlaceholderHandler = () => {
    setOpen(true);
    const descriptionPlaceholderField = descriptionPlaceholderRef.current.value;

    let radioValuesArray = [];

    setDescriptionValueState((prev) => {
      radioValuesArray.push(...prev, {
        descriptionPlaceholderField,
      });
      return radioValuesArray;
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
    console.log(inputFieldName, label, typeSelectField);
    console.log("elements==>", elements);
    setLoader(true);

    const uniqueElements = [...new Set(elements)];
    console.log(uniqueElements);

    const dataElements = uniqueElements.map((element) => {
      let newElement;
      if (element === "Input") {
        newElement = { type: element, data: inputs };
      } else if (element === "RadioBox") {
        newElement = { type: element, data: radioFieldValues };
      } else if (element === "CheckBox") {
        newElement = { type: element, data: checkBoxFieldValues };
      } else if (element === "TextArea") {
        newElement = { type: element, data: descriptionValueState };
      }
      console.log(newElement);
      return newElement;
    });

    const data = {
      dataElements,
    };

    console.log("Line 147", dataElements);

    let axiosCall = { url: "http://localhost:3000/elements", method: "post" };
    if (apiID) {
      axiosCall = {
        url: `http://localhost:3000/elements/${apiID}`,
        method: "put",
      };
    }
    axios({ ...axiosCall, contentType: "application/json", data })
      .then((response) => {
        const data = response.data;
        console.log("response", response.data);
        setId(data.id);
        setLoader(false);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
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

  useEffect(() => {
    console.log("apiID", apiID);
    if (apiID) {
      axios({ url: `http://localhost:3000/elements/${apiID}`, method: "get" })
        .then((response) => {
          console.log(response.data);
          setElementData(response.data.dataElements);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
    console.log(elements);
  }, []);

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
      {!apiID ? (
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
            if (element === "Input") {
              jsx = (
                <>
                  <DeleteMe deleteMe={deleteMe} index={index} />
                  <Image
                    index={index}
                    setInputField={setInputFieldName}
                    setPlaceholderFiledName={setLabel}
                    setTypeSelectField={setTypeSelectField}
                    saveInputs={saveInputs}
                  />
                  <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    message="Added"
                    action={action}
                  />
                </>
              );
            } else if (element === "RadioBox") {
              jsx = (
                <>
                  <DeleteMe deleteMe={deleteMe} index={index} />
                  <Comment
                    index={index}
                    imgArr={childElements[index]}
                    saveRadioInputs={saveRadioInputs}
                    radioValue={radioValue}
                    radioLabel={radioLabel}
                  />
                  <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    message="Added"
                    action={action}
                  />
                </>
              );
            } else if (element === "CheckBox") {
              jsx = (
                <>
                  <DeleteMe deleteMe={deleteMe} index={index} />
                  <MultipalText
                    index={index}
                    imgArr={childElements[index]}
                    checkBoxLabel={checkBoxLabel}
                    saveCheckBox={saveCheckBox}
                  />
                  <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    message="Added"
                    action={action}
                  />
                </>
              );
            } else if (element === "TextArea") {
              jsx = (
                <>
                  <DeleteMe deleteMe={deleteMe} index={index} />
                  <Image3
                    index={index}
                    descriptionPlaceholderRef={descriptionPlaceholderRef}
                    descriptionPlaceholderHandler={
                      descriptionPlaceholderHandler
                    }
                  />
                  <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    message="Added"
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
      ) : (
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
          {elementData.map((element, index) => {
            let jsx;

            if (element.type === "Input") {
              jsx = (
                <>
                  {element.data.map((item) => (
                    <Image
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
                  <Comment data={element.data} key={index} />
                </>
              );
            } else if (element.type === "CheckBox") {
              jsx = (
                <>
                  {element.data.map((item, index) => (
                    <Image3
                      key={index}
                      value={item.checkBoxLabelValue}
                      label={item.checkBoxLabelValue}
                    />
                  ))}
                </>
              );
            } else if (element.type === "TextArea") {
              jsx = (
                <>
                  {element.data.map((item, index) => (
                    <MultipalText
                      key={index}
                      placeholder={`${item.place_holder}`}
                    />
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
      )}
    </>
  );
};

export default Index;
