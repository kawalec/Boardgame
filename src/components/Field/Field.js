import "./Field.sass";

const Field = ({ content }) => {
  return (
    <div className="field">
      {content}
      <div className="field__players">players pawns</div>
    </div>
  );
};

export default Field;
