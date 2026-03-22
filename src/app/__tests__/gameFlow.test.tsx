import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "../App";

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("game flow", () => {
  it("runs from setup to result on a shared phone", async () => {
    const user = userEvent.setup();
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.1);

    render(<App />);

    await user.clear(screen.getByLabelText("Player 1"));
    await user.type(screen.getByLabelText("Player 1"), "Alice");
    await user.clear(screen.getByLabelText("Player 2"));
    await user.type(screen.getByLabelText("Player 2"), "Bob");
    await user.click(screen.getByRole("button", { name: "Start game" }));

    expect(screen.getByText(/pass the phone to alice/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "I saw my role" }));
    expect(screen.getByText(/pass the phone to bob/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "I saw my role" }));
    expect(screen.getByRole("heading", { name: /clue round/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /continue to voting/i }));
    expect(screen.getByRole("heading", { name: /voting/i })).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/vote target/i), "player-1");
    await user.click(screen.getByRole("button", { name: /submit vote/i }));

    expect(screen.getByRole("heading", { name: /result/i })).toBeInTheDocument();
    expect(screen.getByText(/players win/i)).toBeInTheDocument();
    expect(screen.getByText(/^messi$/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /new game/i }));
    expect(screen.getByRole("heading", { name: /set up the match/i })).toBeInTheDocument();
  });

  it("shows an optional clue timer when configured", async () => {
    const user = userEvent.setup();
    vi.spyOn(Math, "random").mockReturnValue(0);

    render(<App />);

    await user.clear(screen.getByLabelText("Clue timer (seconds)"));
    await user.type(screen.getByLabelText("Clue timer (seconds)"), "45");
    await user.clear(screen.getByLabelText("Player 1"));
    await user.type(screen.getByLabelText("Player 1"), "Alice");
    await user.clear(screen.getByLabelText("Player 2"));
    await user.type(screen.getByLabelText("Player 2"), "Bob");
    await user.click(screen.getByRole("button", { name: "Start game" }));

    await user.click(screen.getByRole("button", { name: "I saw my role" }));
    await user.click(screen.getByRole("button", { name: "I saw my role" }));

    expect(screen.getByText(/timer: 45 seconds/i)).toBeInTheDocument();
  });
});
