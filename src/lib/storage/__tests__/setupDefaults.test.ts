import { describe, expect, it, vi } from "vitest";

import type { StorageAdapter } from "../localStorageAdapter";
import { loadSetupDefaults, saveSetupDefaults } from "../setupDefaults";

function createAdapter(initialValue: string | null): StorageAdapter {
  const values = new Map<string, string>();

  if (initialValue !== null) {
    values.set("impostor:setup-defaults", initialValue);
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

describe("setup defaults storage", () => {
  it("returns null when no defaults exist", () => {
    const adapter = createAdapter(null);

    expect(loadSetupDefaults(adapter)).toBeNull();
  });

  it("hydrates valid saved defaults", () => {
    const adapter = createAdapter(
      JSON.stringify({
        playerNames: ["Alice", "Bob"],
        customWordPhrases: ["New York", "Space ship"],
      })
    );

    expect(loadSetupDefaults(adapter)).toEqual({
      playerNames: ["Alice", "Bob"],
      customWordPhrases: ["New York", "Space ship"],
    });
  });

  it("returns null for corrupted JSON", () => {
    const adapter = createAdapter("{not-json");

    expect(loadSetupDefaults(adapter)).toBeNull();
  });

  it("returns null for malformed data", () => {
    const adapter = createAdapter(
      JSON.stringify({
        playerNames: [""],
        customWordPhrases: [""],
      })
    );

    expect(loadSetupDefaults(adapter)).toBeNull();
  });

  it("writes serialized defaults back to storage", () => {
    const adapter = createAdapter(null);
    const writeSpy = vi.spyOn(adapter, "write");

    saveSetupDefaults(adapter, {
      playerNames: ["Alice", "Bob"],
      customWordPhrases: ["New York", "Space ship"],
    });

    expect(writeSpy).toHaveBeenCalledWith(
      "impostor:setup-defaults",
      JSON.stringify({
        playerNames: ["Alice", "Bob"],
        customWordPhrases: ["New York", "Space ship"],
      })
    );
  });
});
