import "./Field.sass";
const Field = ({ content, groupId, fieldId, players, pawns }) => {
  const num = groupId * 4 + fieldId + 1;
  const playerPawns = players.map((player) => {
    return (num || 25) === player.activeFieldId ? pawns[player.icon] : null;
  });
  return (
    <div className="field" num={num || 25}>
      <div className="field__content">{content}</div>
      <div className="field__numbers">{num || 25}</div>
      <div className="field__players">{playerPawns}</div>
    </div>
  );
};

export default Field;
