import { gameSessionSchema } from "../../domain/game/schemas";
import type { GameSession } from "../../domain/game/types";
import type { StorageAdapter } from "./localStorageAdapter";

const GAME_STATE_KEY = "impostor:game-state";

export function loadGameState(adapter: StorageAdapter): GameSession | null {
  const raw = adapter.read(GAME_STATE_KEY);
  if (!raw) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return null;
  }

  const result = gameSessionSchema.safeParse(parsed);

  return result.success ? result.data : null;
}

export function saveGameState(adapter: StorageAdapter, session: GameSession): void {
  adapter.write(GAME_STATE_KEY, JSON.stringify(session));
}
