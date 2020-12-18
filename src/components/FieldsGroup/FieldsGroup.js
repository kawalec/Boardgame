import "./FieldsGroup.sass";
import Field from "../Field/Field";

const FieldsGroup = ({ fieldsTypes }) => {
  const fields = fieldsTypes.map((field, i) => (
    <Field key={field.id} content={field.name} />
  ));

  return <div className="fields__group">{fields}</div>;
};

export default FieldsGroup;
