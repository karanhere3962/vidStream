import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { stateManager } from "./kStateManager";

stateManager.set_initial_state({
  isAuthenticated: true,
});

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
