import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Preview from "../DropBox/Containers/Preview";
import { Test } from "./Index";

const ProtectedRoutes = ({ id, handleDrawerClose, open, theme, setId }) => {
  const location = useLocation();
  const isPreview = /preview/.test(location.pathname);
  console.log(isPreview);
  if (id !== null) {
    return <Preview id={id} />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
