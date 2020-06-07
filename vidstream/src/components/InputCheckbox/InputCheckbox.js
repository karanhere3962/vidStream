import React, { Component } from "react";
import "./InputCheckbox.css";

class InputCheckbox extends Component {
  render() {
    return (
      <div>
        <label className="customCheckbox">
          <input type="checkbox" />
          <span>{this.props.label}</span>
        </label>
      </div>
    );
  }
}

export default InputCheckbox;
