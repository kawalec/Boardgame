import React, { Component } from "react";

import "./App.sass";

import Panel from "./components/Panel/Panel";
import Board from "./components/Board/Board";
import Dice from "./components/Dice/Dice";
import Legend from "./components/Legend/Legend";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessRook, faChessQueen } from "@fortawesome/free-solid-svg-icons";

const rook = <FontAwesomeIcon icon={faChessRook} />;
const queen = <FontAwesomeIcon icon={faChessQueen} />;

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
    winner: null,
    // get from backend?
    players: [
      {
        id: 1,
        name: "Paweł",
        icon: rook,
        activeFieldId: 1,
        diceRollsSum: 0,
        diceRollsFields: [],
        activeTurn: true,
      },
      {
        id: 2,
        name: "Agnieszka",
        icon: queen,
        activeFieldId: 1,
        diceRollsSum: 0,
        diceRollsFields: [],
        activeTurn: false,
      },
    ],
  };

  paintingSpecialFields = () => {
    const node = document.querySelectorAll(".field");
    const arr = Array.from(node);
    specialFields.map((special) => {
      return arr.map((field) =>
        parseInt(field.attributes.num.value) === special.id
          ? (field.style.background = special.bcg)
          : null
      );
    });
  };

  getActivePlayer = () => {
    const playerIndex = this.state.players.findIndex(
      (player) => player.activeTurn
    );
    return playerIndex;
  };

  setNewActivePlayer = (playerIndex) => {
    let players = [...this.state.players];
    players.map((players) => {
      players.activeTurn = !players.activeTurn;
    });
  };

  addDiceFieldsToPlayers = (playerIndex, dice) => {
    const players = [...this.state.players];
    players[playerIndex].diceRollsFields.push(dice);
  };

  calcSumDiceRollsToPlayers = (playerIndex) => {
    const players = [...this.state.players];
    players[playerIndex].diceRollsSum++;
  };

  getActivePlayerField = (playerIndex) => {
    const field = this.state.players[playerIndex].activeFieldId;
    return field;
  };

  handleRollDice = () => {
    const index = Math.floor(Math.random() * this.state.dice.length);
    this.setState({
      rolledDice: this.state.dice[index],
    });

    const activePlayerIndex = this.getActivePlayer();
    const dice = this.state.dice[index];
    this.setNewActivePlayer(activePlayerIndex);
    this.addDiceFieldsToPlayers(activePlayerIndex, dice);
    this.calcSumDiceRollsToPlayers(activePlayerIndex);
  };

  componentDidMount() {
    this.paintingSpecialFields();
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="header__panel">
            <Panel players={this.state.players} winner={this.state.winner} />
          </div>
        </header>
        <main className="body">
          <section className="body__fields">
            <Board fieldsTypes={fieldsTypes} players={this.state.players} />
          </section>
          <section className="body__aside">
            <div className="body__aside-dice">
              <Dice
                click={this.handleRollDice}
                content={this.state.rolledDice}
              />
            </div>
            <div className="body__aside-legend">
              <Legend info={specialFields} />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
