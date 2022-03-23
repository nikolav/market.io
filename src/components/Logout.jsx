import React from "react";
import {
  // useSelector,
  useDispatch,
} from "react-redux";

import useCookieStorage, { JWTCOOKIE } from "../hooks/use-cookie-storage";
import { logoutUser, AUTH_LOGOUT_URI } from "../features/auth/auth-slice";

const Logout = () => {
  // const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { cookie, handleCookie } = useCookieStorage();
  
  const logout = () => {
    // 1. do server logout to cancel token refresh
    // 2. remove user tokens/cookies
    // 3. delete user redux state
    // 4. redirect to `index`
    // 5. hard refresh to reset cookie

    fetch(AUTH_LOGOUT_URI, {
      method  : "DELETE",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify({ token: cookie[JWTCOOKIE].split(" ")[0] }),
    });

    handleCookie.rm(JWTCOOKIE);
    
    dispatch(logoutUser());

    window.location = "/";
  };

  return (
    <span onClick={logout} className="cursor-pointer btn-logout d-inline-block">
      <i className="fs-3 ms-sm-2 text-primary fa-solid fa-power-off"></i>
    </span>
  );
};

export default Logout;
