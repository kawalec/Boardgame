import "./Legend.sass";

const Legend = ({ info }) => {
  const specialFields = info.map((field) => (
    <li className="legend__field" key={field.id}>
      <p>Field {field.id}</p>
      <div
        className="legend__info-box"
        style={{ background: `${field.bcg}` }}
      ></div>
      {field.description}
    </li>
  ));
  return (
    <div className="legend">
      <h2 className="legend__title">Legend:</h2>
      <ul className="legend__list">{specialFields}</ul>
    </div>
  );
};
export default Legend;
