import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DescriptionIcon from "@mui/icons-material/Description";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export const LeftMenu = ({ open }) => {
  const dragStart = (ev, type) => {
    console.log("dragStart", type);
    ev.dataTransfer.setData("text", type);

    console.log(ev.dataTransfer.getData("text"));
  };



  const nonDraggable = ["Preview"];

  return (
    <List>
      {[
        ["Input", TextFieldsIcon],
        ["RadioBox", RadioButtonCheckedIcon],
        ["CheckBox", CheckBoxIcon],
        ["TextArea", DescriptionIcon],
      ].map((text, index) => {
        const Icon = text[1];
        const isDraggable = !nonDraggable.includes(text[0]);
        return (
          <ListItem
            component={Link}
            to={isDraggable ? "/" : "/preview"}
            key={text[0]}
            disablePadding
            sx={{ display: "block" }}
            onDragStart={(e) => dragStart(e, text[0])} //starts dragging
            //onDragEnd={drop}
            data-id={`song-${text[0]}`}
            id={`${text[0]}`}
            draggable={isDraggable}
            //onClick={() => clicked(text[0])}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text[0]} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default LeftMenu;
