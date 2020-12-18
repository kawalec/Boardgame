import "./FieldsGroup.sass";
import Field from "../Field/Field";

const FieldsGroup = ({ fieldsTypes, groupId, players }) => {
  const fields = fieldsTypes.map((field, i) => (
    <Field
      key={field.id}
      content={field.name}
      groupId={groupId}
      fieldId={i}
      players={players}
    />
  ));

  return <div className="fields__group">{fields}</div>;
};

export default FieldsGroup;
