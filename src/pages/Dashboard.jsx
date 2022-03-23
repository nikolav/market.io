
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { SECTIONS, setSection } from "../features/sections/sections-slice";
import UsersList from "./UsersList";
import UserNavigation from "../components/UserNavigation";

const Dashboard = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const navigateToIndex = () => dispatch(setSection(SECTIONS.index));
  
  if (!user) navigateToIndex();

  return <div>
    <UserNavigation />
    <UsersList />
    {/*  
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
