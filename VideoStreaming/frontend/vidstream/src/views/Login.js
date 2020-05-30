import React, { Component } from "react";
import { stateManager } from "../kStateManager";

class Login extends Component {
  constructor(props) {
    super(props);
    stateManager.define_state(
      {
        luserName: "",
        lemail: "",
        lpassword: "",
        limage: "",
      },
      this
    );
  }

  render() {
    return <div>Login</div>;
  }
}

export default Login;
