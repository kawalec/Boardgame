import "./Panel.sass";
const Panel = ({ players, winner }) => {
  const playerTurn = players.find((player) => player.activeTurn);
  const score = players.map((player) => (
    <li key={player.id}>
      <p>
        <span className="panel__players-info">
          <span className="panel__players-icon">{player.icon}</span>
          {player.name}
        </span>
        {`Liczba rzutów kostką: ${player.diceRollsSum}`}
      </p>
      <p>Losowania: {player.diceRollsFields.join(", ")}</p>
    </li>
  ));

  const winInfo = players.map((player) => (
    <li key={player.id}>
      <p>
        Gracz {player.name} wykonał {player.diceRollsSum} rzutów kostką.
      </p>
      <ul>
        <li className="panel__rolls-info">
          <span className="panel__field-info">A:</span>{" "}
          {player.diceRollsFields.filter((e) => e === "A").length}
        </li>
        <li className="panel__rolls-info">
          <span className="panel__field-info">B:</span>{" "}
          {player.diceRollsFields.filter((e) => e === "B").length}
        </li>
        <li className="panel__rolls-info">
          <span className="panel__field-info">C:</span>{" "}
          {player.diceRollsFields.filter((e) => e === "C").length}
        </li>
        <li className="panel__rolls-info">
          <span className="panel__field-info">D:</span>{" "}
          {player.diceRollsFields.filter((e) => e === "D").length}
        </li>
        <li className="panel__rolls-info">
          <span className="panel__field-info">STOP:</span>{" "}
          {player.diceRollsFields.filter((e) => e === "STOP").length}
        </li>
        <li className="panel__rolls-info">
          <span className="panel__field-info">-1:</span>{" "}
          {player.diceRollsFields.filter((e) => e === "-1").length}
        </li>
      </ul>
    </li>
  ));

  return (
    <div className="panel">
      <h1 className="panel__title">Board Game</h1>
      <p className="panel__active-player">
        {winner === null
          ? `Tura gracza: ${playerTurn.name}`
          : `Wygrał gracz: ${winner.name}`}
      </p>
      <ul className="panel__players">{winner === null ? score : winInfo}</ul>
    </div>
  );
};

export default Panel;
