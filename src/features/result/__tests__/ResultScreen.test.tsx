import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResultScreen } from "../ResultScreen";

describe("ResultScreen", () => {
  it("shows the impostors win outcome when the voted player is not an impostor", () => {
    const onBackToSetup = vi.fn();
    const onNewGame = vi.fn();

    render(
      <ResultScreen
        result={{ winners: "impostors", votedPlayerId: "p-1" }}
        secretWord="Museum"
        impostorNames={["Alex", "Jordan"]}
        onBackToSetup={onBackToSetup}
        onNewGame={onNewGame}
      />
    );

    expect(screen.getByText(/impostors win/i)).toBeInTheDocument();
    expect(screen.getByText(/museum/i)).toBeInTheDocument();
    expect(screen.getByText(/alex, jordan/i)).toBeInTheDocument();
  });
});
