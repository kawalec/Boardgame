import "./FieldsGroup.sass";
import Field from "../Field/Field";

const FieldsGroup = ({ fieldsTypes, groupId, players, pawns }) => {
  const fields = fieldsTypes.map((field, i) => (
    <Field
      key={field.id}
      content={field.name}
      groupId={groupId}
      fieldId={i}
      players={players}
      pawns={pawns}
    />
  ));

  return <div className="fields__group">{fields}</div>;
};

export default FieldsGroup;
