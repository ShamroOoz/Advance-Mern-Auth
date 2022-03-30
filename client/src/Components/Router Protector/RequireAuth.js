import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../Features/Slices/authSlice";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const { status } = useSelector(userSelector);
  let location = useLocation();

  if (!status) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const UnauthComp = () => {
  const { status } = useSelector(userSelector);

  if (status) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default RequireAuth;
