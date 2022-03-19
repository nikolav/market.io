import React from "react";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log('@Dashboard ', user);

  return <div>Dashboard</div>;
};

export default Dashboard;
