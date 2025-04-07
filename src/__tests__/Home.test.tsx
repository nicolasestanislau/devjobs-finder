import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../App";
import { vi } from "vitest";

// Mock da fetch API
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        jobs: [
          {
            id: 1,
            title: "Frontend Developer",
            company_name: "TechCorp",
            job_type: "Full-time",
            category: "Software Development",
            url: "https://example.com",
          },
        ],
      }),
  })
) as any;

describe("DevJobs Finder", () => {
  it("renderiza vagas após buscar da API", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });
  });

  it("filtra vagas com base na busca", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "React" } });

    await waitFor(() => {
      expect(screen.queryByText("Frontend Developer")).not.toBeInTheDocument();
    });
  });
});
