import { z } from "zod";

export const playerSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
});

export const wordListCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  words: z.array(z.string().trim().min(1)).min(1),
  preset: z.boolean(),
});

export const gameSettingsSchema = z.object({
  playerCount: z.number().int().min(2).max(20),
  impostorCount: z.number().int().min(1).max(19),
  selectedSourceId: z.string().min(1),
  clueTimerSeconds: z.number().int().positive().nullable(),
});

export const gameSessionSchema = z.object({
  id: z.string().min(1),
  phase: z.enum(["setup", "reveal", "clue-round", "voting", "result"]),
  players: z.array(playerSchema).min(2),
  impostorIds: z.array(z.string().min(1)).min(1),
  secretWord: z.string().min(1),
  settings: gameSettingsSchema,
  activePlayerIndex: z.number().int().min(0),
});
