import React, { useState } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcV6xhVV1D6jv6yjQ4Tnc8q5BS4xPVIvQ",
  authDomain: "jfejcxjyujx.firebaseapp.com",
  databaseURL:
    "https://jfejcxjyujx-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jfejcxjyujx",
  storageBucket: "jfejcxjyujx.appspot.com",
  messagingSenderId: "815656493029",
  appId: "1:815656493029:web:593d18324b0ab30cb5d90c",
  measurementId: "G-LB96JH1BJY",
};

const fbapp = initializeApp(firebaseConfig);

const storage = getStorage(fbapp);

const gridPngRef = ref(storage, "../theme/etc/grid.png");


const InputUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (evt) => {

      console.log(evt.target.files[0]);
      console.log(Object.keys(evt.target.files[0]));
      


  };

  const ignore = evt => evt.preventDefault();
  return (
    <div className="mx-auto w-50">
        <Form onSubmit={ignore}>

      <InputGroup className="mb-3">
        <FormControl
          onChange={handleFileChange}
          type="file"
        />
        <InputGroup.Text>file.com</InputGroup.Text>
      </InputGroup>
        </Form>
    </div>
  );
};

export default InputUpload;
