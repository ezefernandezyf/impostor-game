import type { ReactElement } from "react";

export function ClueRoundScreen(): ReactElement {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-2xl font-semibold">Clue round</h2>
      <p className="mt-2 text-sm text-slate-300">Players give one clue each. A timer can be enabled later without changing the phase model.</p>
    </section>
  );
}