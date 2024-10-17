// gameContext.ts
import { createContext } from "react";
import { GameState } from "../reducer/gameReducer";

export type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<any>;
};

export const gameContext = createContext<GameContextType | undefined>(
  undefined
);
