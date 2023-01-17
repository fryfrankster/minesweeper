import classes from "./Square.module.css";


const Square = (props) => {  
  const value = () => {
    if (props.isFlagged) {
      return "F";
    }
    if (props.isClicked) {
      if (props.isBomb) {
        return "B";
      } else {
        return props.numBombsNearby === 0 ? "" : props.numBombsNearby;
      }
    } else {
      return "";
    }
  }

  const onSquareClickedHandler = () => {
    props.onSquareClick(props.x, props.y);
  };

  const onFlagClickedHandler = (event) => {
    event.preventDefault();
    props.onFlagClick(props.x, props.y);
  };

  return (
    <div
      className={`${classes.square} ${props.isClicked ? classes.clicked : ""}`}
      onClick={onSquareClickedHandler}
      onContextMenu={onFlagClickedHandler}
    >
      {value()}
    </div>
  );
};

export default Square;
