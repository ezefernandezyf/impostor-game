import { describe, expect, it } from "vitest";
import { gameReducer } from "../reducer";
import type { GameSession } from "../types";

function createSession(): GameSession {
  return {
    id: "session-1",
    phase: "setup",
    players: [
      { id: "p-1", name: "Alice" },
      { id: "p-2", name: "Bob" },
      { id: "p-3", name: "Chloe" },
    ],
    impostorIds: ["p-2"],
    eliminatedPlayerIds: [],
    secretWord: "Library",
    settings: {
      playerCount: 3,
      impostorCount: 1,
      selectedSourceId: "custom",
      clueTimerSeconds: null,
    },
    activePlayerIndex: 2,
  };
}

describe("game reducer", () => {
  it("walks through the game phases in order", () => {
    const revealState = gameReducer(createSession(), { type: "start-reveal" });
    const clueRoundState = gameReducer(revealState, { type: "start-clue-round" });
    const votingState = gameReducer(clueRoundState, { type: "start-voting" });
    const resultState = gameReducer(votingState, { type: "finish-game" });

    expect(revealState.phase).toBe("reveal");
    expect(clueRoundState.phase).toBe("clue-round");
    expect(votingState.phase).toBe("voting");
    expect(resultState.phase).toBe("result");
  });

  it("resets the reveal index when the reveal phase starts", () => {
    const state = gameReducer(createSession(), { type: "start-reveal" });

    expect(state.activePlayerIndex).toBe(0);
  });

  it("increments the active player index during reveal", () => {
    const revealState = gameReducer(createSession(), { type: "start-reveal" });
    const nextPlayerState = gameReducer(revealState, { type: "advance-player" });

    expect(nextPlayerState.activePlayerIndex).toBe(1);
  });

  it("returns to setup when the game is reset", () => {
    const resetState = gameReducer(
      {
        ...createSession(),
        phase: "result",
        activePlayerIndex: 1,
      },
      { type: "reset" }
    );

    expect(resetState.phase).toBe("setup");
    expect(resetState.activePlayerIndex).toBe(0);
  });

  it("returns the current state for unknown actions", () => {
    const currentState = createSession();
    const nextState = gameReducer(currentState, { type: "noop" } as never);

    expect(nextState).toBe(currentState);
  });
});
