import React from "react";
import { useSelector } from "react-redux";

// import App       from "./App";
import Dashboard from "./pages/Dashboard";
import Index     from "./pages/Index";
import Login     from "./pages/Login";
import Register  from "./pages/Register";


const sectionsMap = {
  // app       : <App />,
  dashboard : <Dashboard />,
  login     : <Login />,
  register  : <Register />,
};

const Root = () => {
  const { current } = useSelector(state => state.section);
  return sectionsMap[current] || <Index />;
};

export default Root;
