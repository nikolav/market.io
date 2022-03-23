import React from "react";
import UserNavigation from "../components/UserNavigation";

import InputUpload from "../components/InputUpload";

// import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyDcV6xhVV1D6jv6yjQ4Tnc8q5BS4xPVIvQ",
//   authDomain: "jfejcxjyujx.firebaseapp.com",
//   databaseURL: "https://jfejcxjyujx-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "jfejcxjyujx",
//   storageBucket: "jfejcxjyujx.appspot.com",
//   messagingSenderId: "815656493029",
//   appId: "1:815656493029:web:593d18324b0ab30cb5d90c",
//   measurementId: "G-LB96JH1BJY"
// };
// const app = initializeApp(firebaseConfig);



const ItemCreate = () => {
  return (
    <>
      <UserNavigation />
      <div>
        <InputUpload />
      </div>
    </>
  );
};

export default ItemCreate;
