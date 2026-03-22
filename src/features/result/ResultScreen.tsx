import type { ReactElement } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import type { GameResult } from "../../domain/game/types";

export interface ResultScreenProps {
  result: GameResult;
  secretWord: string;
  impostorNames: string[];
  onBackToSetup: () => void;
  onNewGame: () => void;
}

export function ResultScreen({ result, secretWord, impostorNames, onBackToSetup, onNewGame }: ResultScreenProps): ReactElement {
  const winnerText = result.winners === "players" ? "Players win" : "Impostors win";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Result</p>
        <h2 className="text-3xl font-semibold text-white">Result</h2>
        <p className="text-sm leading-6 text-slate-300">The vote is final. Show the outcome, the secret word, and the impostor names.</p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Outcome</p>
            <p className="mt-2 text-lg font-semibold text-white">{winnerText}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Secret word</p>
            <p className="mt-2 text-lg font-semibold text-white">{secretWord}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Impostors</p>
            <p className="mt-2 text-lg font-semibold text-white">{impostorNames.join(", ")}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={onBackToSetup}>
            Back to setup
          </Button>
          <Button type="button" variant="secondary" onClick={onNewGame}>
            New game
          </Button>
        </div>
      </Card>
    </main>
  );
}