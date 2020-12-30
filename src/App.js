import React, { useState, useEffect } from "react";

import "./App.sass";

import Panel from "./components/Panel/Panel";
import Board from "./components/Board/Board";
import Dice from "./components/Dice/Dice";
import Legend from "./components/Legend/Legend";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessRook,
  faChessQueen,
  faChessBishop,
  faChessPawn,
} from "@fortawesome/free-solid-svg-icons";

const pawns = [
  <FontAwesomeIcon icon={faChessRook} />,
  <FontAwesomeIcon icon={faChessQueen} />,
  <FontAwesomeIcon icon={faChessBishop} />,
  <FontAwesomeIcon icon={faChessPawn} />,
];

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

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rolledDice, setRollDice] = useState("START");
  const [winner, setWinner] = useState(null);
  const [specialFields, setSpecialFields] = useState([]);
  const [players, setPlayers] = useState([]);

  const handleRollDice = () => {
    const index = Math.floor(Math.random() * diceFields.length);
    setRollDice(diceFields[index]);
    newGame();
    const activePlayerIndex = getActivePlayer();
    const dice = diceFields[index];
    setNewActivePlayer();
    addDiceFieldsToPlayers(activePlayerIndex, dice);
    calcSumDiceRollsToPlayers(activePlayerIndex);
    const playerField = getActivePlayerField(activePlayerIndex);
    const newFields = calcNewFieldForPlayer(playerField, dice);
    const specialFields = specialFieldsActions(newFields);
    playGame(specialFields);
  };

  const getSpecialFields = () => {
    fetch("/api/fields")
      .then((res) => res.json())
      .then((data) => {
        setSpecialFields(data);
        paintingSpecialFields();
      })
      .catch((err) => console.log(new Error(err)));
  };

  const getPlayers = () => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(new Error(err)));
  };

  const paintingSpecialFields = () => {
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

  useEffect(() => {
    getPlayers();
    getSpecialFields();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getActivePlayer = () => {
    const playerIndex = players.findIndex((player) => player.activeTurn);
    return playerIndex;
  };

  const setNewActivePlayer = () => {
    const togglePlayers = [...players];
    togglePlayers.forEach((player) => {
      player.activeTurn = !player.activeTurn;
    });
    setPlayers(togglePlayers);
  };

  const addDiceFieldsToPlayers = (playerIndex, dice) => {
    const newPlayers = [...players];
    const playerRolls = [...players[playerIndex].diceRollsFields, dice];
    newPlayers[playerIndex].diceRollsFields = playerRolls;
    setPlayers(newPlayers);
  };

  const calcSumDiceRollsToPlayers = (playerIndex) => {
    players[playerIndex].diceRollsSum++;
  };

  const getActivePlayerField = (playerIndex) => {
    const field = players[playerIndex].activeFieldId;
    return field;
  };

  const calcNewFieldForPlayer = (playerField, dice) => {
    let y = (playerField - 1) % 4;
    let x = (playerField - y - 1) / 4;
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

  const specialFieldsActions = (oldField) => {
    const index = specialFields.findIndex((field) => field.id === oldField);
    let newField = index === -1 ? oldField : specialFields[index].effect;
    newField = newField > 25 ? 25 : newField;
    return newField;
  };

  const isGameOver = (field) => {
    const isGameOverFields = specialFields.filter((over) => over.isOver);
    const isGameOver =
      isGameOverFields.findIndex((over) => over.id === field) !== -1
        ? true
        : false;
    if (field >= 25) {
      const winner = players.find((player) => !player.activeTurn);
      setRollDice("START");
      setWinner(winner);
    } else if (isGameOver) {
      const winner = players.find((player) => player.activeTurn);
      setRollDice("START");
      setWinner(winner);
    }
  };

  const playGame = (playerField) => {
    isGameOver(playerField);
    let players2;
    players2 = players.map((player) => {
      if (!player.activeTurn) {
        player.activeFieldId = playerField;
      }
      return players2;
    });
  };

  const newGame = () => {
    if (winner !== null) {
      setRollDice("START");
      setWinner(null);
      setIsLoaded(false);
      setPlayers([]);

      getPlayers();
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header__panel">
          <Panel
            players={players}
            winner={winner}
            pawns={pawns}
            isLoaded={isLoaded}
          />
        </div>
      </header>
      <main className="body">
        <section className="body__fields">
          <Board fieldsTypes={fieldsTypes} players={players} pawns={pawns} />
        </section>
        <section className="body__aside">
          <div className="body__aside-dice">
            <Dice click={handleRollDice} content={rolledDice} />
          </div>
          <div className="body__aside-legend">
            <Legend info={specialFields} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
