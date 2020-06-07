import React, { useState } from "react";
import FormGenerator from "../../components/FormGenerator/FormGenerator";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Register() {
  const formId = "registerForm";
  const history = useHistory();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
      email: "",
      password: "",
    },
  });

  const FormFields = () => {
    return [
      {
        label: "email-id",
        type: "text",
        required: "required",
        name: "email",
        error: formState.errors.email,
        placeHolder: "Enter Your Email-id",
        id: "email",
      },
      {
        label: "Username",
        type: "text",
        required: "required",
        name: "username",
        error: formState.errors.username,
        placeHolder: "Enter Your UserName",
        id: "username",
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
  };

  const changeHandler = (event) => {
    formState[event.target.name] = event.target.value;
    setFormState(formState);
  };

  const submitHandler = (event) => {
    let form = document.getElementById(formId);
    if (form.checkValidity && form.checkValidity()) {
      event.preventDefault();
      let { email, username, password } = formState;
      console.debug(
        `These are the values username : ${username}, email : ${email} password : ${password}`
      );
      let request = axios.post("/api/users/", {
        email: email,
        username: username,
        password: password,
      });
      request
        .then((res) => {
          alert("Successfully created account. Please Log in.");
          history.push("/login");
        })
        .catch((err) => {
          let errs = {};

          if (err.response.status === 400) {
            let errObj = err.response.data;
            Object.keys(errObj).map((key, index) => {
              errs[key] = errObj[key][0];
            });
            formState.errors = errObj;
            setFormState(formState);
            console.log(err);
          }
        });
    }
  };

  return (
    <FormGenerator
      FormFields={FormFields()}
      changeHandler={changeHandler}
      submitHandler={submitHandler}
      formId={formId}
      submitLabel="Submit"
    />
  );
}

export default Register;
