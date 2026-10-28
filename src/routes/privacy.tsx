import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Niksyy Shop" },
      { name: "description", content: "How Niksyy Shop handles information, including its read-only Pinterest connection." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link to="/" className="font-medium underline underline-offset-4">← Back to Niksyy Shop</Link>
      <h1 className="mt-8 text-4xl md:text-5xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-muted-foreground">Last updated: 28 October 2026</p>

      <div className="mt-8 space-y-8 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold">Who I am</h2>
          <p className="mt-2">This website is Niksyy Shop, a small personal shop showing digital planners and printable tools, run by Niksyy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">What this website collects</h2>
          <p className="mt-2">This website does not ask visitors for personal information. It has no accounts, no sign-up and no contact form, and I do not sell or share any visitor data.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Pinterest connection</h2>
          <p className="mt-2">
            To keep the Products section up to date, this website connects to my own Pinterest account using Pinterest's API. The connection is read-only: it reads the titles, images and links of the public boards and Pins on my account.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>It does not post, edit or delete anything on Pinterest.</li>
            <li>It does not access any other Pinterest user's account or personal data.</li>
            <li>It does not ask visitors to sign in to Pinterest.</li>
            <li>The access token is kept on the server and is never shown to visitors.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Links to other sites</h2>
          <p className="mt-2">
            Products link to my Gumroad store, and the site links to my Pinterest profile. When you open those sites, their own privacy policies apply, not this one. Payments are handled by Gumroad; I do not see or store your payment details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Changes</h2>
          <p className="mt-2">If this policy changes, the updated version will be posted on this page with a new date.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2">
            Questions about this policy? Message me on{" "}
            <a className="font-semibold underline underline-offset-4" href={site.pinterestUrl} target="_blank" rel="noopener noreferrer">Pinterest</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
