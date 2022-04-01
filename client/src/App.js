import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Notfound from "./Pages/Notfound";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgetPassword from "./Components/ForgetPassword";
import PasswordReset from "./Components/PasswordReset";
import Userprofile from "./Components/Userprofile";
import {
  Emailverification,
  CustomEmailVerification,
} from "./Components/Emailverification";

import {
  RequireAuth,
  UnauthComp,
} from "./Components/Router Protector/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<RequireAuth Public={true} />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />

          {/* 404 */}
          <Route path="*" element={<Notfound />} />
        </Route>

        {/* Auth Route */}
        <Route element={<UnauthComp />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>

        <Route path="password-reset/:token" element={<PasswordReset />} />
        <Route path="verified-email/:token" element={<Emailverification />} />
        <Route
          path="custom-verified-email"
          element={<CustomEmailVerification />}
        />

        {/* Protected Route */}
        <Route element={<RequireAuth />}>
          <Route path="user-profile" element={<Userprofile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
