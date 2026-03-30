import { afterEach, describe, expect, it, vi } from "vitest";
import { applyVote, assignImpostors, pickSecretWord } from "../rules";
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
    eliminatedPlayerIds: [],
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

  it("declares players as winners when the last impostor is eliminated", () => {
    const { nextSession, result } = applyVote(createSession(["p-2"]), "p-2");

    expect(nextSession.phase).toBe("result");
    expect(result).toEqual({ winners: "players", votedPlayerId: "p-2" });
  });

  it("declares impostors as winners when alive impostors equal alive non-impostors", () => {
    const session: GameSession = {
      ...createSession(["p-2"]),
      eliminatedPlayerIds: ["p-1"],
    };

    const { nextSession, result } = applyVote(session, "p-3");

    expect(nextSession.phase).toBe("result");
    expect(result).toEqual({ winners: "impostors", votedPlayerId: "p-3" });
  });

  it("continues the game when no one meets a win condition yet", () => {
    const { nextSession, result } = applyVote(createSession(["p-2", "p-4"]), "p-1");

    expect(nextSession.phase).toBe("clue-round");
    expect(result).toBeNull();
  });

  it("declares impostors as winners when no non-impostors remain alive", () => {
    const twoPlayers: Player[] = [
      { id: "p-1", name: "Alice" },
      { id: "p-2", name: "Bob" },
    ];

    const session: GameSession = {
      id: "session-2",
      phase: "voting",
      players: twoPlayers,
      impostorIds: ["p-2"],
      eliminatedPlayerIds: [],
      secretWord: "Library",
      settings: {
        playerCount: 2,
        impostorCount: 1,
        selectedSourceId: "custom",
        clueTimerSeconds: null,
      },
      activePlayerIndex: 0,
    };

    const { nextSession, result } = applyVote(session, "p-1");

    expect(nextSession.phase).toBe("result");
    expect(result).toEqual({ winners: "impostors", votedPlayerId: "p-1" });
  });
});
