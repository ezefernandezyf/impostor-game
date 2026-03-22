import type { ReactElement } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export interface ClueRoundScreenProps {
  clueTimerSeconds: number | null;
  onContinue: () => void;
}

export function ClueRoundScreen({ clueTimerSeconds, onContinue }: ClueRoundScreenProps): ReactElement {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Clue round</p>
        <h2 className="text-3xl font-semibold text-white">Clue round</h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Each player gives one clue. Keep the conversation moving and jump to voting when the table is ready.
        </p>

        {clueTimerSeconds ? (
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-50">
            Timer: {clueTimerSeconds} seconds
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={onContinue}>
            Continue to voting
          </Button>
        </div>
      </Card>
    </main>
  );
}