import React from "react";
import GoogleLogin from "react-google-login";
import { useGoogleLoginMutation } from "../Features/Slices/AuthapiSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Oauthbutton = () => {
  const [googleLogintrigger, { isLoading }] = useGoogleLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const onSuccessresponse = async ({ tokenObj: { id_token: idToken } }) => {
    let data = await googleLogintrigger({ idToken, persist: true }).unwrap();
    if (data) {
      navigate(from, { replace: true });
    }
  };

  const onFailureresponse = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      className=" w-full mt-4 font-bold text-center "
      clientId={
        process.env.REACT_APP_API_CLIENT_ID ||
        "110776137747-of2a84ud56v94lcbsoa5rcdhq7stpnu4.apps.googleusercontent.com"
      }
      buttonText={isLoading ? " Loging in.... ✔  " : "Sign in with Google"}
      onSuccess={onSuccessresponse}
      onFailure={onFailureresponse}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Oauthbutton;
