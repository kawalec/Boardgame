import "./Field.sass";
const Field = ({ content, groupId, fieldId, players }) => {
  const num = groupId * 4 + fieldId + 1;
  const playerPawns = players.map((player) => {
    return num === player.activeFieldId ? player.icon : null;
  });
  return (
    <div className="field" num={num || 25}>
      {content} {num || 25}
      <div className="field__players">{playerPawns}</div>
    </div>
  );
};

export default Field;
