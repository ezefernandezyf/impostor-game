import { useEffect, useReducer, useState } from "react";
import type { ReactElement } from "react";
import { ClueRoundScreen } from "../features/clue-round/ClueRoundScreen";
import { RevealScreen } from "../features/reveal/RevealScreen";
import { ResultScreen } from "../features/result/ResultScreen";
import { SetupScreen } from "../features/setup/SetupScreen";
import { VotingScreen } from "../features/voting/VotingScreen";
import { gameReducer } from "../domain/game/reducer";
import { resolveWinner } from "../domain/game/rules";
import { createEmptyGameSession } from "../domain/game/session";
import type { GameResult, GameSession } from "../domain/game/types";
import { loadGameState, saveGameState } from "../lib/storage/gameState";
import { localStorageAdapter } from "../lib/storage/localStorageAdapter";

function getInitialSession(): GameSession {
  return loadGameState(localStorageAdapter) ?? createEmptyGameSession();
}

export function GameShell(): ReactElement {
  const [session, dispatch] = useReducer(gameReducer, undefined, getInitialSession);
  const [result, setResult] = useState<GameResult | null>(null);

  useEffect(() => {
    saveGameState(localStorageAdapter, session);
  }, [session]);

  useEffect(() => {
    if (session.phase === "setup") {
      setResult(null);
    }
  }, [session.phase]);

  function startGame(nextSession: GameSession): void {
    setResult(null);
    dispatch({ type: "start-game", session: nextSession });
  }

  function moveToNextPhase(): void {
    if (session.activePlayerIndex < session.players.length - 1) {
      dispatch({ type: "advance-player" });
      return;
    }

    dispatch({ type: "start-clue-round" });
  }

  function submitVote(targetId: string): void {
    setResult(resolveWinner(session, targetId));
    dispatch({ type: "finish-game" });
  }

  function returnToSetup(): void {
    setResult(null);
    dispatch({ type: "reset" });
  }

  if (session.phase === "setup") {
    return <SetupScreen key={session.id} onStartGame={startGame} />;
  }

  if (session.phase === "reveal") {
    const activePlayer = session.players[session.activePlayerIndex];
    const roleText = activePlayer && session.impostorIds.includes(activePlayer.id) ? "You are the impostor" : `Secret word: ${session.secretWord}`;

    return <RevealScreen playerName={activePlayer?.name ?? "the next player"} roleText={roleText} onConfirm={moveToNextPhase} />;
  }

  if (session.phase === "clue-round") {
    return <ClueRoundScreen clueTimerSeconds={session.settings.clueTimerSeconds} onContinue={() => dispatch({ type: "start-voting" })} />;
  }

  if (session.phase === "voting") {
    return <VotingScreen players={session.players} onSubmitVote={submitVote} />;
  }

  return (
    <ResultScreen
      result={result ?? { winners: "players", votedPlayerId: session.players[0]?.id ?? "" }}
      secretWord={session.secretWord}
      impostorNames={session.players.filter((player) => session.impostorIds.includes(player.id)).map((player) => player.name)}
      onBackToSetup={returnToSetup}
      onNewGame={returnToSetup}
    />
  );
}
