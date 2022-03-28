import React from "react";
import iconQuestion from "../../theme/etc/question-mark.svg";
import classes from "./FormCreatePostControls.module.css";

const FormCreatePostControls = ({ onClick }) => {
  return (
    <div className="d-flex me-2 align-items-center">
      <img
        style={{
          height: 33,
        }}
        onClick={onClick.help}
        className={`p-2 d-inline-block me-2 cursor-pointer ${classes.iconBgCircle}`}
        src={iconQuestion}
        alt="help"
      />

      <i
        onClick={onClick.x}
        className={`p-2 fs-4 cursor-pointer text-primary fa-solid fa-xmark ${classes.iconBgCircle}`}
      ></i>
    </div>
  );
};

export default FormCreatePostControls;
