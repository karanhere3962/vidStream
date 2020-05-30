import React, { Component } from "react";
import { stateManager } from "../kStateManager";

class Register extends Component {
  constructor(props) {
    super(props);
    stateManager.define_state(
      {
        rfuserName: "",
        rfemail: "",
        rfpassword: "",
        rfimage: "",
      },
      this
    );
  }

  handle_username(event) {
    stateManager.set_state({
      rfuserName: event.target.value,
    });
  }

  handle_email(event) {
    stateManager.set_state({
      rfemail: event.target.value,
    });
  }

  handle_password(event) {
    stateManager.set_state({
      rfpassword: event.target.value,
    });
  }

  handle_image(event) {
    stateManager.set_state({
      rfimage: event.target.files[0],
    });
    console.log("THis is file : ", event.target.files[0]);
  }

  handle_reset(event) {
    stateManager.reset_state();
    event.preventDefault();
  }

  render() {
    console.log("This : ", this);
    return (
      <form className="container" autoComplete="on">
        <div className="form-group">
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            value={this.state.rfusername}
            onChange={this.handle_username}
            className="form-control"
            name="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            id="email"
            value={this.state.rfemail}
            onChange={this.handle_email}
            className="form-control"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            value={this.state.rfpassword}
            onChange={this.handle_username}
            className="form-control"
            name="password"
          />
        </div>
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
