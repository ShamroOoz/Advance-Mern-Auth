import React from "react";
import Oauthbutton from "../Pages/Oauthbutton";
import { Formik } from "formik";
import { Form } from "formik";
import FormikControl from "./Formik/FormikControl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "../Features/Slices/AuthapiSlice";

import {
  loginValidationSchema,
  loginInitialValues,
  loginInputs as inputs,
} from "./Formik/utils";

const Login = () => {
  const [LoginUser, { isLoading }] = useLoginUserMutation();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const onSubmit = async (values, actions) => {
    let data = await LoginUser(values).unwrap();
    if (data && data?.sucess) {
      actions.setSubmitting(false);
      actions.resetForm();
      navigate(from, { replace: true });
    }
  };

  return (
    <div className=" mt-11 flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div className="hidden bg-cover lg:block lg:w-1/2 bg-gradient-to-r from-purple-500 to-pink-500"></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          Brand
        </h2>

        <p className="text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>

        <Oauthbutton />

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">
            or login with email
          </span>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <span className="flex justify-end mt-3">
          <Link
            to="/forget-password"
            className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
          >
            Forget Password?
          </Link>
        </span>

        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}
          validateOnChange={true}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              {inputs.map((input) => (
                <FormikControl key={input.id} {...input} />
              ))}

              <div className="mt-4">
                <button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  className="w-full disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  {isLoading ? "Loging in.... ✔" : "  Login "}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <Link
            to="/register"
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or sign up
          </Link>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
