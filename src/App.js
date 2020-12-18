import React, { Component } from "react";

import "./App.css";

import Panel from "./components/Panel/Panel";
import Board from "./components/Board/Board";
import Dice from "./components/Dice/Dice";
import Legend from "./components/Legend/Legend";

class App extends Component {
  state = {};
  render() {
    return <Board />;
  }
}

export default App;
