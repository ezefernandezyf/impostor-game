import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RevealScreen } from "../RevealScreen";

describe("RevealScreen", () => {
  it("hides the role until the user clicks 'Ver rol'", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<RevealScreen playerName="Alice" revealText="Museum" onConfirm={onConfirm} />);

    expect(screen.getByRole("heading", { name: "Alice" })).toBeInTheDocument();
    expect(screen.queryByText("Museum")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /ver rol/i }));
    expect(screen.getByText("Museum")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /ya vi mi rol/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("styles impostor reveal text in red", async () => {
    const user = userEvent.setup();

    render(<RevealScreen playerName="Bob" revealText="Impostor" revealTone="impostor" onConfirm={() => undefined} />);

    await user.click(screen.getByRole("button", { name: /ver rol/i }));

    expect(screen.getByText("Impostor")).toHaveClass("text-rose-200");
  });
});
