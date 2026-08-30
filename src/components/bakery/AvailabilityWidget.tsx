import { HOURS } from "~/content/siteData";

/** Core logic, exported for testing. Symmetric — ignores timezone of the caller's clock. */
export function bakeryStatus(now: Date): {
  open: boolean;
  todayLabel: string;
  headline: string;
  body: string;
} {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const isOpenDay = HOURS.openDays.includes(day);
  const openMins = HOURS.openHour * 60;
  const closeMins = HOURS.closeHour * 60;
  const open = isOpenDay && mins >= openMins && mins < closeMins;
  const todayLabel = HOURS.dayLabels[day];

  if (open) {
    return {
      open: true,
      todayLabel,
      headline: "We're open right now",
      body: `Today (${todayLabel}) until 11:00 AM. The case moves fast — pre-order ahead and your treats are waiting.`,
    };
  }
  if (isOpenDay) {
    return {
      open: false,
      todayLabel,
      headline: "Closed for today",
      body: `We're open today (${todayLabel}) 6:00–11:00 AM, but the counter is closed right now. Pre-order for the next open day so you don't miss out.`,
    };
  }
  const next = nextOpenDayLabel(day);
  return {
    open: false,
    todayLabel,
    headline: "We're closed today",
    body: `We bake and sell on Fridays and Saturdays, 6:00–11:00 AM. Next open window: ${next}. Pre-order ahead below so your favorites are ready when you arrive.`,
  };
}

function nextOpenDayLabel(day: number): string {
  // Days until the next open window (closest of Friday=5 / Saturday=6).
  const next = HOURS.openDays.reduce(
    (acc, d) => Math.min(acc, (d - day + 7) % 7),
    7
  );
  const openDay = (day + next) % 7;
  return `${HOURS.dayLabels[openDay]} at 6:00 AM`;
}

export function AvailabilityWidget({ now = new Date() }: { now?: Date }) {
  const s = bakeryStatus(now);
  return (
    <section
      aria-label="Hours and availability"
      className="border-y border-flour bg-paper/70"
    >
      <div className="mx-auto flex max-w-[76rem] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span
            className={`mt-1 inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ${
              s.open
                ? "bg-open-soft text-open ring-open/20"
                : "bg-close-soft text-close ring-close/20"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ${
                s.open ? "bg-open" : "bg-close"
              }`}
            />
            {s.open ? "Open now" : "Closed"}
          </span>
        </div>
        <div className="sm:max-w-xl sm:text-right">
          <p className="text-lg font-semibold text-ink">{s.headline}</p>
          <p className="mt-1 text-mocha">{s.body}</p>
          <p className="label mt-3">{HOURS.display}</p>
        </div>
      </div>
    </section>
  );
}
