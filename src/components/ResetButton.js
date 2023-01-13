import React from "react";

const ResetButton = (props) => {
  const onResetClickedHandler = () => {
    props.onResetClick();
  };
  return <button onClick={onResetClickedHandler}>Reset</button>;
};

export default ResetButton;
