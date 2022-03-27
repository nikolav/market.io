import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { SECTIONS, setSection } from "../features/sections/sections-slice";
import UserNavigation from "../components/UserNavigation";
import AsideList from "../components/AsideList/AsideList";
import ItemsDataGrid from "../components/ItemsDataGrid";
import SideBarActions from "../components/SideBarActions/SideBarActions";

import classes from "./Dashboard.module.css";



const Dashboard = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigateToIndex = () => dispatch(setSection(SECTIONS.index));

  if (!user) navigateToIndex();

  return (
    <div className="page-dashboard"
    >
    <UserNavigation />
      <div
        className={classes.dashboardGrid}
      >

        {/* sidebar */}
        <div
          className={`shadow-sm ${classes.dashboardSidebar}`}
          >
          <SideBarActions />
        </div>

        {/* dataGrid */}
        <div className="dashboard-column-datagrid">
          <Container fluid>
            <Row>
              <Col xs={12}>
                <ItemsDataGrid user={user} />
              </Col>
            </Row>
          </Container>
        </div>

        {/* aside */}
        <div className={`aside-list-dashboard pe-2 ${classes.dashboardAside}`}>
          <AsideList />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
