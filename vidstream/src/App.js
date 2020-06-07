import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { stateManager } from "./kStateManager";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./views/forms/Login";
import Register from "./views/forms/Register";
import Home from "./views/Home";

stateManager.set_initial_state({
  isAuthenticated: false,
});

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
