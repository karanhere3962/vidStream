import React, { Component } from "react";
import FormGenerator from "../../components/FormGenerator/FormGenerator";
import axios from "axios";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginDetails) => dispatch(fetchUser(loginDetails)),
  };
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.formId = "loginForm";
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
      generalError: "",
    };
  }

  FormFields = () => {
    return [
      {
        label: "email-id",
        type: "email",
        required: "required",
        name: "username",
        error: this.state.errors.email,
        placeHolder: "Enter Your Email-id",
        id: "email",
      },
      {
        label: "Password",
        type: "password",
        required: "required",
        minLength: "6",
        name: "password",
        errorText: this.state.errors.password,
        placeHolder: "Enter Your Password",
        id: "password",
      },
    ];
  };

  changeHandler = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
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
  render() {
    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="text-danger col-4 mx-auto">
          {this.state.generalError !== "" ? this.state.generalError : ""}
        </div>
        <FormGenerator
          FormFields={this.FormFields()}
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
          formId={this.formId}
          submitLabel="Submit"
          key="formGenerator"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
