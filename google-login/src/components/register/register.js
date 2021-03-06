import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import GoogleLoginButton from "./../social-login/GoogleLoginButton";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Card from "../UI/card";
import MyButton from "../UI/button";
import InputField from "../UI/inputfield";
import axios from "axios";
import CardBox from "../UI/cardbox";
import Label from "../UI/label";
import { Link } from "@material-ui/core";
import { isMobile } from "react-device-detect";

axios.defaults.headers.common["X-Requested-With"] = "XmlHttpRequest";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

function Register() {
  const userAttribute = {
    value: "",
    validation: "",
    error: false,
  };
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [name, setName] = useState(userAttribute);
  const [email, setEmail] = useState(userAttribute);
  const [password, setPassword] = useState(userAttribute);
  const [confirmPassword, setConfirmPassword] = useState(userAttribute);
  const [response, setResponse] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-signed-in") === "true") {
      console.log("[User Already Signed in]");
      setUserLoggedIn(true);
    } else {
      console.log("[Redirecting to login page]");
    }
  }, []);

  const handleAuthResponse = (res) => {
    console.log("[Auth response]", res);
  };

  const loginFormSubmit = (event) => {
    setResponse("");
    event.preventDefault();

    console.log(
      "[Signup details]",
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );

    if (password.value !== confirmPassword.value) {
      setPassword({
        value: password.value,
        error: true,
      });
      setConfirmPassword({
        value: confirmPassword.value,
        validation: "Password and confirm password does not match",
        error: true,
      });

      setResponse("Please enter Correct password and confirm password");
      return;
    }

    setShowSpinner(true);
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      provider: "Application",
    };

    axios
      .post("/user/register", data, { withCredentials: true })
      .then((res) => {
        if (res.data.status === 201) {
          setShowSpinner(false);
          setResponse("User created successfully, Redirecting to login ....");
          console.log(res.data);
          setUserLoggedIn(true);
        }
      })
      .catch((error) => {
        setShowSpinner(false);
        setResponse(error.message);
        console.log(error.message);
      });
  };

  const nameHandler = (event) => {
    setName({ value: event.target.value });
  };

  const emailHandler = (event) => {
    setEmail({ value: event.target.value });
  };

  const passwordHandler = (event) => {
    setPassword({ value: event.target.value });
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword({ value: event.target.value });
  };

  const newUserStyle = {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "ceneter",
    gap: "5px",
    margin: "auto",
  };

  const cardWidth = () => {
    if (isMobile) {
      return "80%";
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={loginFormSubmit}>
        <CardBox>
          <Card width={cardWidth}>
            <Label color="hsla(0,0%,100%,.87)" font="25px">
              Register{" "}
            </Label>
            {userLoggedIn && <Redirect to="/login" />}
            <GoogleLoginButton authResponse={handleAuthResponse} />

            <Divider
              variant="fullWidth"
              style={{ background: "hsla(0,0%,80%,.37)" }}
            />

            <InputField
              label="Name"
              type="text"
              value={name.value}
              onchange={nameHandler}
              error={name.error}
              validationText={name.validation}
              required={true}
            />

            <InputField
              label="Email"
              type="text"
              value={email.value}
              onchange={emailHandler}
              error={email.error}
              validationText={email.validation}
              required={true}
            />
            <InputField
              label="Password"
              type="text"
              value={password.value}
              onchange={passwordHandler}
              error={password.error}
              validationText={password.validation}
              required={true}
            />

            <InputField
              label="Confirm Password"
              type="password"
              value={confirmPassword.value}
              onchange={confirmPasswordHandler}
              error={confirmPassword.error}
              validationText={confirmPassword.validation}
              required={true}
            />

            <MyButton
              backgroundColor="purple"
              text="Sign Up"
              size="medium"
              type="submit"
            />

            <div style={newUserStyle}>
              <Label color="hsla(2,40%,90%,.77)"> Already Registered ? </Label>
              <Link href="/login" color="secondary">
                Login
              </Link>
            </div>
          </Card>

          {showSpinner && <CircularProgress color="secondary" />}

          {response && <label style={{ color: "white" }}>{response} </label>}
        </CardBox>
      </form>
    </React.Fragment>
  );
}

export default Register;
