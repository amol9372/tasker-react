import React, { useState, useEffect } from "react";
import LoginBox from "./loginbox";
import { Redirect } from "react-router";
import { trackPromise } from "react-promise-tracker";
import LoginService from "./../../services/loginService";

const LoginPage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("[User Already Signed in]");
      setUserLoggedIn(true);
    } else {
      console.log("[User needs to login]");
    }
  }, []);

  const googleLoginResponse = (res) => {
    if (res.error) {
      setResponse(res.error);
      setUserLoggedIn(false);
      return;
    }

    const request = { id_token: res.tokenId };

    getLoginResponse("/user/google-signin", request);
  };

  const onLogin = (data) => {
    getLoginResponse("/user/login", data);
  };

  const getLoginResponse = (url, request) => {
    setResponse("");
    const response = trackPromise(LoginService.userLogin(request, url));

    response
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setResponse(res.message);

        setUserLoggedIn(res.loggedIn);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      {userLoggedIn && <Redirect to="/home" />}
      <LoginBox
        onFormSubmit={onLogin}
        response={response}
        googleLogin={googleLoginResponse}
      />
    </React.Fragment>
  );
};

export default LoginPage;
