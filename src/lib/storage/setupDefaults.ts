import { z } from "zod";

import type { StorageAdapter } from "./localStorageAdapter";

export interface SetupDefaults {
  playerNames: string[];
  customWordPhrases: string[];
}

const SETUP_DEFAULTS_KEY = "impostor:setup-defaults";

const setupDefaultsSchema = z.object({
  playerNames: z.array(z.string().trim().min(1)).default([]),
  customWordPhrases: z.array(z.string().trim().min(1)).default([]),
});

export function loadSetupDefaults(adapter: StorageAdapter): SetupDefaults | null {
  const raw = adapter.read(SETUP_DEFAULTS_KEY);
  if (!raw) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return null;
  }

  const result = setupDefaultsSchema.safeParse(parsed);

  return result.success ? result.data : null;
}

export function saveSetupDefaults(adapter: StorageAdapter, defaults: SetupDefaults): void {
  adapter.write(SETUP_DEFAULTS_KEY, JSON.stringify(defaults));
}
