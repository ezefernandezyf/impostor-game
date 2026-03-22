export interface Player {
  id: string;
  name: string;
}

export interface GameSettings {
  playerCount: number;
  impostorCount: number;
  selectedSourceId: string;
  clueTimerSeconds: number | null;
}

export interface WordListCategory {
  id: string;
  name: string;
  words: string[];
  preset: boolean;
}

export interface GameSession {
  id: string;
  phase: "setup" | "reveal" | "clue-round" | "voting" | "result";
  players: Player[];
  impostorIds: string[];
  secretWord: string;
  settings: GameSettings;
  activePlayerIndex: number;
}

export interface Vote {
  voterId: string;
  targetId: string;
}

export interface GameResult {
  winners: "players" | "impostors";
  votedPlayerId: string;
}
