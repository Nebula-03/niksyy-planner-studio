# NiksYY Planner Studio

Build a polished, responsive portfolio website for my digital-planner business, NiksYY Shop.

BUSINESS DETAILS

- Brand name: NiksYY Shop

- Pinterest business profile: https://in.pinterest.com/niksyymyshop/

- Public Gumroad store: https://niksyyshop.gumroad.com/

- Do not use https://gumroad.com/products as a customer-facing link; that is my private creator dashboard.

- Audience: people interested in budgeting, savings, study planning, and printable/digital planners.

- Do not invent my biography, credentials, testimonials, sales, or contact details. Make the About text and contact email easy for me to edit.

DESIGN

Create an artistic, animated, retro Pinterest-inspired pinboard portfolio. Use a warm paper-and-scrapbook feeling with layered cards, pin/tape details, soft shadows, and a coordinated palette of cream, sage, muted coral, lilac, and midnight navy. Let product preview images float gently around the page with subtle motion. Keep the page elegant and readable rather than cluttered, and do not copy Pinterest’s logo or interface.

Make the design responsive and readable on phones, tablets, and laptops. Use lightweight animation, support reduced-motion settings, and keep text contrast accessible.

NAVIGATION

Add a fixed or sticky navigation bar with:

- About

- Products

- Pinterest

- Contact

Use “Products” as the product-section label, not “Inventory.”

PAGES / SECTIONS

1. HERO

- Introduce NiksYY Shop as a small digital-planner shop.

- Add buttons for “Browse products” and “Visit Pinterest.”

- Show a few product preview images in an animated collage.

2. ABOUT

- Use editable placeholder copy that I can personalize.

- Do not make up personal facts.

3. PRODUCTS

- Display my products as attractive cards with the real product cover images, product name, short description, format, price, and a clear “View on Gumroad” button.

- Clicking a card or image should open an accessible product-detail modal or page with a larger image, fuller description, included files/formats, price, and Gumroad link.

- Make product entries easy for me to add, edit, hide, or reorder from one simple data source.

- Never invent product contents or show fake previews. If an image is missing, show a neutral placeholder and let me replace it.

Start with these known public listings; make names, prices, descriptions, and images editable because I may update them:

- 2027 Full-Year Paycheck Budget Spreadsheet | Excel & Google Sheets

  https://niksyyshop.gumroad.com/l/wgwloz

- 2027 Full-Year Paycheck Budget Planner | Printable A4 + Canva-Editable Pages

  https://niksyyshop.gumroad.com/l/printable-budget-planner-a4

- First Paycheck Budget Planner PDF (free)

  https://niksyyshop.gumroad.com/l/first-paycheck-planner

- 2027 Paycheck Budget Bundle | Excel Spreadsheet + A4 Printable Planner

  https://niksyyshop.gumroad.com/l/fullyear-paycheck-budget-planner-2027

- Sinking Funds Tracker Bundle

  https://niksyyshop.gumroad.com/l/sinkingfundstracker-bundle

- Sinking Funds Tracker Spreadsheet | Excel + Google Sheets

  https://niksyyshop.gumroad.com/l/excel-google-sheet-tracker

- Sinking Funds Tracker Printable PDF & Editable Planner Sheet

  https://niksyyshop.gumroad.com/l/sinking-funds-tracker-planner-pdf

4. PINTEREST FEATURE

- Show a “Featured on Pinterest” section with the top-performing Pins from my connected account, ranked by impressions/reach and with outbound clicks and saves available as secondary metrics.

- Connect to the Pinterest API through official OAuth authorization. Request only read access needed for my account’s Pins and analytics.

- Keep API credentials and tokens on a secure server-side backend; never expose secrets in browser code.

- Refresh analytics on a schedule and provide a manual “Refresh Pins” button. Do not claim instant sync after posting unless the API supports it.

- Let me choose how many top Pins to show and which date range to use.

- Each Pin card should show its image, title, metrics, and link to the Pinterest Pin.

- If API access or authorization is not configured, show a graceful setup message and provide a manual way for me to add Pin URLs, images, titles, and metrics. Do not scrape Pinterest or ask for my password/cookies.

- Link to my Pinterest profile: https://in.pinterest.com/niksyymyshop/

5. CONTACT

- Show my Pinterest Pincode and link to my Pinterest profile; do not include a contact form or email messaging.

TECHNICAL / QUALITY

- Build the working website, not just a static mockup.

- Make layouts and product cards work on mobile, tablet, and desktop.

- Use accessible modal controls, keyboard navigation, meaningful image alt text, and visible focus states.

- Add page title, meta description, social-sharing image support, and basic SEO headings.

- Include empty, loading, error, and disconnected states for Pinterest data.

- Do not display sample analytics as if they were real.

- Keep product information in an easy-to-edit data structure and include a short note showing me where to replace product images and details.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d9df5948-1a65-5b8c-b98b-d62aa353a456).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
