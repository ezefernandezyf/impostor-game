import type { ReactElement } from "react";
import { Button } from "../../components/ui/Button";

export function ResultScreen(): ReactElement {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-2xl font-semibold">Result</h2>
      <p className="mt-2 text-sm text-slate-300">Show the secret word, impostors, and let the user return to setup or start a new game.</p>
      <div className="mt-6 flex gap-3">
        <Button type="button">Back to setup</Button>
        <Button type="button" variant="secondary">New game</Button>
      </div>
    </section>
  );
}