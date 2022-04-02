import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../Features/Slices/authSlice";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useRefreshTokenQuery } from "../../Features/Slices/AuthapiSlice";
import Loading from "../../Pages/Loading";

export const RequireAuth = ({ Public }) => {
  const { status, accessToken, persist } = useSelector(userSelector);

  let location = useLocation();

  const { isFetching, isLoading, isError } = useRefreshTokenQuery(undefined, {
    skip: !accessToken && !persist,
  });

  if (isFetching || isLoading) return <Loading />;

  if (Public) return <Outlet />;

  if (!status || isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const UnauthComp = () => {
  const { status, accessToken, persist } = useSelector(userSelector);

  const { isFetching, isLoading, isSuccess } = useRefreshTokenQuery(undefined, {
    skip: !accessToken && !persist,
  });

  if (isFetching || isLoading) return <Loading />;

  if (status && isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default RequireAuth;
