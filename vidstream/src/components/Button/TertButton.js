import React, { Component } from "react";
import "./Button.css";

class TertButton extends Component {
  render() {
    return (
      <>
        <button
          type={this.props.type}
          name={this.props.label}
          id=""
          class="tertButton"
          onClick={this.props.actionFunction}
        >
          {this.props.label}
        </button>
      </>
    );
  }
}

export default TertButton;
