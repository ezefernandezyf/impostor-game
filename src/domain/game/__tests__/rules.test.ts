import { afterEach, describe, expect, it, vi } from "vitest";
import { assignImpostors, pickSecretWord, resolveWinner } from "../rules";
import type { GameSession, Player } from "../types";

const players: Player[] = [
  { id: "p-1", name: "Alice" },
  { id: "p-2", name: "Bob" },
  { id: "p-3", name: "Chloe" },
  { id: "p-4", name: "Diego" },
];

function createSession(impostorIds: string[]): GameSession {
  return {
    id: "session-1",
    phase: "voting",
    players,
    impostorIds,
    secretWord: "Library",
    settings: {
      playerCount: 4,
      impostorCount: impostorIds.length,
      selectedSourceId: "custom",
      clueTimerSeconds: null,
    },
    activePlayerIndex: 0,
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("game rules", () => {
  it("picks a secret word using the random index", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.49);

    expect(pickSecretWord(["Museum", "Library", "Airport"])).toBe("Library");
  });

  it("rejects an empty word list", () => {
    expect(() => pickSecretWord([])).toThrow("Cannot pick a secret word from an empty list");
  });

  it("assigns impostors from a random player order", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.7);

    expect(assignImpostors(players, 2)).toEqual(["p-3", "p-2"]);
  });

  it("rejects invalid impostor counts", () => {
    expect(() => assignImpostors(players, 0)).toThrow("Invalid impostor count");
    expect(() => assignImpostors(players, 4)).toThrow("Invalid impostor count");
  });

  it("resolves players as winners when the voted player is an impostor", () => {
    expect(resolveWinner(createSession(["p-2"]), "p-2")).toEqual({
      winners: "players",
      votedPlayerId: "p-2",
    });
  });

  it("resolves impostors as winners when the voted player is not an impostor", () => {
    expect(resolveWinner(createSession(["p-2"]), "p-3")).toEqual({
      winners: "impostors",
      votedPlayerId: "p-3",
    });
  });
});
