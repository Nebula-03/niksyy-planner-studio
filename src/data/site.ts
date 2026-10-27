/**
 * SITE SETTINGS — edit titles, About text, contact settings, categories,
 * and manual Pins/boards here. No component code needs to change.
 */
export const site = {
  name: "niksyy",
  pinterestUrl: "https://in.pinterest.com/niksyymyshop/",
  gumroadUrl: "https://niksyyshop.gumroad.com/",

  /** Page title + description used for search engines and link previews. */
  seoTitle: "niksyy — Creative Designer Portfolio & Pin Board",
  seoDescription: "The design portfolio of niksyy: Pinterest pins, boards and handmade digital products.",

  heroKicker: "a designer's pinboard ✿",
  heroTitle: "Little things, beautifully made.",
  heroText: "niksyy is a creative designer sharing Pins, boards and handmade digital products on Pinterest.",

  /** Your receiving email. Leave "" until you add it — the form shows a setup note. */
  contactEmail: "",

  /** About section — neutral placeholders; replace with your own words. */
  aboutTitle: "Hi, I'm niksyy",
  about: [
    "[Edit me] A creative designer and maker of digital products. Write a sentence or two about your style and what inspires you.",
    "[Edit me] Share what you love to design and the kinds of Pins and boards you curate.",
  ],
};

/**
 * PRODUCT CATEGORIES — headings for the Products section, in display order.
 * Edit the labels freely. Empty categories are hidden automatically.
 */
export const categories = [
  { id: "paycheck", label: "Paycheck Budget Planners" },
  { id: "todo", label: "To-Do Lists" },
  { id: "study", label: "Study Planners" },
  { id: "sinking", label: "Sinking Funds Trackers" },
  { id: "other", label: "More Designs" },
] as const;
export type CategoryId = (typeof categories)[number]["id"];

/**
 * MANUAL PINS — shown when the Pinterest connection isn't set up.
 * Only add real Pins and real numbers from your Pinterest analytics.
 * Leave metrics as null if you don't want to show them.
 */
export type ManualPin = {
  url: string;
  image: string;
  title: string;
  impressions: number | null;
  outboundClicks: number | null;
  saves: number | null;
};

export const manualPins: ManualPin[] = [
  // { url: "https://www.pinterest.com/pin/123/", image: "https://...", title: "My Pin", impressions: null, outboundClicks: null, saves: null },
];

/** MANUAL BOARDS — shown when Pinterest isn't connected. */
export type ManualBoard = { url: string; name: string; image: string; pinCount: number | null };
export const manualBoards: ManualBoard[] = [
  // { url: "https://in.pinterest.com/niksyymyshop/my-board/", name: "My Board", image: "https://...", pinCount: null },
];
