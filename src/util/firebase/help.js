

// Sign up new users
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,

    signOut,
    updateProfile,
    updateEmail,
    sendEmailVerification,
    updatePassword,
    sendPasswordResetEmail ,
    deleteUser,
    reauthenticateWithCredential,
    // signInWithRedirect
    // getRedirectResult

 } from "firebase/auth";

const auth = getAuth();
