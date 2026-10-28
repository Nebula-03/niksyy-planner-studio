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
    "I create thoughtful digital planners and printable tools with calm layouts, soft botanical details, and practical everyday structure.",
    "I also share Pinterest inspiration, planner previews, and new designs for people who enjoy making life feel a little more organized.",
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
