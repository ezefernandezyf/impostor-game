import { describe, expect, it, vi } from "vitest";
import type { StorageAdapter } from "../localStorageAdapter";
import { loadGameState, saveGameState } from "../gameState";

function createAdapter(initialValue: string | null): StorageAdapter {
  const values = new Map<string, string>();

  if (initialValue !== null) {
    values.set("impostor:game-state", initialValue);
  }

  return {
    read(key: string): string | null {
      return values.get(key) ?? null;
    },
    write(key: string, value: string): void {
      values.set(key, value);
    },
    remove(key: string): void {
      values.delete(key);
    },
  };
}

describe("game state storage", () => {
  it("returns null when no state exists", () => {
    const adapter = createAdapter(null);

    expect(loadGameState(adapter)).toBeNull();
  });

  it("hydrates valid saved state", () => {
    const adapter = createAdapter(
      JSON.stringify({
        id: "session-1",
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
          selectedSourceId: "custom",
          clueTimerSeconds: null,
        },
        activePlayerIndex: 0,
      })
    );

    expect(loadGameState(adapter)?.phase).toBe("reveal");
  });

  it("returns null for corrupted JSON", () => {
    const adapter = createAdapter("{not-json");

    expect(loadGameState(adapter)).toBeNull();
  });

  it("returns null for malformed data", () => {
    const adapter = createAdapter(
      JSON.stringify({
        id: "session-1",
        phase: "reveal",
        players: [],
        impostorIds: [],
        secretWord: "",
        settings: {
          playerCount: 0,
          impostorCount: 0,
          selectedSourceId: "",
          clueTimerSeconds: null,
        },
        activePlayerIndex: -1,
      })
    );

    expect(loadGameState(adapter)).toBeNull();
  });

  it("writes serialized sessions back to storage", () => {
    const adapter = createAdapter(null);
    const writeSpy = vi.spyOn(adapter, "write");
    const session = {
      id: "session-1",
      phase: "setup" as const,
      players: [
        { id: "p-1", name: "Alice" },
        { id: "p-2", name: "Bob" },
      ],
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

    saveGameState(adapter, session);

    expect(writeSpy).toHaveBeenCalledWith("impostor:game-state", JSON.stringify(session));
  });
});
