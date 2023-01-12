import classes from "./Square.module.css";


const Square = (props) => {  
  const value =  props.isClicked ? props.numBombsNearby : "";

  const onSquareClickedHandler = () => {
    props.onSquareClick(props.x, props.y);
    if (props.isBomb) {
      console.log("Clicked on a bomb. Game over.");
      return;
    };
  };

  return (
    <div
      className={`${classes.square} ${props.isClicked ? classes.clicked : ""}`}
      onClick={onSquareClickedHandler}
    >
      {value}
    </div>
  );
};

export default Square;
