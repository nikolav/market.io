// https://loading.io/css/

import React from "react";
import "./Spinner.css";

const Spinner = (props) => {
  return (
    <div className="opacity-50 d-flex justify-content-center align-items-center">
      <div className="spinner-circle-dotted" {...props}>
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
