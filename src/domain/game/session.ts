import { assignImpostors, pickSecretWord } from "./rules";
import { presetCategories } from "./presets";
import { gameSessionSchema } from "./schemas";
import type { GameSession, Player, WordListCategory } from "./types";

export interface SetupFormValues {
  playerCount: number;
  playerNames: string[];
  impostorCount: number;
  selectedSourceId: string;
  customWords: string;
  clueTimerSeconds: number | null;
}

function createSessionId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function buildPlayers(playerCount: number, playerNames: string[]): Player[] {
  return playerNames.slice(0, playerCount).map((name, index) => ({
    id: `player-${index + 1}`,
    name,
  }));
}

function resolveWordPool(selectedSourceId: string, customWords: string): string[] {
  if (selectedSourceId === "custom") {
    return customWords
      .split(/\r?\n/)
      .map((word) => word.trim())
      .filter((word) => word.length > 0);
  }

  const presetCategory = presetCategories.find((category) => category.id === selectedSourceId);
  return presetCategory?.words ?? [];
}

export function createEmptyGameSession(): GameSession {
  return {
    id: createSessionId(),
    phase: "setup",
    players: [
      { id: "player-1", name: "Player 1" },
      { id: "player-2", name: "Player 2" },
    ],
    impostorIds: ["player-2"],
    secretWord: presetCategories[0]?.words[0] ?? "Library",
    settings: {
      playerCount: 2,
      impostorCount: 1,
      selectedSourceId: presetCategories[0]?.id ?? "footballers",
      clueTimerSeconds: null,
    },
    activePlayerIndex: 0,
  };
}

export function buildGameSessionFromSetup(values: SetupFormValues): GameSession {
  if (values.playerCount < 2 || values.playerCount > 20) {
    throw new Error("Player count must be between 2 and 20");
  }

  if (values.impostorCount < 1 || values.impostorCount >= values.playerCount) {
    throw new Error("Impostor count must be at least 1 and less than the player count");
  }

  const players = buildPlayers(values.playerCount, values.playerNames);
  const wordPool = resolveWordPool(values.selectedSourceId, values.customWords);

  if (wordPool.length === 0) {
    throw new Error("Word source cannot be empty");
  }

  const secretWord = pickSecretWord(wordPool);
  const impostorIds = assignImpostors(players, values.impostorCount);

  const session = {
    id: createSessionId(),
    phase: "setup",
    players,
    impostorIds,
    secretWord,
    settings: {
      playerCount: values.playerCount,
      impostorCount: values.impostorCount,
      selectedSourceId: values.selectedSourceId,
      clueTimerSeconds: values.clueTimerSeconds,
    },
    activePlayerIndex: 0,
  };

  return gameSessionSchema.parse(session);
}

export function getPresetCategories(): ReadonlyArray<WordListCategory> {
  return presetCategories;
}
