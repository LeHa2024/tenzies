import { useGame } from "../hooks/useGame";
import Dice from "./Dice";

type AllDiceProps = {
  gameStarted: boolean; // Trạng thái game có đang chạy hay không
  onRoll: () => void; // Hàm để xử lý khi người dùng roll dice
};

export default function AllDice({ gameStarted, onRoll }: AllDiceProps) {
  const { state, rollDices, holdDice } = useGame();

  return (
    <div className="alldices">
      <div className="all-dice">
        {state.dices.map((dice, index) => (
          <Dice
            key={index}
            value={dice.value}
            isHeld={dice.isHeld}
            holdDice={() => holdDice(index)}
          />
        ))}
      </div>

      {gameStarted && (
        <button
          onClick={() => {
            rollDices();
            onRoll(); // Cập nhật trạng thái khi roll dice
          }}
          style={{ marginTop: "20px", padding: "10px" }}
        >
          {state.tenzies ? "New Game" : "Roll"}
        </button>
      )}
    </div>
  );
}
