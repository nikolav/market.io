import React from "react";
import UserNavigation from "../components/UserNavigation";

import InputUpload from "../components/InputUpload";
import Spinner from "../components/Spinner/Spinner";

const ItemCreate = () => {
  return (
    <>
      <UserNavigation />
      <div>
        <InputUpload />
      </div>
      <Spinner />
    </>
  );
};

export default ItemCreate;
