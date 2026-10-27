/**
 * PRODUCTS — the single source of truth for the Products section.
 *
 * How to edit:
 * - Add a product: copy one object and change its fields.
 * - Hide a product: set `hidden: true`.
 * - Reorder: change the `order` number (lower shows first).
 * - Replace an image: paste a new URL in `image` (e.g. your Gumroad cover URL),
 *   or put a file in /public/images/ and use "/images/your-file.jpg".
 *   Leave `image` empty ("") to show a neutral placeholder.
 * - `details` is the fuller description shown in the product pop-up.
 *   Only list what's genuinely included — copy it from your Gumroad listing.
 */
export type Product = {
  id: string;
  name: string;
  short: string;
  details: string;
  formats: string[];
  price: string;
  url: string;
  image: string;
  order: number;
  hidden?: boolean;
};

export const products: Product[] = [
  {
    id: "paycheck-spreadsheet-2027",
    name: "2027 Full-Year Paycheck Budget Spreadsheet",
    short: "Map paydays, plan bills and track monthly spending through 2027.",
    details:
      "A full-year paycheck budget workbook for planning and tracking your money throughout 2027. Use it to map paydays, plan bills, track monthly spending, and more. See the Gumroad listing for the complete list of what's included.",
    formats: ["Excel", "Google Sheets"],
    price: "$3.99",
    url: "https://niksyyshop.gumroad.com/l/wgwloz",
    image: "https://public-files.gumroad.com/gyi9khcqpcnk8knsh6a550qxdvvt",
    order: 1,
  },
  {
    id: "paycheck-printable-2027",
    name: "2027 Full-Year Paycheck Budget Planner",
    short: "Plan your money month by month with printable pages.",
    details:
      "Plan your money month by month with the 2027 Full-Year Paycheck Budget Planner. This printable planner gives you space to write in your paydays, plan bills, and more. See the Gumroad listing for the complete list of pages.",
    formats: ["Printable A4 PDF", "Canva-editable pages"],
    price: "$6.99",
    url: "https://niksyyshop.gumroad.com/l/printable-budget-planner-a4",
    image: "https://public-files.gumroad.com/u33ti179qnt7lp18tzayf25w6opw",
    order: 2,
  },
  {
    id: "first-paycheck-free",
    name: "First Paycheck Budget Planner PDF",
    short: "A free 11-page planner to start your paycheck budget.",
    details:
      "Start your paycheck budget with this free 11-page PDF planner. Open it on your phone, tablet, or computer, or print it at home.",
    formats: ["PDF"],
    price: "Free",
    url: "https://niksyyshop.gumroad.com/l/first-paycheck-planner",
    image: "https://public-files.gumroad.com/tfwfs49p2rawh0er44gl68gh9hnh",
    order: 3,
  },
  {
    id: "paycheck-bundle-2027",
    name: "2027 Paycheck Budget Bundle",
    short: "One digital workbook plus one printable planner for Jan–Dec 2027.",
    details:
      "Plan your paychecks and monthly spending with one digital workbook and one printable planner for January–December 2027. This bundle includes the full-year spreadsheet and the A4 printable planner.",
    formats: ["Excel spreadsheet", "A4 printable planner"],
    price: "$9.99",
    url: "https://niksyyshop.gumroad.com/l/fullyear-paycheck-budget-planner-2027",
    image: "https://public-files.gumroad.com/0ff13fix7dff61cu22gstr4qi0ca",
    order: 4,
  },
  {
    id: "sinking-funds-bundle",
    name: "Sinking Funds Tracker Bundle",
    short: "Track savings goals on paper or in a spreadsheet.",
    details:
      "Organize your savings goals in the format that works for you. This bundle includes a one-page A4 sinking funds tracker for printing and a digital spreadsheet version.",
    formats: ["Printable PDF", "Excel", "Google Sheets"],
    price: "$1.99",
    url: "https://niksyyshop.gumroad.com/l/sinkingfundstracker-bundle",
    image: "https://public-files.gumroad.com/3n5rlzmhm27gsjss6atemnup3sfj",
    order: 5,
  },
  {
    id: "sinking-funds-spreadsheet",
    name: "Sinking Funds Tracker Spreadsheet",
    short: "Set goals for car repairs, holidays, gifts and more.",
    details:
      "Make saving for planned expenses easier to organize with this sinking funds tracker spreadsheet. Set goals for expenses such as car repairs, holidays, gifts, and more.",
    formats: ["Excel", "Google Sheets"],
    price: "$1.50",
    url: "https://niksyyshop.gumroad.com/l/excel-google-sheet-tracker",
    image: "https://public-files.gumroad.com/q5suacv3pazpwgtafkqo0gre25b3",
    order: 6,
  },
  {
    id: "sinking-funds-printable",
    name: "Sinking Funds Tracker Printable PDF",
    short: "A simple one-page A4 tracker with editable fund sections.",
    details:
      "Save gradually for the expenses and goals that matter with this simple sinking funds tracker. The one-page A4 planner includes six editable fund sections.",
    formats: ["Printable A4 PDF", "Editable planner sheet"],
    price: "$1.00",
    url: "https://niksyyshop.gumroad.com/l/sinking-funds-tracker-planner-pdf",
    image: "https://public-files.gumroad.com/56yjcfs1mrhsxhfcs12t6nptypw6",
    order: 7,
  },
];

export const visibleProducts = () =>
  products.filter((p) => !p.hidden).sort((a, b) => a.order - b.order);
