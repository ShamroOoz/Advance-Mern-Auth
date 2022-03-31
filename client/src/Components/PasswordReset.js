import React from "react";
import { Formik } from "formik";
import { Form } from "formik";
import FormikControl from "./Formik/FormikControl";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../Features/Slices/AuthapiSlice";

import {
  resetValidationSchem,
  resetInitialValues,
  resetInputs as inputs,
} from "./Formik/utils";

const PasswordReset = () => {
  let { token } = useParams();
  const [ResetPassword, { isLoading }] = useResetPasswordMutation();
  let navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    let data = await ResetPassword({ ...values, resetToken: token }).unwrap();
    if (data && data?.success) {
      actions.setSubmitting(false);
      actions.resetForm();
      navigate("/login");
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

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">
            Enter new Password
          </span>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <Formik
          initialValues={resetInitialValues}
          validationSchema={resetValidationSchem}
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
                  disabled={!isValid || isSubmitting || isLoading}
                  type="submit"
                  className="w-full disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  {isLoading ? "Reseting.... ✔" : "Reset "}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <Link
            to="/login"
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            Take me Back to Login
          </Link>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
