/**
 * SITE SETTINGS — edit your About text, contact email and manual Pins here.
 */
export const site = {
  name: "Niksyy Shop",
  pinterestUrl: "https://in.pinterest.com/niksyymyshop/",
  gumroadUrl: "https://niksyyshop.gumroad.com/",

  /** Your receiving email. Leave "" until you add it — the form shows a setup note. */
  contactEmail: "",

  /** About section — replace these paragraphs with your own words. */
  aboutTitle: "Hi, welcome to the shop",
  about: [
    "[Edit me] Write a few sentences about who you are and why you started Niksyy Shop.",
    "[Edit me] Share what you love about planning — budgeting, saving, studying — and who your planners are made for.",
  ],
};

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
  // Example (remove the // to use):
  // { url: "https://www.pinterest.com/pin/123/", image: "https://...", title: "My Pin", impressions: null, outboundClicks: null, saves: null },
];
