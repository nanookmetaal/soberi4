import { useState } from "react";
import { BlankPiece, ComputerPiece, GameField, PlayerPiece } from "./game-field";
import { Button } from "../ui/button";
import { GamePiece } from "./game-field";

const emptyBoard: GamePiece[][] = Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => new BlankPiece()));

export function PlayScreen() {
  const [board, setBoard] = useState(emptyBoard);
  const [gameOver, setGameOver] = useState(false);

  function addPiece(index: number, piece: GamePiece): number {
    let placedRow = 0;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((col) => [...col]);

      for (let i = 0; i <= 5; i++) {
        if (newBoard[index][i].colour === "none") {
          placedRow = i;
          newBoard[index][i] = piece;
          break;
        }
      }

      return newBoard;
    });

    return placedRow;
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

  function checkGameOver(index: number, placedRow: number, moveBy: GamePiece): boolean {
    console.log("Checking game over");

    const columns = 7;
    const rows = 6;
    const target = 4; // Number of consecutive pieces needed to win
    const color = moveBy.colour;

    // Define directions as a map
    const directions = [
      { name: "horizontal", colStep: 1, rowStep: 0 }, // Horizontal (left-right)
      { name: "vertical", colStep: 0, rowStep: 1 }, // Vertical (up-down)
      { name: "diag1", colStep: 1, rowStep: 1 }, // Diagonal (bottom-left to top-right)
      { name: "diag2", colStep: 1, rowStep: -1 }, // Diagonal (top-left to bottom-right)
    ];

    // Helper function to count consecutive pieces in a direction
    function countInDirection(col: number, row: number, colStep: number, rowStep: number): number {
      let count = 0;
      let currentCol = col + colStep;
      let currentRow = row + rowStep;

      while (
        currentCol >= 0 &&
        currentCol < columns &&
        currentRow >= 0 &&
        currentRow < rows &&
        board[currentCol][currentRow].colour === color
      ) {
        count++;
        currentCol += colStep;
        currentRow += rowStep;
      }

      return count;
    }

    // Iterate over all directions
    for (const { name, colStep, rowStep } of directions) {
      const count =
        1 + // Include the current piece
        countInDirection(index, placedRow, colStep, rowStep) + // Forward direction
        countInDirection(index, placedRow, -colStep, -rowStep); // Backward direction

      console.log(`Checking ${name}: ${count} consecutive pieces`);

      if (count >= target) {
        console.log(`Game over! ${color} wins.`);
        return true; // Game over
      }
    }

    console.log("No winner yet.");
    return false; // No winner
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
      const placedRow = addPiece(index, playerPiece);

      // check gameover
      const isPlayerWon = checkGameOver(index, placedRow, playerPiece);
      setGameOver(isPlayerWon);

      if (!isPlayerWon) {
        setTimeout(() => {
          // computer move
          const computerMoveIndex = opponentMove();
          // check gameover
          const isOpponentWin = checkGameOver(computerMoveIndex, computerMoveIndex, computerPiece);
          setGameOver(isOpponentWin);
        }, 300);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-svh">
      <GameField board={board} onCellClick={handleCellClick} gameOver={gameOver} />
      <Button onClick={() => setBoard(Array(42).fill(new BlankPiece()))}>Restart Game</Button>
    </div>
  );
}
