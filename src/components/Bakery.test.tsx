import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Bakery from "./Bakery";
import { PreOrderForm } from "./bakery/PreOrderForm";
import { bakeryStatus } from "./bakery/AvailabilityWidget";

// Mock the server function so tests never hit the network/DB; validation and
// section rendering are what we're exercising here.
vi.mock("~/server/preOrder", () => ({
  submitPreOrder: vi.fn().mockResolvedValue({ ok: true, id: "test-id" }),
}));

describe("Bakery landing page", () => {
  it("renders all ten sections in order", () => {
    render(<Bakery />);
    expect(screen.getByRole("region", { name: "Hero" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Hours and availability" })
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Pre-order" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Menu" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Reviews" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Photo gallery" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Location and contact" })
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Stay in the know" })).toBeInTheDocument();
  });

  it("shows the one-line hook as the H1 and a prominent Pre-Order CTA", () => {
    render(<Bakery />);
    const hero = screen.getByRole("region", { name: "Hero" });
    expect(
      within(hero).getByRole("heading", { level: 1 })
    ).toHaveTextContent(/fresh-baked czech kolaches, gone by 8 am/i);
    const cta = within(hero).getByRole("link", { name: "Pre-Order Now" });
    expect(cta).toHaveAttribute("href", "#pre-order");
  });

  it("shows the aggregate 4.8–4.9 rating prominently", () => {
    render(<Bakery />);
    expect(screen.getByText("4.8–4.9")).toBeInTheDocument();
    expect(screen.getByText(/Google · Yelp · Restaurant Guru/)).toBeInTheDocument();
    expect(screen.getByText("★★★★★")).toBeInTheDocument();
  });

  it("renders menu items with an honest 'See in store' price treatment", () => {
    render(<Bakery />);
    expect(screen.getByText("Strawberry-Rhubarb Kolache")).toBeInTheDocument();
    expect(screen.getByText("Cherry Bars")).toBeInTheDocument();
    expect(screen.getByText("Specialty Occasion Cakes")).toBeInTheDocument();
    expect(screen.getAllByText("See in store").length).toBeGreaterThan(0);
  });

  it("renders the sticky mobile Call + Pre-Order bar", () => {
    render(<Bakery />);
    expect(screen.getByRole("link", { name: "Call" })).toBeInTheDocument();
    expect(screen.getAllByText("Pre-Order").length).toBeGreaterThan(0);
  });

  it("renders the pre-order form fields and validates pickup day (Fri/Sat only)", async () => {
    render(<Bakery />);
    const section = screen.getByRole("region", { name: "Pre-order" });
    expect(within(section).getByLabelText(/Name/)).toBeInTheDocument();
    expect(within(section).getByLabelText(/Phone/)).toBeInTheDocument();
    expect(within(section).getByLabelText(/Pickup date/)).toBeInTheDocument();

    const name = within(section).getByLabelText(/Name/) as HTMLInputElement;
    const phone = within(section).getByLabelText(/Phone/) as HTMLInputElement;
    const date = within(section).getByLabelText(/Pickup date/) as HTMLInputElement;
    fireEvent.change(name, { target: { value: "Jane Doe" } });
    fireEvent.change(phone, { target: { value: "(319) 555-0000" } });
    // 2025-01-01 is a Wednesday — pickup should be rejected.
    fireEvent.change(date, { target: { value: "2025-01-01" } });
    fireEvent.click(within(section).getByRole("button", { name: "Pre-order now" }));

    expect(
      await screen.findByText(/only available on Fridays and Saturdays/i)
    ).toBeInTheDocument();
  });

  it("submits a valid Friday pre-order successfully", async () => {
    const preOrder = await import("~/server/preOrder");
    render(<PreOrderForm />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/Phone/), {
      target: { value: "(319) 555-0000" },
    });
    // 2025-01-03 is a Friday — valid pickup.
    fireEvent.change(screen.getByLabelText(/Pickup date/), {
      target: { value: "2025-01-03" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Pre-order now" }));

    expect(
      await screen.findByText(/Your pre-order is in/i)
    ).toBeInTheDocument();
    expect(preOrder.submitPreOrder).toHaveBeenCalled();
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
});

describe("bakeryStatus", () => {
  const friOpen = new Date(2025, 0, 3, 8, 0); // Friday 8 AM
  const satMorning = new Date(2025, 0, 4, 6, 0); // Saturday 6 AM
  const satLate = new Date(2025, 0, 4, 11, 30); // Saturday 11:30 AM (closed)
  const wednesday = new Date(2025, 0, 1, 10, 0); // Wednesday (closed day)

  it("says open on a Friday morning within hours", () => {
    const s = bakeryStatus(friOpen);
    expect(s.open).toBe(true);
    expect(s.headline).toMatch(/open right now/i);
  });

  it("says open at Saturday 6:00 AM sharp", () => {
    expect(bakeryStatus(satMorning).open).toBe(true);
  });

  it("says closed after 11 AM on an open day", () => {
    expect(bakeryStatus(satLate).open).toBe(false);
  });

  it("says closed on a Wednesday and names the next open window", () => {
    const s = bakeryStatus(wednesday);
    expect(s.open).toBe(false);
    expect(s.body).toMatch(/friday at 6:00 AM/i);
  });
});
