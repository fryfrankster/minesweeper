import Square from "./Square";

import classes from "./Grid.module.css";
import ResetButton from "./ResetButton";
import { useState } from "react";
import {
  DEFAULT_COLUMNS,
  DEFAULT_NUM_BOMBS,
  DEFAULT_ROWS,
  GAME_STATUSES,
} from "../constants";

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
  const [numBombsLeft, setNumBombsLeft] = useState(DEFAULT_NUM_BOMBS);
  const [numFlaggedSquares, setNumFlaggedSquares] = useState(0);

  const squareClickedHandler = (x, y) => {
    const currentSquare = gridValues[y][x];

    if (props.gameStatus === GAME_STATUSES.PLAYING) {
      if (!currentSquare.isClicked && !currentSquare.isFlagged) {
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

  const flagClickedHandler = (x, y) => {
    const currentSquare = gridValues[y][x];

    if (!currentSquare.isClicked) {
      if (currentSquare.isFlagged) {
        // removing a flag
        setNumFlaggedSquares(
          (prevNumFlaggedSquares) => prevNumFlaggedSquares - 1
        );
        if (numBombsLeft < DEFAULT_NUM_BOMBS && currentSquare.isBomb) {
          setNumBombsLeft((prevNumBombsLeft) => prevNumBombsLeft + 1);
        }
      } else {
        // adding a flag
        setNumFlaggedSquares(
          (prevNumFlaggedSquares) => prevNumFlaggedSquares + 1
        );
        if (currentSquare.isBomb) {
          setNumBombsLeft((prevNumBombsLeft) => prevNumBombsLeft - 1);
        }
      }

      setGridValues((prevGridValues) => {
        const newArray = JSON.parse(JSON.stringify(prevGridValues));
        newArray[y][x] = {
          ...newArray[y][x],
          isFlagged: !newArray[y][x].isFlagged,
        };
        return newArray;
      });

      console.log(
        numBombsLeft,
        numFlaggedSquares,
        numBombsLeft === 0,
        numFlaggedSquares === DEFAULT_NUM_BOMBS,
        numBombsLeft === 0 && numFlaggedSquares === DEFAULT_NUM_BOMBS
      );

      if (numBombsLeft === 0 && numFlaggedSquares === DEFAULT_NUM_BOMBS) {
        props.onChangeGameStatus(GAME_STATUSES.WIN);
        console.log("you have won!");
      }
    }
  };

  const resetClickedHandler = () => {
    setGridValues(
      generateGrid(DEFAULT_ROWS, DEFAULT_COLUMNS, DEFAULT_NUM_BOMBS)
    );
    setNumBombsLeft(DEFAULT_NUM_BOMBS);
    setNumFlaggedSquares(0);
    props.onChangeGameStatus(GAME_STATUSES.PLAYING);
  };

  console.log(numBombsLeft);

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
              onFlagClick={flagClickedHandler}
            />
          ))
        )}
      </div>
      <ResetButton onResetClick={resetClickedHandler} />
    </div>
  );
};

export default Grid;
