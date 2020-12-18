import "./Board.sass";
import FieldsGroup from "../FieldsGroup/FieldsGroup";

const Board = ({ fieldsTypes }) => {
  const fields = [];
  for (let i = 0; i < 6; i++) {
    fields.push(<FieldsGroup key={i} fieldsTypes={fieldsTypes} groupId={i} />);
  }

  return fields;
};

export default Board;
