/* =========================================================================
   Site content + configuration — single source of truth for the bakery page.

   IMAGE SLOTS (honest placeholders): we can't access the bakery's own photos,
   so every image slot below points at `src: null` and renders a tasteful,
   clearly-labelled placeholder ("Photo coming soon") that can be swapped for a
   real photo later by filling in `src` with a URL or import — no other code
   needs to change.
   ========================================================================= */

export const BUSINESS = {
  name: "My Moms Bakery",
  legalName: "My Moms Bakery LLC",
  hook: "Fresh-baked Czech kolaches, gone by 8 AM",
  address: "1665 Dows St, Ely, IA 52227",
  phone: "(319) 551-0331",
  phoneHref: "tel:+13195510331",
  facebookLabel: "Find us on Facebook",
  facebookUrl: "https://www.facebook.com/",
  mapsQuery: "1665+Dows+St,+Ely,+IA+52227",
  mapsEmbed:
    "https://www.google.com/maps?q=1665+Dows+St,+Ely,+IA+52227&output=embed",
} as const;

/** Weekly schedule. Open Friday (5) & Saturday (6), 6:00–11:00 AM local. */
export const HOURS = {
  openDays: [5, 6] as number[], // Date.getDay(): 5=Friday, 6=Saturday
  openHour: 6, // 6:00 AM
  closeHour: 11, // 11:00 AM
  display:
    "Friday & Saturday · 6:00 AM – 11:00 AM · Closed Sunday – Thursday",
  dayLabels: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as string[],
} as const;

export const RATING = {
  score: "4.8–4.9",
  stars: 5,
  sources: "Google · Yelp · Restaurant Guru",
  note: "from hundreds of reviews",
} as const;

export interface ImageSlot {
  id: string;
  label: string; // what this image is (used in placeholder + future alt)
  alt: string;
  src: string | null; // fill this in with a real photo later
}

/* ------------------------------- Menu ------------------------------- */
export interface MenuItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  /** Prices not provided — honest "see in store" treatment. */
  price: string;
  image: ImageSlot;
}

export const MENU: MenuItem[] = [
  {
    id: "kolache-strawberry-rhubarb",
    name: "Strawberry-Rhubarb Kolache",
    tag: "Signature kolache",
    description:
      "Our most-loved flavor — tart rhubarb folded into sweet strawberry in a soft, scratch-made Czech dough.",
    price: "", // unknown → "See in store"
    image: {
      id: "img-kolache-sr",
      label: "Strawberry-rhubarb kolache",
      alt: "Strawberry-rhubarb kolache (photo coming soon)",
      src: null,
    },
  },
  {
    id: "kolache-peach",
    name: "Peach Kolache",
    tag: "Seasonal favorite",
    description:
      "Juicy peach filling tucked into pillowy kolache dough. A summertime favorite that goes fast.",
    price: "",
    image: {
      id: "img-kolache-peach",
      label: "Peach kolache",
      alt: "Peach kolache (photo coming soon)",
      src: null,
    },
  },
  {
    id: "kolache-cherry",
    name: "Cherry Kolache",
    tag: "Family staple",
    description:
      "Bright, homemade cherry over soft dough — a Czech classic the family has made for years.",
    price: "",
    image: {
      id: "img-kolache-cherry",
      label: "Cherry kolache",
      alt: "Cherry kolache (photo coming soon)",
      src: null,
    },
  },
  {
    id: "kolache-seasonal",
    name: "Seasonal Kolache",
    tag: "Changes with the seasons",
    description:
      "We bake with whatever's ripe — ask what's in the case this week or pre-order a favorite.",
    price: "",
    image: {
      id: "img-kolache-seasonal",
      label: "Seasonal kolache",
      alt: "Seasonal kolache flavor (photo coming soon)",
      src: null,
    },
  },
  {
    id: "cherry-bars",
    name: "Cherry Bars",
    tag: "House favorite",
    description:
      "Buttery shortbread with a generous cherry layer — a sweet treat that disappears before closing time.",
    price: "",
    image: {
      id: "img-cherry-bars",
      label: "Cherry bars",
      alt: "Cherry bars (photo coming soon)",
      src: null,
    },
  },
  {
    id: "quiche",
    name: "Quiche",
    tag: "Savory scratch-made",
    description:
      "Flaky crust, farm-fresh eggs, and whatever's good in the kitchen — the savory side of the case.",
    price: "",
    image: {
      id: "img-quiche",
      label: "Quiche",
      alt: "Fresh quiche (photo coming soon)",
      src: null,
    },
  },
  {
    id: "occasion-cakes",
    name: "Specialty Occasion Cakes",
    tag: "Made to order",
    description:
      "Birthdays, showers, and celebrations — custom cakes baked to match the moment. Order ahead below.",
    price: "Ask at the counter",
    image: {
      id: "img-cake",
      label: "Occasion cake",
      alt: "Custom occasion cake (photo coming soon)",
      src: null,
    },
  },
];

/* --------------------------- Photo gallery --------------------------- */
export const GALLERY: ImageSlot[] = [
  {
    id: "gal-1",
    label: "The bakery case",
    alt: "Full bakery display case (photo coming soon)",
    src: null,
  },
  {
    id: "gal-2",
    label: "Fresh kolaches on the tray",
    alt: "Fresh kolaches on a baking tray (photo coming soon)",
    src: null,
  },
  {
    id: "gal-3",
    label: "Cherry bars cooling",
    alt: "Cherry bars cooling on the counter (photo coming soon)",
    src: null,
  },
  {
    id: "gal-4",
    label: "The family behind the counter",
    alt: "The family working behind the counter (photo coming soon)",
    src: null,
  },
];

/* ----------------------- Thematic social proof ----------------------- */
/** Paraphrased review THEMES (not verbatim quotes from named customers). */
export const TESTIMONIALS: { id: string; body: string; theme: string }[] = [
  {
    id: "t1",
    theme: "Worth the drive",
    body: "Out-of-town visitors say the short drive out to Ely is more than worth it once they taste the strawberry-rhubarb kolaches.",
  },
  {
    id: "t2",
    theme: "Up early for kolaches",
    body: "Local regulars tell us the kolaches are the reason they're out of bed before 8 — and the family behind the counter makes the trip a joy.",
  },
  {
    id: "t3",
    theme: "Like a family kitchen",
    body: "Customers describe the warm, homey feel — like walking into a family kitchen, with pastries to match.",
  },
];

/* ----------------------------- Pre-order ---------------------------- */
export const MENU_CHOICES = [
  { value: "kolache", label: "Kolaches" },
  { value: "cherry-bars", label: "Cherry bars" },
  { value: "quiche", label: "Quiche" },
  { value: "cake", label: "Occasion / custom cake" },
  { value: "mixed", label: "Mixed / something else" },
] as const;
