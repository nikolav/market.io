// Import the functions you need from the SDKs you need
const { async } = require("@firebase/util");
const {initializeApp} = require("firebase/app");
const { getStorage, ref } = require("firebase/storage");

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


const main = async () => {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    // Create a root reference
    const storage = getStorage(app);
    
    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, "./theme/etc/grid.png");
    
    console.log(storage);
    console.log(mountainsRef);

};

main()
  .catch(ref => console.log(ref));
