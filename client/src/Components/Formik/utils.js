import * as Yup from "yup";

export const singUpValidationSchem = Yup.object({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const singUpInitialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const onSubmit = (values, actions) => {
  console.log("Form data", values);
  console.log(actions);
  actions.setSubmitting(false);
  actions.resetForm();
};

export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Password is required"),
});

export const loginInitialValues = {
  email: "",
  password: "",
};

export const singupInputs = [
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
