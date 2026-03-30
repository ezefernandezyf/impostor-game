import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SetupScreen } from "../SetupScreen";

describe("SetupScreen", () => {
  it("rejects duplicate player names", async () => {
    const user = userEvent.setup();
    const onStartGame = vi.fn();

    render(<SetupScreen onStartGame={onStartGame} />);

    await user.clear(screen.getByLabelText("Player 1"));
    await user.type(screen.getByLabelText("Player 1"), "Alex");
    await user.clear(screen.getByLabelText("Player 2"));
    await user.type(screen.getByLabelText("Player 2"), " Alex ");
    await user.click(screen.getByRole("button", { name: "Start game" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/unique/i);
    expect(onStartGame).not.toHaveBeenCalled();
  });

  it("accepts multi-word custom word lists", async () => {
    const user = userEvent.setup();
    const onStartGame = vi.fn();
    vi.spyOn(Math, "random").mockReturnValue(0);

    render(<SetupScreen onStartGame={onStartGame} />);

    await user.selectOptions(screen.getByLabelText("Word source"), "custom");
    const customWordList = screen.getAllByLabelText("Custom word list")[0];
    await user.clear(customWordList);
    await user.type(customWordList, "New York\nSpace ship");
    await user.click(screen.getByRole("button", { name: "Start game" }));

    expect(onStartGame).toHaveBeenCalledTimes(1);
    const submittedSession = onStartGame.mock.calls[0]?.[0];

    expect(submittedSession.secretWord).toBe("New York");
    expect(submittedSession.settings.selectedSourceId).toBe("custom");
  });

  it("rejects an empty custom word list", async () => {
    const user = userEvent.setup();
    const onStartGame = vi.fn();

    render(<SetupScreen onStartGame={onStartGame} />);

    await user.selectOptions(screen.getByLabelText("Word source"), "custom");
    const customWordList = screen.getAllByLabelText("Custom word list")[0];
    await user.clear(customWordList);
    await user.click(screen.getByRole("button", { name: "Start game" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/word source cannot be empty/i);
    expect(onStartGame).not.toHaveBeenCalled();
  });

  it("keeps preset categories read only", () => {
    const onStartGame = vi.fn();

    render(<SetupScreen onStartGame={onStartGame} />);

    const presetWords = screen.getByLabelText("Preset word list");
    expect(presetWords).toHaveAttribute("readonly");
    expect(presetWords).toBeDisabled();
    expect(within(screen.getByTestId("preset-summary")).getByText(/futbolistas/i)).toBeInTheDocument();
  });

  it("blocks invalid impostor counts", async () => {
    const user = userEvent.setup();
    const onStartGame = vi.fn();

    render(<SetupScreen onStartGame={onStartGame} />);

    await user.clear(screen.getByLabelText("Impostor count"));
    await user.type(screen.getByLabelText("Impostor count"), "0");
    await user.click(screen.getByRole("button", { name: "Start game" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/impostor count/i);
    expect(onStartGame).not.toHaveBeenCalled();
  });

  it("renders player name inputs based on the selected player count", async () => {
    const user = userEvent.setup();
    const onStartGame = vi.fn();

    render(<SetupScreen onStartGame={onStartGame} />);

    await user.clear(screen.getByLabelText("Player count"));
    await user.type(screen.getByLabelText("Player count"), "5");

    expect(screen.getByLabelText("Player 5")).toBeInTheDocument();
    expect(screen.queryByLabelText("Player 6")).not.toBeInTheDocument();
  });

  it("preloads player names from persisted setup defaults", () => {
    const onStartGame = vi.fn();

    window.localStorage.setItem(
      "impostor:setup-defaults",
      JSON.stringify({
        playerNames: ["Ana", "Beto", "Caro"],
        customWordPhrases: ["New York", "Space ship"],
      })
    );

    render(<SetupScreen onStartGame={onStartGame} />);

    expect(screen.getByLabelText("Player count")).toHaveValue(3);
    expect(screen.getByLabelText("Player 1")).toHaveValue("Ana");
    expect(screen.getByLabelText("Player 2")).toHaveValue("Beto");
    expect(screen.getByLabelText("Player 3")).toHaveValue("Caro");
  });
});
