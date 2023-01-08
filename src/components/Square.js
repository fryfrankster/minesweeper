import { useState } from "react";
import classes from "./Square.module.css";

const Square = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  
  const onSquareClickedHandler = (event) => {
    setIsClicked(true);
    if (props.value === null) {
      return;
    };
    if (props.value === "X") {
      return;
    };
    if (props.value in ["1", "2", "3"]) {
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
