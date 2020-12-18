import "./Board.sass";
import FieldsGroup from "../FieldsGroup/FieldsGroup";
import Field from "../Field/Field";

const Board = ({ fieldsTypes }) => {
  const fields = [];
  for (let i = 0; i < 6; i++) {
    fields.push(<FieldsGroup key={i} fieldsTypes={fieldsTypes} groupId={i} />);
  }

  return (
    <>
      {fields}
      <Field content={"Meta"} />
    </>
  );
};

export default Board;
