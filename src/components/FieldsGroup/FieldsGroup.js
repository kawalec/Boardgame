import "./FieldsGroup.sass";
import Field from "../Field/Field";

const FieldsGroup = ({ fieldsTypes, groupId }) => {
  const fields = fieldsTypes.map((field, i) => (
    <Field key={field.id} content={field.name} groupId={groupId} fieldId={i} />
  ));

  return <div className="fields__group">{fields}</div>;
};

export default FieldsGroup;
