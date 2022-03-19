import React from "react";
import { Outlet } from "react-router-dom";
import Navigatoin from "../components/Navigatoin";

const Index = () => {
  return (
    <>
      <Navigatoin />
      <Outlet />
    </>
  );
};

export default Index;
