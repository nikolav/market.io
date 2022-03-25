
import { 
    useState, 
    // useEffect 
} from "react";

import { firebaseApp } from "../app/firebase";

import {
    getStorage,
    ref,
    // uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  

export const storage = getStorage(firebaseApp);


const UPLOAD_CONFIG = {};

function useFirebaseStorageUpload() {

    const [status, setStatus] = useState(() => ({
        error       : null, 
        state       : null,
        progress    : null, 
        downloadURL : null }));
    
    // const [upload, {error, state, progress, downloadURL}] 
    //  = useFirebaseUploadStorage();


    return { upload, status };


    function upload (fileObject, storagePath = "/", options = null) {

      if (!fileObject) return;

      options = { ...UPLOAD_CONFIG, ...(options || {}) };

      try {
          const storageRef = ref(storage, storagePath);
          const uploadTask 
            = uploadBytesResumable(storageRef, fileObject, options);
        
          uploadTask.on("state_changed", 
            function progressHandle(snapshot) {
                setStatus(s => ({...s, state: snapshot.state,
                    progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100}));
            }, 
            function errorHandle(error) {
                // https://firebase.google.com/docs/storage/web/handle-errors
                setStatus(s => ({ ...s, error }));
            }, 
            function doneHandle() {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then(downloadURL => setStatus(s => ({ ...s, downloadURL })));
            });

      } catch (error) {
        setStatus(s => ({ ...s, error }));
      }

    }
    
}


export default useFirebaseStorageUpload;


