import React, { useState, useEffect, useContext } from "react";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {

  const [user, setUser]     = useState(null);
  const [status, setStatus] = useState({
    error   : null, 
    loading : true, 
  });
  
  const valueAuth = {

    user,
    login,
    register,
    logout,

    resetPassword,
    updatePassword,
    updateEmail,
    
    status,
  };
  
  useEffect(() => {

    // listen for user signal 
    // browser cache, token, server, etc.
    
      // unsubscribe
      // return onAuthStateChanged(user => {
      //   setUser(_ => user);
      //   setStatus(_ => ({..._, loading: false}));
      // });

  }, []);
  
  return <AuthContext.Provider value={valueAuth}>{children}</AuthContext.Provider>;

  //
  async function login    ( credentials = null) {
    // return autenticateUserWithCredentials(user);
    // let auth = null;
    // try {
    //   auth = !credentials 
    //     ? authService.reAuthenticate() 
    //     : authService.authenticate({
    //         strategy: "local", 
    //         ...credentials });
      
    //   setUser(_ => auth);
    //   setStatus(_ => ({ ..._, loading: false }));

    // } catch (error) {
    //   setError(_ => error);
    // }

    // return auth;
  }
  function register (user) {
    // return createUserIfNotExist(user);
  }
  function logout   (user) {
    // return logoutUser(user)
  }
  function resetPassword (userData) {
    // resetPasswordAndSendPasswordResetEmail();
  }
  function updatePassword (user, password) {}
  function updateEmail (user, email) {}
}
