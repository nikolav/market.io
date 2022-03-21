import React from "react";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  console.log('@Dashboard ', user);

  return <div>
    {/*  
      <Navigation />
      <StatusBar /> (show status, refresh, actions, search, +create, export etc.)
        +create item page
        +edit item page
      <SiderBar placement="left" />
      <DashboardBody>
        <DataGrid>
            <DataList>
              <DataRow>
                <DataCell />(check, [sort by] title, createdAt, edit, delete|archive)
              </DataRow>(+)
            <DataFooter /> 
          </DataList>
        </DataGrid>
      </DashboardBody>


    
    */}

  </div>;
};

export default Dashboard;
