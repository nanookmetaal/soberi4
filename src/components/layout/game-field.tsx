import { Card } from "@/components/ui/card";
import Circle from "../ui/circle";

type GameFieldProps = {
  board: GamePiece[];
  onCellClick: (index: number) => void;
};

export class GamePiece {
  constructor(public colour: "red" | "yellow" | "none") {}
}

const dropColumns = [0, 1, 2, 3, 4, 5, 6]

export const GameField: React.FC<GameFieldProps> = ({ board }) => {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex flex-col justify-center items-center p-10">
        <div className="p-10 grid grid-cols-7 gap-2">
          {dropColumns.map((index) => (
            <Card key={index} className="w-20 h-20 flex justify-center items-center text-3xl text-blue-500 hover:cursor-pointer transition-all hover:bg-gray-500">
              V
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {board.map((cell, index) => (
            <Card key={index} className="w-20 h-20 flex justify-center items-center">
              <Circle color={cell.colour} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
// 7x6 field
