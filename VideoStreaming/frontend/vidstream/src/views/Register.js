import React, { Component } from "react";
import { stateManager } from "../kStateManager";
import {
  TextField,
  PasswordField,
} from "../components/FormElements/FormElements";

class Register extends Component {
  constructor(props) {
    super(props);
    stateManager.define_state(
      {
        rUserName: "",
        rEmail: "",
        rPassword: "",
        rImage: "",
      },
      this
    );
  }

  handle_form(event) {
    if (event.target.id == "rImage") {
      stateManager.set_state({
        [event.target.id]: event.target.files[0],
      });
    }
    stateManager.set_state({
      [event.target.id]: event.target.value,
    });
  }

  handle_reset(event) {
    stateManager.reset_state();
    event.preventDefault();
  }

  render() {
    console.log("This : ", this);
    return (
      <form className="container" autoComplete="on">
        <TextField
          labelFor="rUserName"
          labelText="Username : "
          fieldId="rUserName"
          fieldValue={this.state.rUserName}
          changeHandler={this.handle_form}
          name="username"
        />
        <TextField
          labelFor="rEmail"
          labelText="Email : "
          fieldId="rEmail"
          fieldValue={this.state.rEmail}
          changeHandler={this.handle_form}
          name="email"
        />
        <PasswordField
          labelFor="rPassword"
          labelText="Password : "
          fieldId="rPassword"
          fieldValue={this.state.rPassword}
          changeHandler={this.handle_form}
          name="password"
        />
        <div className="form-group">
          <label htmlFor="image">Profile Pic</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            value={this.state.rfimage}
            onChange={this.handle_image}
            accept="image/*"
            name="image"
          />
        </div>
        <button onClick={this.handle_reset} className="btn btn-primary">
          Reset State
        </button>
      </form>
    );
  }
}

export default Register;
