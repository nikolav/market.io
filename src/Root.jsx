import React from "react";
import { useSelector } from "react-redux";

import Dashboard from "./pages/Dashboard";
import Index     from "./pages/Index";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import About     from "./pages/About";

const sectionsMap = {
  dashboard : <Dashboard />,
  login     : <Login />,
  register  : <Register />,
  about     : <About />,
  index     : <Index />,
};

const Root = () => {
  const { current } = useSelector(state => state.section);
  return sectionsMap[current] || <Index />;
};

export default Root;
