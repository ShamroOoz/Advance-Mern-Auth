import React from "react";
import { Field, ErrorMessage } from "formik";
import ErrorField from "./ErrorField";

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="mt-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
        htmlFor={name}
      >
        {label}:
      </label>
      <Field
        id={name}
        name={name}
        {...rest}
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md  ring-1 outline-none
         focus:border-sky-500 focus:ring-sky-500
         "
      />
      <ErrorMessage name={name} component={ErrorField} />
    </div>
  );
};

export default Input;
