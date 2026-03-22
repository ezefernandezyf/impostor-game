import { useState } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { buildGameSessionFromSetup, getPresetCategories, type SetupFormValues } from "../../domain/game/session";
import type { GameSession, WordListCategory } from "../../domain/game/types";

export interface SetupScreenProps {
  onStartGame: (session: GameSession) => void;
  categories?: ReadonlyArray<WordListCategory>;
}

function createDefaultValues(categories: ReadonlyArray<WordListCategory>): SetupFormValues {
  return {
    playerCount: 2,
    playerNames: Array.from({ length: 20 }, (_, index) => `Player ${index + 1}`),
    impostorCount: 1,
    selectedSourceId: categories[0]?.id ?? "custom",
    customWords: "New York\nSpace ship",
    clueTimerSeconds: null,
  };
}

export function SetupScreen({ onStartGame, categories = getPresetCategories() }: SetupScreenProps): ReactElement {
  const defaultValues = createDefaultValues(categories);
  const { register, handleSubmit, watch } = useForm<SetupFormValues>({ defaultValues });
  const [error, setError] = useState<string | null>(null);

  const selectedSourceId = watch("selectedSourceId");
  const customWords = watch("customWords");
  const selectedPreset = categories.find((category) => category.id === selectedSourceId) ?? categories[0] ?? null;
  const sourceWords = selectedSourceId === "custom" ? customWords : selectedPreset?.words.join("\n") ?? "";

  function handleFormSubmit(values: SetupFormValues): void {
    try {
      const session = buildGameSessionFromSetup(values);
      setError(null);
      onStartGame(session);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to start game");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Impostor Game</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Set up the match</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            Configure players, impostors, and the word source before passing the phone around the table.
          </p>
        </header>

        {error ? (
          <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100" role="alert">
            {error}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Player count</span>
                <Input
                  aria-label="Player count"
                  min={2}
                  max={20}
                  type="number"
                  {...register("playerCount", { valueAsNumber: true })}
                />
              </label>

              <label className="space-y-2 text-sm text-slate-200">
                <span>Impostor count</span>
                <Input
                  aria-label="Impostor count"
                  min={1}
                  max={19}
                  type="number"
                  {...register("impostorCount", { valueAsNumber: true })}
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-slate-200">
              <span>Word source</span>
              <Select aria-label="Word source" {...register("selectedSourceId")}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option value="custom">Custom word list</option>
              </Select>
            </label>

            {selectedSourceId === "custom" ? (
              <label className="space-y-2 text-sm text-slate-200">
                <span>Custom word list</span>
                <textarea
                  aria-label="Custom word list"
                  className="min-h-36 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="One phrase per line"
                  {...register("customWords")}
                />
              </label>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Clue timer (seconds)</span>
                <Input
                  aria-label="Clue timer (seconds)"
                  min={1}
                  type="number"
                  {...register("clueTimerSeconds", {
                    setValueAs: (value) => (value == null || value === "" ? null : Number(value)),
                  })}
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 20 }, (_, index) => (
                <label key={`player-${index + 1}`} className="space-y-2 text-sm text-slate-200">
                  <span>Player {index + 1}</span>
                  <Input
                    aria-label={`Player ${index + 1}`}
                    {...register(`playerNames.${index}` as const)}
                  />
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                type="button"
                onClick={() => {
                  void handleSubmit(handleFormSubmit)();
                }}
              >
                Start game
              </Button>
            </div>
          </section>

          <aside className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/45 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Source preview</p>
            <div data-testid="preset-summary" className="space-y-2">
              <h2 className="text-lg font-semibold text-white">{selectedPreset?.name ?? "Custom"}</h2>
              <p className="text-sm text-slate-300">
                {selectedPreset?.preset ? "Preset categories are read only in the UI." : "Custom source words can be edited here."}
              </p>
            </div>
            <label className="space-y-2 text-sm text-slate-200">
              <span>{selectedSourceId === "custom" ? "Custom word list" : "Preset word list"}</span>
              <textarea
                aria-label={selectedSourceId === "custom" ? "Custom word list" : "Preset word list"}
                className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 outline-none"
                readOnly
                disabled
                value={sourceWords}
              />
            </label>
          </aside>
        </div>
      </Card>
    </main>
  );
}