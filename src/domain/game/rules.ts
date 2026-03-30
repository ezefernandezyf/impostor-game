import type { GameResult, GameSession, Player } from "./types";

function shufflePlayers(players: Player[]): Player[] {
  const shuffledPlayers = [...players];

  for (let index = shuffledPlayers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentPlayer = shuffledPlayers[index];
    shuffledPlayers[index] = shuffledPlayers[randomIndex];
    shuffledPlayers[randomIndex] = currentPlayer;
  }

  return shuffledPlayers;
}

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

  return shufflePlayers(players)
    .slice(0, impostorCount)
    .map((player): string => player.id);
}

export function getAlivePlayers(session: GameSession): Player[] {
  const eliminated = new Set(session.eliminatedPlayerIds);
  return session.players.filter((player): boolean => !eliminated.has(player.id));
}

function resolveWinnersByAliveCounts(impostorsAlive: number, nonImpostorsAlive: number): GameResult["winners"] | null {
  if (impostorsAlive === 0) {
    return "players";
  }

  if (nonImpostorsAlive === 0) {
    return "impostors";
  }

  return impostorsAlive === nonImpostorsAlive ? "impostors" : null;
}

export interface VoteResolution {
  nextSession: GameSession;
  result: GameResult | null;
}

export function applyVote(session: GameSession, votedPlayerId: string): VoteResolution {
  if (!session.players.some((player): boolean => player.id === votedPlayerId)) {
    throw new Error("Voted player does not exist");
  }

  if (session.eliminatedPlayerIds.includes(votedPlayerId)) {
    throw new Error("Voted player is already eliminated");
  }

  const nextEliminatedPlayerIds = [...session.eliminatedPlayerIds, votedPlayerId];
  const nextSessionBase: GameSession = {
    ...session,
    eliminatedPlayerIds: nextEliminatedPlayerIds,
    activePlayerIndex: 0,
  };

  const alivePlayers = getAlivePlayers(nextSessionBase);
  const aliveImpostors = alivePlayers.filter((player): boolean => nextSessionBase.impostorIds.includes(player.id)).length;
  const aliveNonImpostors = alivePlayers.length - aliveImpostors;

  const winners = resolveWinnersByAliveCounts(aliveImpostors, aliveNonImpostors);

  if (!winners) {
    return {
      nextSession: {
        ...nextSessionBase,
        phase: "clue-round",
      },
      result: null,
    };
  }

  return {
    nextSession: {
      ...nextSessionBase,
      phase: "result",
    },
    result: {
      winners,
      votedPlayerId,
    },
  };
}
