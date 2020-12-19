import "./Board.sass";
import FieldsGroup from "../FieldsGroup/FieldsGroup";
import Field from "../Field/Field";

const Board = ({ fieldsTypes, players, pawns }) => {
  const fields = [];
  for (let i = 0; i < 6; i++) {
    fields.push(
      <FieldsGroup
        key={i}
        fieldsTypes={fieldsTypes}
        groupId={i}
        players={players}
        pawns={pawns}
      />
    );
  }

  return (
    <>
      {fields}
      <Field content={"Meta"} players={players} pawns={pawns} />
    </>
  );
};

export default Board;
