import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgetPassword from "./Components/ForgetPassword";
import PasswordReset from "./Components/PasswordReset";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
      </Route>
    </Routes>
  );
};

export default App;
