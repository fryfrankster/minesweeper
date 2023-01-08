import { useState } from "react";
import classes from "./Square.module.css";


const Square = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  
  const onSquareClickedHandler = (event) => {
    setIsClicked(true);
    if (props.value === "B") {
      console.log("Clicked on a bomb. Game over.");
      return;
    };
  };

  const showValue = (value) => {
    return isClicked ? value : "";
  }

  return (
    <div
      className={`${classes.square} ${isClicked ? classes.clicked : ""}`}
      onClick={onSquareClickedHandler}
    >
      <p>{showValue(props.value)}</p>
    </div>
  );
};

export default Square;
