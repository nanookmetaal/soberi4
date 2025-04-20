import { useState } from "react";
import { BlankPiece, ComputerPiece, GameField, PlayerPiece } from "./game-field";
import { Button } from "../ui/button";
import { GamePiece } from "./game-field";

const emptyBoard: GamePiece[][] = Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => new BlankPiece()));

export function PlayScreen() {
  const [board, setBoard] = useState(emptyBoard);

  function addPiece(index: number, piece: GamePiece) {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];

      for (let i = 0; i <= 5; i++) {
        if (newBoard[index][i].colour === "none") {
          newBoard[index][i] = piece;
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
        if (board[col][row].colour === "none") {
          notFullColumns.push(col);
          break;
        }
      }
    }

    return notFullColumns;
  }

  function checkGameOver(index: number, moveBy: GamePiece) {
    console.log("Checking game over");
    // starting with the latest placed token - index

    console.log(`Current move: ${index}`);

    // check left if matching

    // check right if matching

    // check left if matching

    // check right if matching -> then win
  }

  function opponentMove(): number {
    // subset of non-empty indexes
    const possibleCols = getNotFullColumns();

    // pick a random row
    const randomIndex = possibleCols[Math.floor(Math.random() * possibleCols.length)];

    // make a move
    addPiece(randomIndex, new ComputerPiece());

    return randomIndex;
  }

  function colNotFull(index: number): boolean {
    for (let curr = 0; curr < 6; curr++) {
      if (board[index][curr].colour === "none") {
        return true;
      }
    }

    console.error("Selected column is full");
    return false;
  }

  const handleCellClick = (index: number) => {
    if (colNotFull(index)) {
      const playerPiece = new PlayerPiece();
      const computerPiece = new ComputerPiece();

      // player move
      addPiece(index, playerPiece);

      // check gameover
      checkGameOver(index, playerPiece);

      // setTimeout(() => {
      //   // computer move
      //   const computerMoveIndex = opponentMove();
      //   // check gameover
      //   checkGameOver(computerMoveIndex, computerPiece);
      // }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-svh">
      <GameField board={board} onCellClick={handleCellClick} />
      <Button onClick={() => setBoard(Array(42).fill(new BlankPiece()))}>Restart Game</Button>
    </div>
  );
}
