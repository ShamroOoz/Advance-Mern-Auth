import React, { useState, useMemo } from "react";
import {
  useVerifyEmailQuery,
  useResendVerifyEmailMutation,
} from "../Features/Slices/AuthapiSlice";
import { useParams, Navigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/outline";
import Loading from "../Pages/Loading";

export const Emailverification = () => {
  let { token } = useParams();

  const { data, isFetching, isLoading, isError, isSuccess } =
    useVerifyEmailQuery(token);

  if (isFetching || isLoading) return <Loading />;

  if (data || isSuccess) return <Navigate to="/login" replace={true} />;

  if (isError) return <Navigate to="/custom-verified-email" replace={true} />;
};

export const CustomEmailVerification = () => {
  const [email, setemail] = useState("");

  const [ResendEmail, { isLoading }] = useResendVerifyEmailMutation();

  const isEmail = useMemo(() => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(email)) {
      return false;
    }
    return true;
  }, [email]);

  const submitListner = async () => {
    let data = await ResendEmail({ email }).unwrap();
    if (data) {
      setemail("");
      window.location.replace("/login");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-6 max-w-lg  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Verify Your Email
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          In order to start using this email you must have to verify your
          account enter your and get the email verification code..
        </p>
        <div>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gamil.com"
            onChange={(e) => setemail(e.target.value)}
            value={email || ""}
          />

          <p className="mt-2 text-sm text-red-500 dark:text-gray-400">
            {!isEmail && "Email is not valid"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => submitListner()}
          disabled={!Boolean(email) || !isEmail}
          className="mt-3 inline-flex disabled:opacity-50 items-center  py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Verify Email Adress
          <ArrowRightIcon className="ml-2 -mr-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
