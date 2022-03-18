import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ user, children, redirectPath = "/" }) => {
  return !user ? <Navigate to={redirectPath} replace /> : children;
};

export default Protected;
