import { describe, expect, it } from "vitest";
import { gameSettingsSchema, gameSessionSchema, playerSchema, wordListCategorySchema } from "../schemas";
import { presetCategories } from "../presets";

describe("game schemas", () => {
  it("trims player names and rejects blanks", () => {
    expect(playerSchema.parse({ id: "player-1", name: "  Alice  " })).toEqual({
      id: "player-1",
      name: "Alice",
    });

    expect(() => playerSchema.parse({ id: "player-2", name: "   " })).toThrow();
  });

  it("accepts only 2 to 20 unique players in a session", () => {
    expect(
      gameSessionSchema.parse({
        id: "session-1",
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
          selectedSourceId: "custom",
          clueTimerSeconds: null,
        },
        activePlayerIndex: 0,
      })
    ).toBeDefined();

    expect(() =>
      gameSessionSchema.parse({
        id: "session-1",
        phase: "setup",
        players: [
          { id: "p-1", name: "Alice" },
          { id: "p-2", name: " Alice " },
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
    ).toThrow();

    expect(() =>
      gameSessionSchema.parse({
        id: "session-1",
        phase: "setup",
        players: [
          { id: "p-1", name: "Alice" },
        ],
        impostorIds: ["p-1"],
        secretWord: "Library",
        settings: {
          playerCount: 1,
          impostorCount: 1,
          selectedSourceId: "custom",
          clueTimerSeconds: null,
        },
        activePlayerIndex: 0,
      })
    ).toThrow();

    expect(() =>
      gameSessionSchema.parse({
        id: "session-1",
        phase: "setup",
        players: Array.from({ length: 21 }, (_, index) => ({
          id: `p-${index + 1}`,
          name: `Player ${index + 1}`,
        })),
        impostorIds: ["p-1"],
        secretWord: "Library",
        settings: {
          playerCount: 21,
          impostorCount: 1,
          selectedSourceId: "custom",
          clueTimerSeconds: null,
        },
        activePlayerIndex: 0,
      })
    ).toThrow();

    expect(() =>
      gameSessionSchema.parse({
        id: "session-1",
        phase: "setup",
        players: Array.from({ length: 20 }, (_, index) => ({
          id: `p-${index + 1}`,
          name: `Player ${index + 1}`,
        })),
        impostorIds: ["p-1"],
        secretWord: "Library",
        settings: {
          playerCount: 20,
          impostorCount: 20,
          selectedSourceId: "custom",
          clueTimerSeconds: null,
        },
        activePlayerIndex: 0,
      })
    ).toThrow();
  });

  it("accepts multi-word custom lists and preset categories stay read-only", () => {
    expect(
      wordListCategorySchema.parse({
        id: "custom-1",
        name: "My custom list",
        words: ["New York", "Space ship"],
        preset: false,
      })
    ).toEqual({
      id: "custom-1",
      name: "My custom list",
      words: ["New York", "Space ship"],
      preset: false,
    });

    expect(Object.isFrozen(presetCategories)).toBe(true);
    expect(presetCategories.every((category) => category.preset)).toBe(true);
  });

  it("enforces impostor count bounds", () => {
    expect(
      gameSettingsSchema.parse({
        playerCount: 8,
        impostorCount: 2,
        selectedSourceId: "custom",
        clueTimerSeconds: 60,
      })
    ).toBeDefined();

    expect(() =>
      gameSettingsSchema.parse({
        playerCount: 8,
        impostorCount: 0,
        selectedSourceId: "custom",
        clueTimerSeconds: 60,
      })
    ).toThrow();

    expect(() =>
      gameSettingsSchema.parse({
        playerCount: 8,
        impostorCount: 20,
        selectedSourceId: "custom",
        clueTimerSeconds: 60,
      })
    ).toThrow();
  });
});
