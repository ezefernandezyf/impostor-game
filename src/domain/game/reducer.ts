import type { GameSession } from "./types";
import { createEmptyGameSession } from "./session";

export type GameAction =
  | { type: "start-game"; session: GameSession }
  | { type: "replace-session"; session: GameSession }
  | { type: "start-reveal" }
  | { type: "advance-player" }
  | { type: "start-clue-round" }
  | { type: "start-voting" }
  | { type: "finish-game" }
  | { type: "reset" };

export function gameReducer(state: GameSession, action: GameAction): GameSession {
  switch (action.type) {
    case "start-game":
      return {
        ...action.session,
        phase: "reveal",
        activePlayerIndex: 0,
      };
    case "replace-session":
      return action.session;
    case "start-reveal":
      return { ...state, phase: "reveal", activePlayerIndex: 0 };
    case "advance-player":
      return { ...state, activePlayerIndex: state.activePlayerIndex + 1 };
    case "start-clue-round":
      return { ...state, phase: "clue-round" };
    case "start-voting":
      return { ...state, phase: "voting" };
    case "finish-game":
      return { ...state, phase: "result" };
    case "reset":
      return createEmptyGameSession();
    default:
      return state;
  }
}