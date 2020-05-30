import React, { Component } from "react";
import { stateManager } from "../../kStateManager";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    stateManager.subscribe(["isAuthenticated"], this);
  }

  render() {
    return <div className="header">this is some text</div>;
  }
}

export default Header;
