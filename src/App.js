// import logo from './logo.svg';
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Index     from "./pages/Index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* <Route path="*" element={<div />}/> */}
      </Routes>
    </div>
  );
}

export default App;
