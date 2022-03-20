import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Index;
