import type { ReactElement } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export interface RevealScreenProps {
  playerName: string;
  roleText: string;
  onConfirm: () => void;
}

export function RevealScreen({ playerName, roleText, onConfirm }: RevealScreenProps): ReactElement {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full space-y-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Reveal phase</p>
        <h2 className="text-3xl font-semibold text-white">Pass the phone to {playerName}</h2>
        <p className="mx-auto max-w-xl text-sm leading-6 text-slate-300">
          Show this screen only to the active player. Everyone else should look away until the role is confirmed.
        </p>

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-8">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">Private reveal</p>
          <p className="mt-3 text-2xl font-semibold text-white">{roleText}</p>
        </div>

        <div className="flex justify-center">
          <Button type="button" onClick={onConfirm}>
            I saw my role
          </Button>
        </div>
      </Card>
    </main>
  );
}