import Square from "./Square";

import classes from "./Grid.module.css";
import { useState } from "react";
import { DEFAULT_COLUMNS, DEFAULT_NUM_BOMBS, DEFAULT_ROWS } from "../constants";


const generateGrid = (rows, columns, numBombs) => {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    grid.push(row);
    for (let x = 0; x < columns; x++) {
      row.push({
        x,
        y,
        numBombsNearby: 0,
        isClicked: false,
        isFlagged: false,
        isBomb: false,
      })
    }
  }

  while (numBombs > 0) {
    const randRow = Math.floor(Math.random() * rows);
    const randColumn = Math.floor(Math.random() * columns);
    if (!grid[randRow][randColumn].isBomb) {
      grid[randRow][randColumn].isBomb = true;
      numBombs--;

      
    }
  }

  return grid;
};

const Grid = () => {
  const [gridValues, setGridValues] = useState(generateGrid(DEFAULT_ROWS, DEFAULT_COLUMNS, DEFAULT_NUM_BOMBS));

  const squareClickedHandler = (x, y) => {
    setGridValues((prevGridValues) => {
      const newArray = JSON.parse(JSON.stringify(prevGridValues));
      newArray[y][x] = {
        ...newArray[y][x],
        isClicked: !newArray[y][x].isClicked,
      };
      return newArray;
    });
  };

  return (
    <div className={classes.grid}>
      {gridValues.map((row) =>
        row.map(({ x, y, numBombsNearby, isClicked, isFlagged, isBomb }) => (
          <Square
            key={`${x}-${y}`}
            x={x}
            y={y}
            numBombsNearby={numBombsNearby}
            isClicked={isClicked}
            isFlagged={isFlagged}
            isBomb={isBomb}
            onSquareClick={squareClickedHandler}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
