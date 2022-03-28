import * as Yup from "yup";
import { Formik } from "formik";
import { Form } from "formik";
import FormikControl from "./Formik/FormikControl";
import { Link } from "react-router-dom";
import { onSubmit } from "./Formik/utils";

const ForgetPassword = () => {
  return (
    <div className=" mt-11 flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div className="hidden bg-cover lg:block lg:w-1/2 bg-gradient-to-r from-purple-500 to-pink-500"></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          Brand
        </h2>

        <p className="text-xl text-center text-gray-600 dark:text-gray-200">
          Reset your password
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email().required("Required"),
          })}
          onSubmit={onSubmit}
          validateOnChange={true}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <FormikControl
                control="input"
                type="email"
                label="Email Address"
                name="email"
              />
              <div className="mt-4">
                <button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  className="w-full disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Get Reset Link
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
            Take me back to login
          </Link>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
