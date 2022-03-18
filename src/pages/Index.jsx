import React from "react";
// import { Outlet } from "react-router-dom";
import UsersList from "./UsersList";

const Index = () => {
  return (
    <div>
      <h1 className="display-1">hola</h1>
      <p className="lead">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <hr />
      <UsersList />
    </div>
  );
};

export default Index;
