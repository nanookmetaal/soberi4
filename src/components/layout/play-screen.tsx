import { useState } from "react";
import { GameField } from "./game-field";
import { Button } from "../ui/button";
import { GamePiece } from "./game-field";

const emptyBoard: Array<GamePiece> = Array(42).fill(new GamePiece("none"));

export function PlayScreen() {
  const [board, setBoard] = useState(emptyBoard);

  function addPiece(index: number, colour: "red" | "yellow") {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];

      for (let i = 5; i >= 0; i--) {
        if (newBoard[index + 7 * i].colour === "none") {
          newBoard[index + 7 * i] = new GamePiece(colour);

          break;
        }
      }
      return newBoard;
    });
  }

  function getNotFullColumns(): number[] {
    const columns = 7;
    const notFullColumns: number[] = [];

    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < 6; row++) {
        if (board[col + row * columns].colour === "none") {
          notFullColumns.push(col);
          break;
        }
      }
    }

    return notFullColumns;
  }

  function checkGameOver() {
    console.log("Checking game over");
  }

  function opponentMove() {
    console.log("Computer turn");

    // subset of non-empty indexes
    const possibleCols = getNotFullColumns();

    // pick a random row
    const randomIndex = possibleCols[Math.floor(Math.random() * possibleCols.length)];

    // make a move
    addPiece(randomIndex, "yellow");
  }

  function colNotFull(index: number): boolean {
    for (let curr = index + 1; curr < (index + 1) * 6; curr = curr + 7) {
      if (board[curr - 1].colour === "none") {
        return true;
      }
    }

    console.log("selected column is full");
    return false;
  }

  const handleCellClick = (index: number) => {
    if (colNotFull(index)) {
      // player move
      addPiece(index, "red");

      // check gameover
      checkGameOver();

      setTimeout(() => {
        // computer move
        opponentMove();

        // check gameover
        checkGameOver();
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-svh">
      <GameField board={board} onCellClick={handleCellClick} />
      <Button onClick={() => setBoard(Array(42).fill(new GamePiece("none")))}>Restart Game</Button>
    </div>
  );
}
