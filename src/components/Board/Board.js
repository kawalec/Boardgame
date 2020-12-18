import "./Board.sass";
import FieldsGroup from "../FieldsGroup/FieldsGroup";
import Field from "../Field/Field";

const Board = ({ fieldsTypes, players }) => {
  const fields = [];
  for (let i = 0; i < 6; i++) {
    fields.push(
      <FieldsGroup
        key={i}
        fieldsTypes={fieldsTypes}
        groupId={i}
        players={players}
      />
    );
  }

  return (
    <>
      {fields}
      <Field content={"Meta"} players={players} />
    </>
  );
};

export default Board;
