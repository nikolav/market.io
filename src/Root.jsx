import React from "react";
import { useSelector } from "react-redux";

import App from "./App";
import Dashboard from "./pages/Dashboard";

const Root = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Dashboard /> : <App />;
  
};

export default Root;
