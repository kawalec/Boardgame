import "./Dice.sass";

const Dice = ({ content, click }) => {
  return (
    <button className="dice" onClick={click}>
      {content}
    </button>
  );
};

export default Dice;
