import React from "react";

const ErrorField = (props) => {
  return (
    <small className="block mt-1 text-xs text-red-600">{props.children}</small>
  );
};

export default ErrorField;
