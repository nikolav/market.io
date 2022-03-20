// import logo from './logo.svg';
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import UsersList from "./pages/UsersList";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />}>
          
          <Route index element={<UsersList />} />
          <Route path="login"    element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="dashboard" element={<Protected user={user}><Dashboard /></Protected>} /> */}
        </Route>
        <Route path="*" element={<pre>404</pre>} />

      </Routes>
    </div>
  );
};

export default App;


// https://www.youtube.com/watch?v=qZ1EFnFOGvE
