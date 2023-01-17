import { useState, useEffect } from "react";

import Square from "./Square";
import classes from "./Grid.module.css";
import ResetButton from "./ResetButton";
import {
  DEFAULT_COLUMNS,
  DEFAULT_NUM_BOMBS,
  DEFAULT_ROWS,
  GAME_STATUSES,
  SURROUNDING_SQUARES,
} from "../constants";

const isInGrid = (row, col, grid) => {
  const rowLength = grid.length;
  const columnLength = grid[0].length;
  return row >= 0 && row < rowLength && col >= 0 && col < columnLength;
};

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

  while (numBombs > 0) {
    const randRow = Math.floor(Math.random() * rows);
    const randColumn = Math.floor(Math.random() * columns);
    if (!grid[randRow][randColumn].isBomb) {
      grid[randRow][randColumn].isBomb = true;
      numBombs--;

      SURROUNDING_SQUARES.forEach(({ x, y }) => {
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

const Grid = ({ gameStatus, onChangeGameStatus }) => {
  const [gridValues, setGridValues] = useState(
    generateGrid(DEFAULT_ROWS, DEFAULT_COLUMNS, DEFAULT_NUM_BOMBS)
  );

  useEffect(() => {
    const isWin = gridValues
      .flat()
      .every((square) => square.isClicked !== square.isBomb);
    if (isWin) {
      onChangeGameStatus(GAME_STATUSES.WIN);
      console.log("you won yo");
    }
  }, [gridValues, onChangeGameStatus]);

  const squareClickedHandler = (x, y) => {
    const currentSquare = gridValues[y][x];

    if (gameStatus === GAME_STATUSES.PLAYING) {
      if (!currentSquare.isClicked && !currentSquare.isFlagged) {
        setGridValues((prevGridValues) => {
          const newArray = JSON.parse(JSON.stringify(prevGridValues));
          newArray[y][x] = {
            ...newArray[y][x],
            isClicked: !newArray[y][x].isClicked,
          };
          if (newArray[y][x].numBombsNearby === 0) {
            console.log("meep");
            revealSquares(x, y, newArray);
          }
          return newArray;
        });
        if (currentSquare.isBomb) {
          console.log("you lost yo");
          onChangeGameStatus(GAME_STATUSES.LOSE);
        }
      }
    }
  };

  const flagClickedHandler = (x, y) => {
    const currentSquare = gridValues[y][x];

    if (!currentSquare.isClicked) {
      setGridValues((prevGridValues) => {
        const newArray = JSON.parse(JSON.stringify(prevGridValues));
        newArray[y][x] = {
          ...newArray[y][x],
          isFlagged: !newArray[y][x].isFlagged,
        };
        return newArray;
      });
    }
  };

  const resetClickedHandler = () => {
    setGridValues(
      generateGrid(DEFAULT_ROWS, DEFAULT_COLUMNS, DEFAULT_NUM_BOMBS)
    );
    onChangeGameStatus(GAME_STATUSES.PLAYING);
  };

  const revealSquares = (clickedX, clickedY, grid) => {
    if (grid[clickedY][clickedX].numBombsNearby !== 0) return;

    const stack = [{ x: clickedX, y: clickedY }];
    while (stack.length !== 0) {
      const { x, y } = stack.pop();
      SURROUNDING_SQUARES.forEach((changePos) => {
        const nextX = x + changePos.x;
        const nextY = y + changePos.y;
        if (isInGrid(nextY, nextX, grid)) {
          const nextSquare = grid[nextY][nextX];
          if (nextSquare.numBombsNearby === 0 && !nextSquare.isClicked) {
            stack.push({ x: nextX, y: nextY });
          }
          nextSquare.isClicked = true;
        }
      });
    }
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
