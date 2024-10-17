import { useContext } from "react";
import { gameContext } from "../contexts/gameContext";

type GameState = {
  dices: Array<{
    value: number;
    isHeld: boolean;
  }>;
  tenzies: boolean;
};

type UseGameReturn = {
  state: GameState;
  rollDices: () => void;
  holdDice: (index: number) => void;
  resetGame: () => void;
};
export type Action =
  | { type: "ROLL" }
  | { type: "HOLD_DICE"; index: number }
  | { type: "RESET" };

export const useGame = (): UseGameReturn => {
  const context = useContext(gameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  const { state, dispatch } = context;

  const rollDices = () => {
    dispatch({
      type: state.tenzies ? "RESET_GAME" : "ROLL_DICE",
    });
  };

  const holdDice = (index: number) => {
    dispatch({ type: "HOLD_DICE", payload: index });
  };

  // Hàm resetGame để reset lại game
  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  // Trả về state và các hàm hành động
  return {
    state,
    rollDices,
    holdDice,
    resetGame,
  };
};
