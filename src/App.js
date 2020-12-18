import React, { Component } from "react";

import "./App.css";

import Panel from "./components/Panel/Panel";
import Board from "./components/Board/Board";
import Dice from "./components/Dice/Dice";
import Legend from "./components/Legend/Legend";
import FieldsGroup from "./components/FieldsGroup/FieldsGroup";

const fields = [
  {
    id: 0,
    name: "A",
  },
  {
    id: 1,
    name: "B",
  },
  {
    id: 2,
    name: "C",
  },
  {
    id: 3,
    name: "D",
  },
];
// get from backend
const specialFields = [
  { id: 13, effect: 0, bcg: "red", description: "Game Over!" },
  {
    id: 24,
    effect: 12,
    bcg: "blue",
    description: "Go to field number 12.",
  },
];
class App extends Component {
  state = {
    dice: ["A", "B", "C", "D", "STOP", "-1"],
    rolledDice: "START",
    win: null,
    // get from backend?
    players: [
      {
        id: 1,
        name: "Paweł",
        activeFieldId: 1,
        diceRollsSum: 0,
        diceRollsFields: [],
        activeTurn: true,
      },
      {
        id: 2,
        name: "Agnieszka",
        activeFieldId: 1,
        diceRollsSum: 0,
        diceRollsFields: [],
        activeTurn: false,
      },
    ],
  };
  render() {
    return (
      <>
        <header className="header">
          <div className="header__panel">
            <Panel />
          </div>
        </header>
        <main className="body">
          <section className="body__fields">
            <FieldsGroup />
          </section>
          <section className="body__aside">
            <div className="body__aside-dice">
              <Dice />
            </div>
            <div className="body__aside-legend">
              <Legend />
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default App;
