import { site } from "@/data/site";

export function PinterestSection() {
  return (
    <section id="pinterest" aria-labelledby="pin-h" className="mx-auto max-w-6xl px-5 py-24">
      <p className="font-hand text-2xl text-accent-foreground/80">pinned with love</p>
      <h2 id="pin-h" className="text-4xl md:text-5xl font-semibold">Featured on Pinterest</h2>
      <a href={site.pinterestUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
        Visit my Pinterest profile ↗
      </a>
    </section>
  );
}
