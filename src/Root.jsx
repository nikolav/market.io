import React from "react";
import { useSelector } from "react-redux";

import App from "./App";
import Dashboard from "./pages/Dashboard";

import useTokenStorage from "./hooks/use-token-storage";

const Root = () => {
  const [token, setToken] 
    = useTokenStorage(".jwtrc");
  const [token_refresh, setTokenRefresh] 
    = useTokenStorage(".jwtrc.refresh");
  
  const { user } = useSelector((state) => state.auth);
  
  // if (!user) {
  //   if (token) {
       
  //   }
  // }
  
  return user ? <Dashboard /> : <App />;
  
};

export default Root;
