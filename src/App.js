import React, { Component } from "react";

import "./App.css";

import Panel from "./components/Panel/Panel";
import Board from "./components/Board/Board";
import Dice from "./components/Dice/Dice";
import Legend from "./components/Legend/Legend";

const fieldsTypes = [
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

  handleRollDice = () => {
    const index = Math.floor(Math.random() * this.state.dice.length);
    this.setState({
      rolledDice: this.state.dice[index],
    });
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
            <Board fieldsTypes={fieldsTypes} />
          </section>
          <section className="body__aside">
            <div className="body__aside-dice">
              <Dice
                click={this.handleRollDice}
                content={this.state.rolledDice}
              />
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
