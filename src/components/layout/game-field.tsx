import { Card } from "@/components/ui/card";
import Circle from "../ui/circle";
import { ArrowBigDown } from "lucide-react";
import { Button } from "../ui/button";

type GameFieldProps = {
  board: GamePiece[][];
  onCellClick: (i: number) => void;
  gameOver: boolean;
};

export type PieceType = "red" | "yellow" | "none";
export abstract class GamePiece {
  colour: PieceType;

  constructor(colour: PieceType) {
    this.colour = colour;
  }
}

export class PlayerPiece extends GamePiece {
  constructor() {
    super("red");
  }
}

export class ComputerPiece extends GamePiece {
  constructor() {
    super("yellow");
  }
}

export class BlankPiece extends GamePiece {
  constructor() {
    super("none");
  }
}

const dropColumns = [0, 1, 2, 3, 4, 5, 6];

export const GameField: React.FC<GameFieldProps> = ({ board, onCellClick, gameOver }) => {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex flex-col justify-center items-center p-10">
        <div className="p-10 grid grid-cols-7 gap-2">
          {dropColumns.map((index) => (
            <Button
              key={index}
              className="w-20 h-20 flex justify-center items-center text-3xl text-blue-500 hover:cursor-pointer transition-all hover:bg-gray-500"
              onClick={() => onCellClick(index)}
              disabled={gameOver}
            >
              <ArrowBigDown className="text-blue-500 size-10" />
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 6 }, (_, rowIndex) =>
            board.map((column, colIndex) => (
              <Card key={`${colIndex}-${5 - rowIndex}`} className="w-20 h-20 flex justify-center items-center">
                {isDev && `${colIndex},${5 - rowIndex}`}
                <Circle color={column[5 - rowIndex].colour} />
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
// 7x6 field
