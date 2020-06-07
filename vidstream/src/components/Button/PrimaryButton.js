import React, { Component } from "react";
import "./Button.css";

class PrimaryButton extends Component {
  render() {
    return (
      <>
        <button
          type={this.props.type}
          name={this.props.label}
          id=""
          className={`primButton ${this.props.className}`}
          onClick={this.props.actionFunction}
        >
          {this.props.label}
        </button>
      </>
    );
  }
}

export default PrimaryButton;
