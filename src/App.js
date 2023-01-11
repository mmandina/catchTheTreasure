import React, { useState, useEffect } from "react";
import "./styles.css";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({}));

const MAX_SIZE = 10;

/*
Components:
- board
- cell
- score
- player + treasure
- buttons <- movement

State:
- score
- player position
- treasure position

- board
 state here 
  -> player position [x,y]
    --> playerX, playerY + setters
  -> treasure position [x,y]
    --> treasureX, treasureY + setters

  function placeTreasure(){
    x = random number 0-9 
    y = random number 0-9 
    x = playerX and y = playerY
  }

  function handleMove(direction){
    nextPosition = direction++
    ...
    setPlayerY(nextPosition)
  }
  useEffect(checkWithPlayerHasMetTreasure, [playerX, playerY, treasureX, treasureY])
-- player
-- treasure

*/

const buildCells = () => {
  const columns = [];
  while (columns.length < MAX_SIZE) {
    const rows = [];
    while (rows.length < MAX_SIZE) {
      rows.push({ x: rows.length, y: columns.length });
    }
    columns.push(rows);
  }
  return columns;
};

const cells = buildCells();

const Board = () => {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [treasureX, setTreasureX] = useState(9);
  const [treasureY, setTreasureY] = useState(9);
  const [score, setScore] = useState(0);

  const placeTreasure = (playerX, playerY) => {
    let potentialTreasureX = Math.floor(Math.random() * 10);
    let potentialTreasureY = Math.floor(Math.random() * 10);
    while (playerX === potentialTreasureX && playerY === potentialTreasureY) {
      potentialTreasureX = Math.floor(Math.random() * 10);
      potentialTreasureY = Math.floor(Math.random() * 10);
    }
    setTreasureY(potentialTreasureY);
    setTreasureX(potentialTreasureX);
  };

  useEffect(() => {
    placeTreasure();
  }, []);

  useEffect(() => {
    if (playerX === treasureX && playerY === treasureY) {
      placeTreasure();
      setScore(score + 1);
    }
  }, [playerX, treasureX, playerY, treasureY]);
  const movePlayer = (direction) => {
    if (direction === "up" && playerY > 0) setPlayerY(playerY - 1);
    if (direction === "down" && playerY < 9) setPlayerY(playerY + 1);
    if (direction === "left" && playerX > 0) setPlayerX(playerX - 1);
    if (direction === "right" && playerX < 9) setPlayerX(playerX + 1);
  };

  return (
    <div className="gridContainer">
      {cells.map((row) =>
        row.map(({ x, y }, i) => {
          const isPlayer = x === playerX && y === playerY;
          const isTreasure = x === treasureX && y === treasureY;
          return (
            <Cell
              key={`${x}-${y}`}
              x={x}
              y={y}
              isPlayer={isPlayer}
              isTreasure={isTreasure}
            />
          );
        })
      )}
      <div className="flexBox">
        <button onClick={() => movePlayer("up")}>up</button>
        <button onClick={() => movePlayer("down")}>down</button>
        <button onClick={() => movePlayer("left")}>left</button>
        <button onClick={() => movePlayer("right")}>right</button>
        <h1>Score: {score} </h1>
      </div>
    </div>
  );
};

const Cell = ({ isPlayer, isTreasure }) => {
  return (
    <div
      className={`cell ${isPlayer ? "player" : ""} ${
        isTreasure ? "treasure" : ""
      }`}
    >
      cell
    </div>
  );
};

export default function App() {
  // const classes = useStyles();
  return (
    <div className="App">
      <h1>Catch the Treasure</h1>
      <Board />
    </div>
  );
}
