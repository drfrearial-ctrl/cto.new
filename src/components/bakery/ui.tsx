import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ImageSlot as ImageSlotData } from "~/content/siteData";

/* ---------- Scroll-reveal wrapper (IntersectionObserver, CSS transition) ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Reusable section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="label mb-3">{eyebrow}</p>
      <h2>{title}</h2>
      {sub ? <p className="mt-4 text-mocha">{sub}</p> : null}
    </Reveal>
  );
}

/* ---------- Image slot: honest branded placeholder, swappable via config ---------- */
export function ImageSlot({
  slot,
  ratio = "aspect-[4/3]",
  eager = false,
}: {
  slot: ImageSlotData;
  ratio?: string;
  eager?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={slot.alt}
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 via-cream to-amber-200 ring-1 ring-flour ${ratio}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <svg
          className="h-8 w-8 text-honey/50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4c-3 1.5-5 0-5 0s0 2 1 4" />
          <path d="M12 4c3 1.5 5 0 5 0s0 2-1 4" />
          <path d="M8 8c0 2 1.5 3 4 3s4-1 4-3" />
          <path d="M8 11h8l2 9H6l2-9Z" />
        </svg>
        <span className="label">{slot.label}</span>
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-mocha/70">
          Photo coming soon
        </span>
      </div>
      {eager ? null : null}
    </div>
  );
}

/* ---------- Button style presets (shared string tokens) ---------- */
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-honey px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-honey-deep hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey active:scale-[0.98]";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:border-honey/50 hover:text-honey-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey active:scale-[0.98]";
export const btnLight =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-honey-deep shadow-sm transition hover:bg-cream active:scale-[0.98]";
