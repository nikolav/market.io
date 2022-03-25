import React from "react";
import { useSelector, useDispatch } from "react-redux";

import useCookieStorage, { JWTCOOKIE } from "./hooks/use-cookie-storage";
import { AUTH_GETUSER_URI, setUser }   from "./features/auth/auth-slice";
import { SECTIONS, setSection }        from "./features/sections/sections-slice";

import Dashboard  from "./pages/Dashboard";
import Index      from "./pages/Index";
import Login      from "./pages/Login";
import Register   from "./pages/Register";
import About      from "./pages/About";
import ItemCreate from "./pages/ItemCreate";

const sectionsMap = {
  dashboard     : <Dashboard />,
  login         : <Login />,
  register      : <Register />,
  about         : <About />,
  index         : <Index />,
  "item-create" : <ItemCreate />,
};

const Root = () => {

  //   see if theres user after hard refresh
  //   parse cookie
  //   check user exist
  //   redirect
  
  const { cookie } = useCookieStorage();
  const { user }   = useSelector((state) => state.auth);
  const dispatch   = useDispatch();

  const navigateToDashoard = 
    () => dispatch(setSection(SECTIONS.dashboard));

  if (cookie[JWTCOOKIE] && !user) {
    fetch(AUTH_GETUSER_URI, {
      headers: { Authorization: `Bearer ${cookie[JWTCOOKIE].split(" ")[0]}` },
    })
      .then(res => {
        return res.ok ? res.json() : "";
      })
      .then(data => {
        if (data) {
          dispatch(setUser(data.user));
          navigateToDashoard();
        }
      });
  }

  const { current } = useSelector(state => state.section);
  return sectionsMap[current] || <Index />
};

export default Root;
