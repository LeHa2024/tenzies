// actionTypes.ts
export const ROLL_DICE = "ROLL_DICE";
export const HOLD_DICE = "HOLD_DICE";
export const RESET_GAME = "RESET_GAME";

// gameReducer.ts
import { generateDices } from "../contexts/gameProvider";

// Định nghĩa kiểu cho một đối tượng Dice
interface Dice {
  value: number;
  isHeld: boolean;
}

export type GameState = {
  dices: Dice[];
  tenzies: boolean;
};

// Định nghĩa kiểu cho Action
interface Action {
  type: string;
  payload?: any;
}

export default function gameReducer(
  state: GameState,
  action: Action
): GameState {
  switch (action.type) {
    case ROLL_DICE:
      return {
        ...state,
        dices: state.dices.map((dice) =>
          dice.isHeld
            ? dice
            : { value: Math.ceil(Math.random() * 6), isHeld: false }
        ),
      };

    case HOLD_DICE:
      return {
        ...state,
        dices: state.dices.map((dice, index) =>
          index === action.payload ? { ...dice, isHeld: !dice.isHeld } : dice
        ),
      };

    case RESET_GAME:
      return {
        ...state,
        dices: generateDices(),
        tenzies: false,
      };
    default:
      throw new Error("Invalid action type");
  }
}
