import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {

  return (
    <div>
      <ul className="list-unstyled d-flex align-items-center justify-content-around">
          <li><Link to="/">index</Link></li>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/register">register</Link></li>
      </ul>
    </div>
  );
};

export default Navigation;
