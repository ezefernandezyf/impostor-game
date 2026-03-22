import type { ReactElement } from "react";
import { Button } from "../../components/ui/Button";

export function RevealScreen(): ReactElement {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-2xl font-semibold">Reveal role</h2>
      <p className="mt-2 text-sm text-slate-300">Pass the phone to the next player, reveal the role privately, then continue.</p>
      <div className="mt-6">
        <Button type="button">Reveal</Button>
      </div>
    </section>
  );
}