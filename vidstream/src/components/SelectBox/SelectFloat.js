import React, { Component } from "react";
import "./SelectBox.css";

class SelectFloat extends Component {
  render() {
    return (
      <div>
        <div class="form-group customSelectFloat">
          <label for={this.props.id}>{this.props.label}</label>
          <select class="form-control" name={this.props.label} id={this.props.id}>
            {this.props.children}
          </select>
        </div>
      </div>
    );
  }
}

export default SelectFloat;
