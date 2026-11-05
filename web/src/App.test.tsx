import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("Space rolls the dice", () => {
    render(<App />);
    fireEvent.keyDown(window, { code: "Space", key: " " });
    expect(screen.getByRole("button", { name: "Rolling…" })).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(600); });
    expect(screen.getByText("Recent rolls")).toBeInTheDocument();
  });

  it("clears the roll interval on unmount", () => {
    const idle = render(<App />);
    idle.unmount();
    const baseline = vi.getTimerCount(); // timers the SDK shell leaves behind
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Roll" }));
    unmount();
    expect(vi.getTimerCount()).toBe(baseline);
  });
});
