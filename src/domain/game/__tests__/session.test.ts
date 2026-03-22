import { describe, expect, it, vi } from "vitest";
import { buildGameSessionFromSetup, createEmptyGameSession, getPresetCategories } from "../session";

describe("game session helpers", () => {
  it("creates an empty game session for the setup screen", () => {
    const session = createEmptyGameSession();

    expect(session.phase).toBe("setup");
    expect(session.players).toHaveLength(2);
    expect(session.settings.playerCount).toBe(2);
  });

  it("returns the preset categories list", () => {
    expect(getPresetCategories()).toHaveLength(2);
  });

  it("builds a playable session from custom words", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const session = buildGameSessionFromSetup({
      playerCount: 2,
      playerNames: ["Alice", "Bob"],
      impostorCount: 1,
      selectedSourceId: "custom",
      customWords: "New York\nSpace ship",
      clueTimerSeconds: null,
    });

    expect(session.secretWord).toBe("New York");
    expect(session.impostorIds).toHaveLength(1);
  });

  it("builds a playable session from a preset category", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const session = buildGameSessionFromSetup({
      playerCount: 2,
      playerNames: ["Alice", "Bob"],
      impostorCount: 1,
      selectedSourceId: "footballers",
      customWords: "",
      clueTimerSeconds: 30,
    });

    expect(session.secretWord).toBe("Messi");
    expect(session.settings.selectedSourceId).toBe("footballers");
  });

  it("rejects invalid player and impostor counts", () => {
    expect(() =>
      buildGameSessionFromSetup({
        playerCount: 1,
        playerNames: ["Alice"],
        impostorCount: 1,
        selectedSourceId: "footballers",
        customWords: "",
        clueTimerSeconds: null,
      })
    ).toThrow(/player count/i);

    expect(() =>
      buildGameSessionFromSetup({
        playerCount: 2,
        playerNames: ["Alice", "Bob"],
        impostorCount: 2,
        selectedSourceId: "footballers",
        customWords: "",
        clueTimerSeconds: null,
      })
    ).toThrow(/impostor count/i);
  });
});
