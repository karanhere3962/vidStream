import React, { Component } from "react";
import "./InputBox.css";

class InputBox extends Component {
  render() {
    return (
      <div className="form-group customInputBox">
        <label htmlFor={this.props.id} className="">
          {this.props.label}
          {this.props.optional}
        </label>
        <input
          type={this.props.type}
          className="form-control"
          name={this.props.name}
          id={this.props.id}
          aria-describedby="helpId"
          placeholder={this.props.placeholder}
          required={this.props.required}
          min="0"
          minLength={this.props.minLength}
          onChange={this.props.changeHandler}
        />
        <small id="helpId" className="form-text text-danger error-text">
          {this.props.errorText}
        </small>
      </div>
    );
  }
}

export default InputBox;
