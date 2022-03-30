import * as Yup from "yup";

export const singUpValidationSchem = Yup.object({
  email: Yup.string().email().required("Email Required"),
  username: Yup.string().required("Username Required"),
  password: Yup.string().required("Password is Required"),
  passwordConfirmation: Yup.string()
    .required("Confirm Password  is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const resetValidationSchem = Yup.object({
  password: Yup.string().required("Password is Required"),
  passwordConfirmation: Yup.string()
    .required("Confirm New Password Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Email Required"),
  password: Yup.string().required("Password is Required"),
});

export const singUpInitialValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const resetInitialValues = {
  password: "",
  passwordConfirmation: "",
};

export const loginInitialValues = {
  email: "",
  password: "",
};

export const resetInputs = [
  {
    id: 2,
    control: "input",
    type: "password",
    label: "New Password",
    name: "password",
  },
  {
    id: 3,
    control: "input",
    type: "password",
    label: "Confirm New Password",
    name: "passwordConfirmation",
  },
];

export const singupInputs = [
  {
    id: 123,
    control: "input",
    type: "text",
    label: "Username",
    name: "username",
  },
  {
    id: 1,
    control: "input",
    type: "email",
    label: "Email Address",
    name: "email",
  },
  {
    id: 2,
    control: "input",
    type: "password",
    label: "Password",
    name: "password",
  },
  {
    id: 3,
    control: "input",
    type: "password",
    label: "Password Confirm",
    name: "passwordConfirmation",
  },
];

export const loginInputs = [
  {
    id: 1,
    control: "input",
    type: "email",
    label: "Email Address",
    name: "email",
  },
  {
    id: 2,
    control: "input",
    type: "password",
    label: "Password",
    name: "password",
  },
];

export const onSubmit = (values, actions) => {
  console.log("Form data", values);
  console.log(actions);
  actions.setSubmitting(false);
  actions.resetForm();
};
