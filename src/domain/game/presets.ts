import type { WordListCategory } from "./types";

export const presetCategories: WordListCategory[] = [
  {
    id: "footballers",
    name: "Futbolistas",
    words: ["Messi", "Maradona", "Benzema", "Modric"],
    preset: true,
  },
  {
    id: "animals",
    name: "Animales",
    words: ["tigre", "elefante", "delfín", "panda"],
    preset: true,
  },
];