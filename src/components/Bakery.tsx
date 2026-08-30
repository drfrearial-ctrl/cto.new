import { useState, type FormEvent } from "react";
import {
  BUSINESS,
  GALLERY,
  MENU,
  RATING,
  TESTIMONIALS,
} from "~/content/siteData";
import { AvailabilityWidget } from "./bakery/AvailabilityWidget";
import { PreOrderForm } from "./bakery/PreOrderForm";
import {
  ImageSlot,
  Reveal,
  SectionHeading,
  btnGhost,
  btnLight,
  btnPrimary,
} from "./bakery/ui";

export default function Bakery() {
  return (
    <div className="min-h-dvh bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <AvailabilityWidget />
        <PreOrderSection />
        <MenuSection />
        <SocialProofSection />
        <GallerySection />
        <VisitSection />
        <NotifySection />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}

/* ------------------------------- Navbar ------------------------------- */
const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit us" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-flour bg-cream/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[76rem] items-center justify-between px-6"
      >
        <a href="#top" className="font-display text-lg font-semibold text-ink">
          My Moms Bakery
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-mocha transition hover:text-honey-deep"
            >
              {l.label}
            </a>
          ))}
          <a href="#pre-order" className={btnPrimary}>
            Pre-Order
          </a>
        </div>
        <a href="#pre-order" className={`${btnPrimary} px-4 py-2 md:hidden`}>
          Pre-Order
        </a>
      </nav>
    </header>
  );
}

/* --------------------------------- Hero -------------------------------- */
function Hero() {
  return (
    <section
      aria-label="Hero"
      id="top"
      className="relative mx-auto flex max-w-[76rem] flex-col items-center px-6 pb-16 pt-20 text-center sm:pt-28"
    >
      <Reveal>
        <p className="label mb-4">Family-run Czech bakery · Ely, Iowa</p>
        <h1 className="max-w-4xl text-balance">
          Fresh-baked Czech kolaches, <span className="text-honey-deep">gone by 8 AM</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-mocha">
          Scratch-made kolaches, cherry bars, quiche, and occasion cakes — baked
          the old-fashioned way and gone fast. Friday &amp; Saturday mornings only.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#pre-order" className={btnPrimary}>
            Pre-Order Now
          </a>
          <a href="#visit" className={btnGhost}>
            Plan your visit
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------- Pre-order form ---------------------------- */
function PreOrderSection() {
  return (
    <section
      aria-label="Pre-order"
      id="pre-order"
      className="mx-auto max-w-[76rem] scroll-mt-20 px-6 py-16"
    >
      <SectionHeading
        eyebrow="Skip the line"
        title="Pre-order for pickup"
        sub="The case sells out early. Tell us what you want and we'll set it aside for Friday or Saturday pickup — no payment needed until you're at the counter."
      />
      <div className="mx-auto max-w-3xl">
        <PreOrderForm />
      </div>
    </section>
  );
}

/* -------------------------------- Menu -------------------------------- */
function MenuSection() {
  return (
    <section
      aria-label="Menu"
      id="menu"
      className="border-y border-flour bg-paper/60 py-16"
    >
      <div className="mx-auto max-w-[76rem] px-6">
        <SectionHeading
          eyebrow="Baked fresh, gone fast"
          title="From our case"
          sub="Everything is scratch-made by the family. Flavors change with the seasons — ask what's in the case this week."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-flour bg-paper shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="overflow-hidden">
                  <ImageSlot slot={item.image} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="label mb-1">{item.tag}</p>
                  <h3 className="text-xl">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-mocha">{item.description}</p>
                  <p className="mt-4 inline-flex w-fit rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mocha">
                    {item.price || "See in store"}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Social proof ---------------------------- */
function SocialProofSection() {
  return (
    <section aria-label="Reviews" id="reviews" className="mx-auto max-w-[76rem] px-6 py-16">
      <SectionHeading
        eyebrow="Loved by regulars"
        title="What folks are saying"
        sub="Themes gathered from reviews across Google, Yelp, and Restaurant Guru."
      />
      <Reveal className="mx-auto mb-12 flex max-w-xl flex-col items-center justify-center gap-2 rounded-2xl border border-flour bg-paper px-8 py-6 text-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-display text-5xl font-semibold text-honey-deep">
            {RATING.score}
          </span>
          <span className="text-2xl text-honey" aria-hidden="true">
            {"★".repeat(RATING.stars)}
          </span>
        </div>
        <p className="text-sm text-mocha">
          average rating across {RATING.sources}
        </p>
        <p className="label">{RATING.note}</p>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.id} delay={i * 80}>
            <figure className="flex h-full flex-col rounded-2xl border border-flour bg-paper p-6 shadow-sm">
              <span className="mb-3 inline-flex w-fit rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mocha">
                {t.theme}
              </span>
              <blockquote className="flex-1 text-ink">{t.body}</blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Photo gallery ----------------------------- */
function GallerySection() {
  return (
    <section
      aria-label="Photo gallery"
      id="gallery"
      className="border-y border-flour bg-paper/60 py-16"
    >
      <div className="mx-auto max-w-[76rem] px-6">
        <SectionHeading
          eyebrow="A peek inside"
          title="Around the bakery"
          sub="From the case to the counter — a look at what's baking. (Real photos coming soon.)"
        />
        <GalleryGrid />
      </div>
    </section>
  );
}

function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {GALLERY.map((g, i) => (
          <Reveal key={g.id} delay={(i % 4) * 60}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group block w-full overflow-hidden rounded-2xl border border-flour shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
              aria-label={`View ${g.label}`}
            >
              <ImageSlot slot={g} ratio="aspect-square" />
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[active].label}
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-lg transition"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageSlot slot={GALLERY[active]} ratio="aspect-[4/3]" />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-white">{GALLERY[active].label}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className={btnLight}
                aria-label="Close photo"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/* --------------------------- Location & contact --------------------------- */
function VisitSection() {
  return (
    <section
      aria-label="Location and contact"
      id="visit"
      className="mx-auto max-w-[76rem] px-6 py-16"
    >
      <SectionHeading
        eyebrow="Plan your trip"
        title="Find us in Ely"
        sub="A short drive from Cedar Rapids — well worth it for a fresh kolache. Check hours before you head over."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-flour shadow-sm">
            <iframe
              title="Map to My Moms Bakery"
              src={BUSINESS.mapsEmbed}
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex h-full flex-col justify-center gap-6 rounded-2xl border border-flour bg-paper p-8 shadow-sm">
            <div>
              <h3 className="text-lg">Hours</h3>
              <p className="mt-2 font-medium text-ink">
                Friday &amp; Saturday, 6:00 AM – 11:00 AM
              </p>
              <p className="text-sm text-mocha">
                Closed Sunday – Thursday (we're home baking!)
              </p>
            </div>
            <div>
              <h3 className="text-lg">Address</h3>
              <p className="mt-2 font-medium text-ink">{BUSINESS.address}</p>
              <a
                className="mt-1 inline-block text-sm font-medium text-honey-deep underline underline-offset-2 transition hover:text-honey"
                href="https://www.google.com/maps/search/?api=1&query=1665+Dows+St,+Ely,+IA+52227"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in maps
              </a>
            </div>
            <div>
              <h3 className="text-lg">Phone</h3>
              <a
                href={BUSINESS.phoneHref}
                className="mt-1 inline-block text-lg font-semibold text-ink transition hover:text-honey-deep"
              >
                {BUSINESS.phone}
              </a>
              <p className="text-sm text-mocha">Tap to call.</p>
            </div>
            <div>
              <a
                href={BUSINESS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhost}
              >
                {BUSINESS.facebookLabel} →
              </a>
              <p className="mt-2 text-xs text-mocha">
                Follow us for daily specials and order updates.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------- Notify signup ---------------------------- */
function NotifySection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // UI-only for now — no backend. We do NOT claim it sends anything.
    if (!email.trim()) return;
    setSent(true);
  }
  return (
    <section
      aria-label="Stay in the know"
      className="border-y border-flour bg-honey-deep py-16"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-white">Never miss a batch</h2>
        <p className="mt-3 text-white/90">
          Sign up to be notified about seasonal flavors, specials, and pre-order
          windows. (Coming soon — we're setting this up.)
        </p>
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          aria-label="Notify me signup"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="w-full rounded-full border border-white/20 bg-white/95 px-5 py-3 text-sm text-ink placeholder:text-mocha/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button type="submit" className={btnLight}>
            Notify me
          </button>
        </form>
        {sent ? (
          <p role="status" className="mt-4 text-sm font-medium text-white">
            Thanks! We'll be in touch when notify signups go live.
          </p>
        ) : null}
        <p className="mt-4 text-xs text-white/70">
          Email and SMS alerts — more details coming soon.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ Sticky bar ------------------------------ */
function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-flour bg-paper/95 p-3 backdrop-blur sm:hidden">
      <div className="flex gap-3">
        <a href={BUSINESS.phoneHref} className={`${btnPrimary} flex-1`}>
          Call
        </a>
        <a href="#pre-order" className={`${btnGhost} flex-1`}>
          Pre-Order
        </a>
      </div>
    </div>
  );
}

/* -------------------------------- Footer -------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-flour bg-cream pt-12 sm:pb-8 pb-24">
      <div className="mx-auto max-w-[76rem] px-6 text-center">
        <p className="font-display text-lg font-semibold text-ink">
          {BUSINESS.name}
        </p>
        <p className="mt-1 text-sm text-mocha">{BUSINESS.hook}.</p>
        <p className="mt-4 text-sm text-mocha">
          {BUSINESS.address} · {BUSINESS.phone}
        </p>
        <p className="mt-2 text-xs text-mocha">
          © {new Date().getFullYear()} {BUSINESS.legalName}. Open Fri &amp; Sat,
          6–11 AM.
        </p>
      </div>
    </footer>
  );
}
