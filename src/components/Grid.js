import Square from "./Square";

import classes from "./Grid.module.css";

const Grid = (props) => {
  return (
    <div className={classes.grid}>
      {props.values.map((row) =>
        row.map(({ value, isChecked, isFlagged }) => (
          <Square
            key={Math.random()}
            value={value}
            isChecked={isChecked}
            isFlagged={isFlagged}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
