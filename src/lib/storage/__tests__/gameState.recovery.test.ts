import { describe, expect, it } from "vitest";
import type { StorageAdapter } from "../localStorageAdapter";
import { loadGameState } from "../gameState";

function createAdapter(initialValue: string | null): StorageAdapter {
  return {
    read(): string | null {
      return initialValue;
    },
    write(): void {
      // no-op for recovery tests
    },
    remove(): void {
      // no-op for recovery tests
    },
  };
}

describe("game state recovery", () => {
  it("restores a saved setup session", () => {
    const adapter = createAdapter(
      JSON.stringify({
        id: "session-setup",
        phase: "setup",
        players: [
          { id: "p-1", name: "Alice" },
          { id: "p-2", name: "Bob" },
        ],
        impostorIds: ["p-2"],
        secretWord: "Library",
        settings: {
          playerCount: 2,
          impostorCount: 1,
          selectedSourceId: "footballers",
          clueTimerSeconds: null,
        },
        activePlayerIndex: 0,
      })
    );

    expect(loadGameState(adapter)?.phase).toBe("setup");
  });

  it("restores a saved reveal session", () => {
    const adapter = createAdapter(
      JSON.stringify({
        id: "session-reveal",
        phase: "reveal",
        players: [
          { id: "p-1", name: "Alice" },
          { id: "p-2", name: "Bob" },
        ],
        impostorIds: ["p-2"],
        secretWord: "Library",
        settings: {
          playerCount: 2,
          impostorCount: 1,
          selectedSourceId: "footballers",
          clueTimerSeconds: 45,
        },
        activePlayerIndex: 1,
      })
    );

    const restoredSession = loadGameState(adapter);

    expect(restoredSession?.phase).toBe("reveal");
    expect(restoredSession?.activePlayerIndex).toBe(1);
  });
});
