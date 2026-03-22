import { useState } from "react";
import type { ReactElement } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Select } from "../../components/ui/Select";
import type { Player } from "../../domain/game/types";

export interface VotingScreenProps {
  players: Player[];
  onSubmitVote: (targetId: string) => void;
}

export function VotingScreen({ players, onSubmitVote }: VotingScreenProps): ReactElement {
  const [targetId, setTargetId] = useState(players[0]?.id ?? "");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Voting</p>
        <h2 className="text-3xl font-semibold text-white">Voting</h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">Choose one player to vote out. The result decides who wins immediately.</p>

        <label className="space-y-2 text-sm text-slate-200">
          <span>Vote target</span>
          <Select aria-label="Vote target" value={targetId} onChange={(event) => setTargetId(event.target.value)}>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Select>
        </label>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => onSubmitVote(targetId)}>
            Submit vote
          </Button>
        </div>
      </Card>
    </main>
  );
}