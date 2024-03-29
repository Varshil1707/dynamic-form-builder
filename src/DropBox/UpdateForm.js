import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Image from "./Containers/Input";
import Comment from "./Containers/Comment";
import MultipalText from "./Containers/CheckBox";
import { Image3 } from "./Containers/Description";
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
import { ConstructionOutlined } from "@mui/icons-material";

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

const UpdateForm = ({ setId, id }) => {
  const [elements, setElements] = useState([]);
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

  console.log(id);
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

    if (
      elements.every((obj) =>
        Object.values(obj.data).every((val) => val !== "")
      )
    ) {
      const data = {
        elements,
      };
      console.log(id);
      let axiosCall;
      if (id !== null) {
        axiosCall = {
          url: `https://todo-ac50c-default-rtdb.firebaseio.com/elements/${id}.json`,
          method: "put",
        };
        console.log(axiosCall);
      } else {
        axiosCall = {
          url: "https://todo-ac50c-default-rtdb.firebaseio.com/elements.json",
          method: "post",
        };
      }

      setOpen(true);
      axios({ ...axiosCall, contentType: "application/json", data })
        .then((response) => {
          setEmptyFieldMessage("Data Added Successfully");
          const data = response.data;
          console.log("response", response.data);
          setLoader(false);
        })
        .catch((error) => {
          setOpen(true);
          setEmptyFieldMessage("Error Occured");
          console.log("error", error);
          setLoader(false);
        });
    } else {
      setOpen(true);
      setEmptyFieldMessage("Kindly Fill All The");
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
    // console.log("dragEnter");
    droppedTargetRef.current.style.backgroundColor = "rgba(0,0,0,.1)";
  };

  const dragLeave = (ev) => {
    // console.log("dragLeave");
    droppedTargetRef.current.style.backgroundColor = "transparent";
  };

  const deleteMe = (index, index2) => {
    console.log(index, index2);

    let newElements;

    console.log(elements);

    if (index2 || index2 === 0) {
      console.log("If Condition");
      const innerIndexValue = elements
        .filter((element, elementIndex) => {
          return elementIndex === index;
        })
        .map((item) => item.data.find((i) => i.innerIndex === index2));
      console.log(innerIndexValue, innerIndexValue[0].innerIndex);

      newElements = elements.map((element, elementIndex) => {
        let newData;
        if (elementIndex === index) {
          console.log(element);
          newData = element.data.filter(
            (item) => item.innerIndex !== innerIndexValue[0].innerIndex
          );
          return { type: element.type, data: newData };
        }
        return element;
      });

      console.log(newElements);
    } else {
      console.log("Else Condition");
      newElements = elements.filter(
        (element, elementIndex) => elementIndex !== index
      );
    }

    setElements([...newElements]);
  };

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
        console.log(response);
        console.log(response.data[`${id}`].elements);
        setElements(response.data[`${id}`].elements);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log("error", error.message);
      });
  }, []);

  console.log(elements);

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

export default UpdateForm;
