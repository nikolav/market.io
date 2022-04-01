import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SECTIONS, setSection } from "../features/sections/sections-slice";
import { refresh } from "../features/main/main-slice";

import UserNavigation from "../components/UserNavigation";
import AsideList from "../components/AsideList/AsideList";
import ItemsDataGrid from "../components/ItemsDataGrid";
import SideBarActions from "../components/SideBarActions/SideBarActions";

import css from "./Dashboard.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigateToIndex = () => dispatch(setSection(SECTIONS.index));

  if (!user) navigateToIndex();

  // signal list refresh
  useEffect(() => {
    dispatch(refresh());
  }, []);


  return (
    <>
      <UserNavigation />

      <div
        style={{
          position: "relative",
          top: "73px",
          height: "calc(100% - 73px - .1px)",
        }}
        className="d-flex align-items-top justify-content-between"
      >
        <div className={`me-auto ${css.dashboardSidebar}`}>
          <SideBarActions />
        </div>

        <div className="flex-grow-1 mx-4 mt-4">
          <ItemsDataGrid user={user} />
        </div>

        <div
          className={`pe-2 aside-list-dashboard ms-auto ${css.dashboardAside}`}
        >
          <AsideList user={user} />
        </div>
      </div>

      {/* <div
        className={css.dashboardGrid}
      >

        <div
          className={`shadow-sm ${css.dashboardSidebar}`}
          >
          <SideBarActions />
        </div>

        <div className="dashboard-column-datagrid">
          <Container fluid>
            <Row>
              <Col xs={12}>
                <ItemsDataGrid user={user} />
              </Col>
            </Row>
          </Container>
        </div>

        <div className={`aside-list-dashboard pe-2 ${css.dashboardAside}`}>
          <AsideList />
        </div>

      </div> */}
    </>
  );
};

export default Dashboard;
