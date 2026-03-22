import type { GameResult, GameSession, Player } from "./types";

export function pickSecretWord(words: string[]): string {
  if (words.length === 0) {
    throw new Error("Cannot pick a secret word from an empty list");
  }

  return words[Math.floor(Math.random() * words.length)] ?? words[0]!;
}

export function assignImpostors(players: Player[], impostorCount: number): string[] {
  if (impostorCount < 1 || impostorCount >= players.length) {
    throw new Error("Invalid impostor count");
  }

  return players.slice(0, impostorCount).map((player) => player.id);
}

export function resolveWinner(session: GameSession, votedPlayerId: string): GameResult {
  const winners = session.impostorIds.includes(votedPlayerId) ? "players" : "impostors";

  return {
    winners,
    votedPlayerId,
  };
}