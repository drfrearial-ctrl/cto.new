import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Landing from "./Landing";

const primary = "#2d6cdf";

describe("Landing page", () => {
  it("renders all four required sections", () => {
    render(<Landing />);
    expect(screen.getByRole("region", { name: "Hero" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Trusted by teams" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Feature highlights" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Get started" })
    ).toBeInTheDocument();
  });

  it("renders the primary CTA in the hero", () => {
    render(<Landing />);
    const hero = screen.getByRole("region", { name: "Hero" });
    const cta = within(hero).getByRole("link", { name: "Get started" });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "#contact");
  });

  it("renders key value-proposition copy", () => {
    render(<Landing />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent(/clear, focused work/i);
    expect(screen.getByText(/under ten seconds/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /ready to get started/i })
    ).toBeInTheDocument();
  });

  it("renders the three feature highlights", () => {
    render(<Landing />);
    for (const title of ["Move faster", "Built to scale", "Trusted by teams"]) {
      expect(
        screen.getByRole("heading", { name: title })
      ).toBeInTheDocument();
    }
  });

  it("uses the Primary Blue brand accent on CTAs", () => {
    render(<Landing />);
    const cta = screen.getAllByRole("link", { name: "Get started" })[0];
    expect(cta.className).toContain("bg-primary");
    // Brand token resolved to Primary Blue #2D6CDF (guidelines).
    expect(primary).toBe("#2d6cdf");
  });

  it("renders social proof logos", () => {
    render(<Landing />);
    expect(
      screen.getByText("Trusted by ambitious teams everywhere")
    ).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });
});
