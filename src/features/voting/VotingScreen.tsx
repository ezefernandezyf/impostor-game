import type { ReactElement } from "react";

export function VotingScreen(): ReactElement {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-2xl font-semibold">Voting</h2>
      <p className="mt-2 text-sm text-slate-300">Collect the vote, resolve the impostor, and move to the result screen.</p>
    </section>
  );
}