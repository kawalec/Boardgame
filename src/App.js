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

const diceFields = ["A", "B", "C", "D", "STOP", "-1"];
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
  // { id: 4, effect: 3, bcg: "orange", description: "Game Over!" },
  // { id: 7, effect: 2, bcg: "yellow", description: "Game Over!" },
  {
    id: 24,
    effect: 12,
    bcg: "blue",
    description: "Go to field number 12.",
  },
];
class App extends Component {
  state = {
    // Przenieść ze stanu
    // dice: ["A", "B", "C", "D", "STOP", "-1"],
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

  calcNewFieldForPlayer = (playerField, dice) => {
    let y = (playerField - 1) % 4; //fieldId
    let x = (playerField - y - 1) / 4; //groupId
    const index = diceFields.indexOf(dice);
    if (dice === "STOP") {
      return playerField;
    } else if (dice === "-1") {
      if (x === 0 && y === 0) {
        return playerField;
      } else {
        if (y === 0) {
          x--;
          y = y + 3;
        } else {
          y--;
        }
      }
      const num = x * 4 + y + 1;
      return num;
    } else if (index > y) {
      y = index;
    } else {
      x++;
      y = index;
    }
    const num = x * 4 + y + 1;
    return num;
  };

  specialFieldsActions = (oldField) => {
    const index = specialFields.findIndex((field) => field.id === oldField);
    const newField = index === -1 ? oldField : specialFields[index].effect;
    return newField;
  };

  isGameOver = (field) => {
    // Dodać po zamknięciu czyszczenie stanu graczy!
    if (field >= 25) {
      const win = this.state.players.find((player) => player.activeTurn);
      this.setState({
        win,
      });
    } else if (field === 0) {
      const win = this.state.players.find((player) => !player.activeTurn);
      this.setState({
        win,
      });
    }
  };

  playGame = (playerField) => {
    this.isGameOver(playerField);
    let players = [...this.state.players];
    players = players.map((player) => {
      if (!player.activeTurn) {
        player.activeFieldId = playerField;
      }
      return players;
    });
  };

  handleRollDice = () => {
    const index = Math.floor(Math.random() * diceFields.length);
    this.setState({
      rolledDice: diceFields[index],
    });

    const activePlayerIndex = this.getActivePlayer();
    const dice = diceFields[index];
    this.setNewActivePlayer(activePlayerIndex);
    this.addDiceFieldsToPlayers(activePlayerIndex, dice);
    this.calcSumDiceRollsToPlayers(activePlayerIndex);
    const playerField = this.getActivePlayerField(activePlayerIndex);
    const newFields = this.calcNewFieldForPlayer(playerField, dice);
    const specialFields = this.specialFieldsActions(newFields);
    this.playGame(specialFields);
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
