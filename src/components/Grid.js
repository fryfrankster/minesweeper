import Square from "./Square";

import classes from "./Grid.module.css";
import ResetButton from "./ResetButton";
import { useState } from "react";
import { DEFAULT_COLUMNS, DEFAULT_NUM_BOMBS, DEFAULT_ROWS, GAME_STATUSES } from "../constants";

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
      });
    }
  }

  const surroundingSquares = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  while (numBombs > 0) {
    const randRow = Math.floor(Math.random() * rows);
    const randColumn = Math.floor(Math.random() * columns);
    if (!grid[randRow][randColumn].isBomb) {
      grid[randRow][randColumn].isBomb = true;
      numBombs--;

      surroundingSquares.forEach(({ x, y }) => {
        const nextRow = randRow + y;
        const nextColumn = randColumn + x;
        if (
          nextRow >= 0 &&
          nextRow < rows &&
          nextColumn >= 0 &&
          nextColumn < columns
        ) {
          grid[nextRow][nextColumn].numBombsNearby++;
        }
      });
    }
  }
  return grid;
};

const Grid = (props) => {
  const [gridValues, setGridValues] = useState(
    generateGrid(DEFAULT_ROWS, DEFAULT_COLUMNS, DEFAULT_NUM_BOMBS)
  );

  const squareClickedHandler = (x, y) => {
    const currentSquare = gridValues[y][x];

    if (props.gameStatus === GAME_STATUSES.PLAYING) {
      if (!currentSquare.isClicked) {
        setGridValues((prevGridValues) => {
          const newArray = JSON.parse(JSON.stringify(prevGridValues));
          newArray[y][x] = {
            ...newArray[y][x],
            isClicked: !newArray[y][x].isClicked,
          };
          return newArray;
        });
  
        if (currentSquare.isBomb) {
          props.onChangeGameStatus(GAME_STATUSES.LOSE);
        }
      }
    }
  };

  const resetClickedHandler = () => {
    setGridValues(
      generateGrid(DEFAULT_ROWS, DEFAULT_COLUMNS, DEFAULT_NUM_BOMBS)
    );
    props.onChangeGameStatus(GAME_STATUSES.PLAYING);
  };

  return (
    <div>
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
      <ResetButton onResetClick={resetClickedHandler}/>
    </div>
  );
};

export default Grid;
