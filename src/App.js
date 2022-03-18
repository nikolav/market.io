// import logo from './logo.svg';
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Protected from "./pages/Protected";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />

          {/* public routes */}
          <Route path="login"    element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* protected routes */}
          <Route path="dashboard" element={<Protected user={user}><Dashboard /></Protected>} />

        {/* error route, deault */}
        <Route path="*" element={<pre>404</pre>} />

      </Routes>
    </div>
  );
};

export default App;
