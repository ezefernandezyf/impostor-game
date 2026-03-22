import type { ReactElement } from "react";
import { Button } from "../../components/ui/Button";

export function SetupScreen(): ReactElement {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <h1 className="text-3xl font-semibold tracking-tight">Impostor Game</h1>
        <p className="mt-3 max-w-xl text-sm text-slate-300">
          Create a game, define players and impostors, then pass the phone so each player can reveal their role privately.
        </p>
        <div className="mt-6">
          <Button type="button">Start setup</Button>
        </div>
      </section>
    </main>
  );
}