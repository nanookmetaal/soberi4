import { useState } from "react";
import { GameField } from "./game-field";
import { Button } from "../ui/button";
import { GamePiece } from "./game-field";

// prettier-ignore
const emptyBoard: Array<GamePiece> = Array(42).fill(new GamePiece("none"));

export function PlayScreen() {
  const [board, setBoard] = useState(emptyBoard);

  const handleCellClick = (index: number) => {

    console.log(index);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-svh">
      <GameField board={board} onCellClick={handleCellClick}/>
      <Button onClick={() => setBoard(Array(42).fill("none"))}>Restart Game</Button>
    </div>
  );
}
