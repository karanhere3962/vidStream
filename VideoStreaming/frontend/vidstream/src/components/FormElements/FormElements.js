import React, { Component } from "react";

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
    this.validate_for = {
      email: (value) => {
        this.setState({
          error: "THis is the error.",
        });
      },
    };
  }

  render() {
    const {
      labelFor,
      labelText,
      fieldId,
      fieldValue,
      changeHandler,
      fieldName,
    } = this.props;
    let error = this.props.error || this.state.error;
    return (
      <div>
        <div className="form-group">
          <label htmlFor={labelFor}>{labelText}</label>
          <p>{error}</p>
          <input
            type="text"
            id={fieldId}
            value={fieldValue}
            onChange={changeHandler}
            className="form-control"
            name={fieldName}
          />
        </div>
      </div>
    );
  }
}

class PasswordField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  render() {
    const {
      labelFor,
      labelText,
      fieldId,
      fieldValue,
      changeHandler,
      fieldName,
    } = this.props;
    return (
      <div>
        <div className="form-group">
          <label htmlFor={labelFor}>{labelText}</label>
          <input
            type="password"
            id={fieldId}
            value={fieldValue}
            onChange={changeHandler}
            className="form-control"
            name={fieldName}
          />
        </div>
      </div>
    );
  }
}

export { TextField, PasswordField };
