import React, { Component } from "react";
import { stateManager } from "../../kStateManager";

class Header extends Component {
  constructor(props) {
    super(props);
    stateManager.subscribe(["isAuthenticated"], this);
  }

  render() {
    console.log(`This is the state : ${JSON.stringify(this.state)}`);
    if (this.state.isAuthenticated) {
      return <div>User isAuthenticated.</div>;
    }
    return <div>User Not authenticated.</div>;
  }
}

export default Header;
