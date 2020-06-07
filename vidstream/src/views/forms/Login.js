import React, { useState } from "react";
import FormGenerator from "../../components/FormGenerator/FormGenerator";
import axios from "axios";
import { useRecoilState, atom } from "recoil";
import { user } from "../../atoms";
import { useHistory } from "react-router-dom";

const loginFormAtom = atom({
  key: "loginForm",
  default: {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
    generalError: "",
  },
});

function Login(props) {
  const formId = "loginForm";
  const history = useHistory();
  const [FormState, setFormState] = useRecoilState(loginFormAtom);
  const [userState, updateUser] = useRecoilState(user);
  let formState = {};
  Object.assign(formState, FormState);
  const FormFields = [
    {
      label: "email-id",
      type: "email",
      required: "required",
      name: "username",
      error: formState.errors.email,
      placeHolder: "Enter Your Email-id",
      id: "email",
    },
    {
      label: "Password",
      type: "password",
      required: "required",
      minLength: "6",
      name: "password",
      errorText: formState.errors.password,
      placeHolder: "Enter Your Password",
      id: "password",
    },
  ];

  const changeHandler = (event) => {
    formState[event.target.name] = event.target.value;
    setFormState(formState);
  };

  const submitHandler = (event) => {
    let form = document.getElementById(formId);
    if (form.checkValidity && form.checkValidity()) {
      event.preventDefault();
      let { username, password } = formState;
      console.debug(
        `These are the values username : ${username}, password : ${password}`
      );
      let request = axios.post("/api/login/", {
        username: username,
        password: password,
      });
      request
        .then((res) => {
          console.log("User login successful.");
          let data = res.data;
          updateUser({
            isAuthenticated: true,
            authToken: data.token,
            userDetails: {
              username: data.user.username,
              email: data.user.email,
              date_joined: data.user.date_joined,
              last_login: data.user.last_login,
              profile_pic: data.user.userprofile.profile_pic,
              gender: data.user.userprofile.gender,
            },
          });
          history.push("/");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Error was caught");
            formState.generalError = "Invalid username and/or password.";
            setFormState(formState);
          }
        });
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="text-danger col-4 mx-auto">
        {formState.generalError !== "" ? formState.generalError : ""}
      </div>
      <FormGenerator
        FormFields={FormFields}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        formId={formId}
        submitLabel="Submit"
        key="formGenerator"
      />
    </div>
  );
}

export default Login;
