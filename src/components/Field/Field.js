import "./Field.sass";
const Field = ({ content, groupId, fieldId }) => {
  const num = groupId * 4 + fieldId + 1;
  return (
    <div className="field" num={num || 25}>
      {content} {num || 25}
      <div className="field__players">players pawns</div>
    </div>
  );
};

export default Field;
