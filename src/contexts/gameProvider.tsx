import { useReducer, useEffect, ReactNode } from "react";
import gameReducer from "../reducer/gameReducer";
import { gameContext } from "./gameContext";

// Hàm khởi tạo xúc xắc ngẫu nhiên
export const generateDices = () => {
  return Array.from({ length: 10 }, () => ({
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
  }));
};

export type Dice = {
  value: number;
  isHeld: boolean;
};

export type GameStateLocal = {
  dices: Dice[];
  tenzies: boolean;
};

// Khai báo kiểu cho trạng thái trò chơi
export const initialState: GameStateLocal = {
  dices: generateDices(),
  tenzies: false,
};
type GameProviderProps = {
  children: ReactNode; // Kiểu cho props children
};

// Hàm để reset game

export default function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" }); // Đảm bảo bạn đã định nghĩa action "RESET_GAME" trong gameReducer
  };
  useEffect(() => {
    const allHeld = state.dices.every((dice) => dice.isHeld);
    const firstValue = state.dices[0].value;
    if (allHeld && state.dices.every((dice) => dice.value === firstValue)) {
      resetGame(); // Gọi hàm resetGame khi người chơi thắng
    }
  }, [state.dices]);

  return (
    <gameContext.Provider value={{ state, dispatch }}>
      {children}
    </gameContext.Provider>
  );
}
