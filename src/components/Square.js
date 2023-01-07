import { useState } from "react";
import classes from "./Square.module.css";

const Square = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const onSquareClickedHandler = (event) => {
    setIsClicked(true);
  };

  return (
    <div
      className={`${classes.square} ${isClicked ? classes.clicked : ""}`}
      onClick={onSquareClickedHandler}
    >
      <p></p>
    </div>
  );
};

export default Square;
