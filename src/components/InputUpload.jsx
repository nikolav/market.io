import React from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";

import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const firebaseApp = initializeApp({
  projectId: "market-io-1b076",
  appId: "1:504080261454:web:6a0a738d0dee1521d17e1f",
  storageBucket: "market-io-1b076.appspot.com",
  locationId: "europe-west",
  apiKey: "AIzaSyASLR5x_sS24OAuTRq3CjHCe0DFBENxb54",
  authDomain: "market-io-1b076.firebaseapp.com",
  messagingSenderId: "504080261454",
  measurementId: "G-ZE82N9WG0Y",
});

// Create a root reference
const storage = getStorage(firebaseApp);

const InputUpload = () => {
  const handleFileChange = (evt) => {
    console.log(evt);

    try {
      const f_ = evt.target.files[0];
      const storageRef = ref(storage, `${Date.now()}--${f_.name}`);

      const uploadTask = uploadBytesResumable(storageRef, f_, {});

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
    } catch (error) {
      console.dir(error);
    }
  };

  const ignore = (evt) => evt.preventDefault();
  return (
    <div className="mx-auto w-50">
      <Form onSubmit={ignore}>
        <InputGroup className="mb-3">
          <FormControl onChange={handleFileChange} type="file" />
          <InputGroup.Text>file.com</InputGroup.Text>
        </InputGroup>
      </Form>
    </div>
  );
};

export default InputUpload;
