import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModeToggle } from "./mode-toggle";

const mockSetTheme = vi.fn();

vi.mock("./theme-provider", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("ModeToggle", () => {
  beforeEach(() => {
    mockSetTheme.mockReset();
  });

  it("renderiza corretamente com o ícone do sol visível no tema claro", () => {
    render(<ModeToggle />);

    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();

    const sunIcon = toggleButton.querySelector('[aria-hidden="true"]');
    expect(sunIcon).toHaveClass("scale-100");
    expect(sunIcon).not.toHaveClass("scale-0");
  });

  it("chama setTheme quando o botão é clicado", () => {
    render(<ModeToggle />);

    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(toggleButton);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
