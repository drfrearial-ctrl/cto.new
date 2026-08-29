/* ------------------------------------------------------------------ *
 * Landing page — Hero / Social proof / Feature highlights / CTA
 * Styled to the brand tokens (see src/styles/app.css). Copy is clean
 * generic placeholder while the business is still unnamed.
 * Extracted to a plain component so the test suite can render it
 * without the TanStack router.
 * ------------------------------------------------------------------ */

const features = [
  {
    title: "Move faster",
    body: "Ship polished work in less time with workflows tuned for focus and speed — without cutting corners on quality.",
  },
  {
    title: "Built to scale",
    body: "A foundation designed to grow with you. Start lean, and add what you need as your ambitions get bigger.",
  },
  {
    title: "Trusted by teams",
    body: "Clear, dependable, and precise. The kind of tool teams rely on day in and day out to get the job done.",
  },
];

const logos = ["Northwind", "Acme Corp", "Globex", "Initech", "Umbra", "Vertex"];

export default function Landing() {
  return (
    <div className="min-h-dvh bg-offwhite">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------- Navbar ------------------------------- */
function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-offwhite/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[72rem] items-center justify-between px-6"
      >
        <a href="#" className="font-sans text-lg font-bold text-charcoal">
          Your&nbsp;Brand
        </a>
        <div className="hidden items-center gap-6 sm:flex">
          <a href="#features" className="text-sm font-medium text-charcoal">
            Features
          </a>
          <a href="#contact" className="text-sm font-medium text-charcoal">
            Contact
          </a>
        </div>
        <a
          href="#contact"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          Get started
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------- Hero -------------------------------- */
function Hero() {
  return (
    <section
      aria-label="Hero"
      className="mx-auto flex max-w-[72rem] flex-col items-center px-6 py-24 text-center sm:py-32"
    >
      <p className="label mb-6">A better way forward</p>
      <h1 className="max-w-3xl text-balance text-h1">
        Clear, focused work — without the noise
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warmgray">
        We help teams move from idea to impact with tools and guidance that are
        simple to adopt and built to last. Understand who we help and why it
        matters in under ten seconds.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="#contact"
          className="rounded-md bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary/90"
        >
          Get started
        </a>
        <a
          href="#features"
          className="rounded-md border border-charcoal/15 px-6 py-3 font-medium text-charcoal transition hover:border-charcoal/30"
        >
          See how it works
        </a>
      </div>
    </section>
  );
}

/* ---------------------------- Social proof ---------------------------- */
function SocialProof() {
  return (
    <section
      aria-label="Trusted by teams"
      className="mx-auto max-w-[72rem] border-y border-black/5 px-6 py-12"
    >
      <p className="label mb-8 text-center">
        Trusted by ambitious teams everywhere
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((name) => (
          <li
            key={name}
            className="font-sans text-lg font-bold text-warmgray/70"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------- Features ----------------------------- */
function Features() {
  return (
    <section
      id="features"
      aria-label="Feature highlights"
      className="mx-auto max-w-[72rem] px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="label mb-4">Why teams choose us</p>
        <h2 className="text-balance">Everything you need, nothing you don’t</h2>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className="rounded-xl border border-black/5 bg-white p-8 shadow-sm"
          >
            <div className="mb-5 h-10 w-10 rounded-md bg-primary-soft" aria-hidden />
            <h3>{f.title}</h3>
            <p className="mt-3 leading-relaxed text-warmgray">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- CTA -------------------------------- */
function Cta() {
  return (
    <section
      id="contact"
      aria-label="Get started"
      className="mx-auto max-w-[72rem] px-6 pb-24"
    >
      <div className="rounded-2xl bg-primary px-6 py-16 text-center sm:py-20">
        <h2 className="text-balance text-white">Ready to get started?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/90">
          Join us and see what a clear, focused approach can do for your next
          project.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block rounded-md bg-white px-6 py-3 font-medium text-primary transition hover:bg-offwhite"
        >
          Get started today
        </a>
      </div>
    </section>
  );
}

/* ------------------------------- Footer ------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-black/5 bg-offwhite">
      <div className="mx-auto flex max-w-[72rem] flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-warmgray">
          © {new Date().getFullYear()} Your Brand. All rights reserved.
        </p>
        <p className="label">Editorial clarity · Product precision</p>
      </div>
    </footer>
  );
}
