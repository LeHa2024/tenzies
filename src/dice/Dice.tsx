import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

type DiceProps = {
  value: number;
  isHeld: boolean;
  holdDice: () => void;
};

const Dice = ({ value, isHeld, holdDice }: DiceProps) => {
  const DiceArray = [
    <Dice1 size={80} />,
    <Dice2 size={80} />,
    <Dice3 size={80} />,
    <Dice4 size={80} />,
    <Dice5 size={80} />,
    <Dice6 size={80} />,
  ];
  return (
    <div
      className="dice"
      onClick={holdDice}
      style={{
        backgroundColor: isHeld ? "#59E391" : "#ffffff",
        border: "2px solid #000",
      }}
    >
      {DiceArray[value - 1]}
    </div>
  );
};

export default Dice;
