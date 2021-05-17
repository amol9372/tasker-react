import React from "react";
import { GoogleLogin } from "react-google-login";

function GoogleLoginButton(props) {
  const successResponseGoogle = (res) => {
    props.authResponse(res);
  };

  const failureResponseGoogle = (res) => {
    props.authResponse(res);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Continue with Google"
      onSuccess={successResponseGoogle}
      onFailure={failureResponseGoogle}
      cookiePolicy={"single_host_origin"}
      isSignedIn={false}
      theme="dark"
    />
  );
}

export default GoogleLoginButton;
