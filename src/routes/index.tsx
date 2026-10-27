import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { visibleProducts, type Product } from "@/data/products";
import { site, categories, manualPins } from "@/data/site";
import { ProductImage } from "@/components/site/ProductImage";
import { PinterestSection } from "@/components/site/PinterestSection";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Sprig, Flower, Divider } from "@/components/site/Botanical";
import { getTopPins } from "@/lib/pinterest.functions";
import portrait from "@/assets/niksyy-portrait.jpg.asset.json";

const OG_IMAGE = "https://public-files.gumroad.com/0ff13fix7dff61cu22gstr4qi0ca";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.seoTitle },
      { name: "description", content: site.seoDescription },
      { property: "og:title", content: site.seoTitle },
      { property: "og:description", content: site.seoDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Index,
});

const NAV = [
  ["About", "#about"],
  ["Products", "#products"],
  ["Pinterest", "#pinterest"],
  ["Contact", "#contact"],
] as const;

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2 text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          <img src={portrait.url} alt="" className="size-9 rounded-full object-cover ring-2 ring-sage" />
          niks<span className="text-accent">yy</span>
        </a>
        <ul className="hidden gap-7 md:flex">
          {NAV.map(([l, h]) => (
            <li key={h}><a href={h} className="font-medium underline-offset-8 hover:underline decoration-accent decoration-2">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="md:hidden p-2" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="md:hidden border-t px-5 py-3 space-y-2">
          {NAV.map(([l, h]) => (
            <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-2 font-medium">{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}

function Hero() {
  const pins = useQuery({
    queryKey: ["pins", 6, 90],
    queryFn: () => getTopPins({ data: { limit: 6, days: 90 } }),
    staleTime: 1000 * 60 * 30,
  });
  const fromPins =
    pins.data?.status === "ok"
      ? pins.data.pins.map((p) => ({ image: p.image, title: p.title, url: p.url }))
      : manualPins.map((p) => ({ image: p.image, title: p.title, url: p.url }));
  const tiles = (fromPins.length ? fromPins : visibleProducts().map((p) => ({ image: p.image, title: p.name, url: p.url }))).slice(0, 5);
  const spots = [
    { c: "left-[0%] top-[6%]", r: "-6deg", a: "animate-float-a" },
    { c: "left-[35%] top-[0%]", r: "3deg", a: "animate-float-b" },
    { c: "right-[0%] top-[10%]", r: "5deg", a: "animate-float-a" },
    { c: "left-[12%] bottom-[0%]", r: "4deg", a: "animate-float-b" },
    { c: "right-[12%] bottom-[2%]", r: "-4deg", a: "animate-float-a" },
  ];
  return (
    <section id="top" className="relative mx-auto grid max-w-6xl items-center gap-10 overflow-hidden px-5 pt-14 pb-20 md:grid-cols-[1fr_1.15fr] md:pt-20">
      <Sprig className="pointer-events-none absolute -left-4 bottom-0 h-56 text-sage opacity-60 animate-float-b" />
      <div className="relative animate-rise">
        <img src={portrait.url} alt="Portrait of niksyy" className="size-24 rounded-full object-cover ring-4 ring-paper shadow-lift" />
        <p className="mt-5 font-hand text-3xl text-muted-foreground">{site.heroKicker}</p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold leading-[1.05]">{site.heroTitle}</h1>
        <p className="mt-5 max-w-md text-lg text-muted-foreground">{site.heroText}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="hero" size="lg" asChild><a href="#pinterest">See my Pins</a></Button>
          <Button variant="paper" size="lg" asChild><a href="#products">Products</a></Button>
        </div>
      </div>
      <div className="relative h-[460px] md:h-[540px]">
        <div className="absolute inset-[14%] rounded-full bg-lilac/40 blur-3xl" aria-hidden />
        <Flower className="pointer-events-none absolute left-[44%] bottom-[34%] h-28 text-coral opacity-70 animate-float-a" />
        {tiles.map((t, i) => (
          <a
            key={i}
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${t.title}`}
            className={`absolute w-32 sm:w-40 md:w-44 ${spots[i].c} ${spots[i].a} paper-card p-2 transition-shadow hover:shadow-lift`}
            style={{ ["--r" as string]: spots[i].r, animationDelay: `${i * -1.7}s` }}
          >
            <span className="pin left-1/2 -top-1.5 -translate-x-1/2" aria-hidden />
            <ProductImage src={t.image} alt={t.title} className="aspect-[3/4] w-full rounded-sm" />
          </a>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="mx-auto max-w-3xl px-5 py-20">
      <div className="relative paper-card p-8 md:p-12 rotate-[-0.6deg]">
        <span className="tape -top-3 left-8 rotate-[-8deg]" aria-hidden />
        <span className="tape -top-3 right-8 rotate-[6deg]" aria-hidden />
        <Flower className="pointer-events-none absolute -right-5 -bottom-8 h-28 text-coral opacity-70" />
        <Sprig className="pointer-events-none absolute -left-8 -top-10 h-24 rotate-[-20deg] text-sage opacity-70" />
        <div className="flex items-center gap-4">
          <img src={portrait.url} alt="niksyy" className="size-16 rounded-full object-cover ring-2 ring-sage" />
          <div>
            <h2 id="about-h" className="text-4xl font-semibold">About</h2>
            <p className="font-hand text-2xl text-muted-foreground">{site.aboutTitle}</p>
          </div>
        </div>
        <div className="mt-5 space-y-4 text-lg leading-relaxed">
          {site.about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}

function Products({ onOpen }: { onOpen: (p: Product) => void }) {
  const all = visibleProducts();
  const tints = ["bg-sage/40", "bg-lilac/40", "bg-coral/30"];
  const groups = categories
    .map((c) => ({ ...c, items: all.filter((p) => p.category === c.id) }))
    .filter((g) => g.items.length);
  return (
    <section id="products" aria-labelledby="prod-h" className="relative overflow-hidden bg-muted/60 py-24">
      <Sprig className="pointer-events-none absolute -right-4 top-10 h-64 text-sage opacity-50 animate-float-a" />
      <div className="relative mx-auto max-w-6xl px-5">
        <p className="font-hand text-2xl text-muted-foreground">designed by hand</p>
        <h2 id="prod-h" className="text-4xl md:text-5xl font-semibold">Products</h2>
        {all.length === 0 && <p className="mt-6 text-muted-foreground">No products added yet.</p>}
        {groups.map((g) => (
          <div key={g.id} className="mt-14">
            <h3 className="flex items-center gap-3 text-2xl font-semibold">
              <Flower className="h-9 text-coral" />
              {g.label}
            </h3>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p, i) => (
                <li key={p.id} className="relative paper-card flex flex-col p-4 transition-transform hover:-translate-y-1 hover:shadow-lift" style={{ rotate: `${(i % 3 - 1) * 0.7}deg` }}>
                  <span className="pin left-1/2 -top-1.5 -translate-x-1/2" aria-hidden />
                  <button onClick={() => onOpen(p)} className={`block overflow-hidden rounded-sm ${tints[i % 3]}`} aria-label={`View details: ${p.name}`}>
                    <ProductImage src={p.image} alt={`${p.name} cover`} className="aspect-[4/3] w-full" />
                  </button>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h4 className="text-xl font-semibold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                      <button onClick={() => onOpen(p)} className="text-left hover:underline">{p.name}</button>
                    </h4>
                    <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">{p.price}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">{p.short}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide">{p.formats.join(" · ")}</p>
                  <div className="mt-auto pt-5">
                    <Button variant="coral" className="w-full" asChild>
                      <a href={p.url} target="_blank" rel="noopener noreferrer">View on Gumroad <ExternalLink aria-hidden /></a>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="mt-12 text-center">
          <a href={site.gumroadUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">See the full Gumroad store ↗</a>
        </p>
      </div>
    </section>
  );
}

function ProductModal({ p, onClose }: { p: Product | null; onClose: () => void }) {
  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-paper">
        {p && (
          <div className="grid gap-6 md:grid-cols-2">
            <ProductImage src={p.image} alt={`${p.name} cover`} className="w-full rounded-md" />
            <div>
              <DialogTitle className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>{p.name}</DialogTitle>
              <p className="mt-2 text-2xl font-bold text-primary">{p.price}</p>
              <DialogDescription className="mt-4 text-base text-foreground">{p.details}</DialogDescription>
              <h4 className="mt-5 font-semibold">Formats</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {p.formats.map((f) => <li key={f} className="rounded-full bg-sage/50 px-3 py-1 text-sm">{f}</li>)}
              </ul>
              <Button variant="coral" size="lg" className="mt-6 w-full" asChild>
                <a href={p.url} target="_blank" rel="noopener noreferrer">View on Gumroad <ExternalLink aria-hidden /></a>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const configured = !!site.contactEmail;
  return (
    <section id="contact" aria-labelledby="contact-h" className="relative mx-auto max-w-5xl px-5 py-24 grid gap-10 md:grid-cols-[1fr_1.3fr]">
      <div>
        <p className="font-hand text-2xl text-muted-foreground">say hello</p>
        <h2 id="contact-h" className="text-4xl md:text-5xl font-semibold">Contact</h2>
        <p className="mt-4 text-muted-foreground">Follow along on Pinterest or browse the store.</p>
        <a href={site.pinterestUrl} target="_blank" rel="noopener noreferrer" className="relative mt-6 block max-w-xs paper-card p-4 transition-transform hover:-translate-y-1">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" aria-hidden />
          <Sprig className="pointer-events-none absolute -right-8 -bottom-6 h-24 text-sage opacity-70" />
          <img src={portrait.url} alt="niksyy's Pinterest profile picture" className="w-full rounded-full" />
          <span className="mt-4 flex items-center gap-3">
            <img src={portrait.url} alt="" className="size-10 rounded-full object-cover ring-2 ring-sage" />
            <span>
              <span className="block font-semibold">niksyy on Pinterest</span>
              <span className="text-sm text-muted-foreground">@niksyymyshop</span>
            </span>
          </span>
          <span className="mt-4 block rounded-md bg-primary py-2 text-center font-semibold text-primary-foreground">Follow on Pinterest ↗</span>
        </a>
        <a className="mt-5 inline-block font-semibold underline underline-offset-4" href={site.gumroadUrl} target="_blank" rel="noopener noreferrer">Gumroad store ↗</a>
      </div>
      <form
        className="relative paper-card p-6 md:p-8 space-y-4 self-start"
        onSubmit={(e) => {
          e.preventDefault();
          if (!configured) return;
          const f = new FormData(e.currentTarget);
          const body = `From: ${f.get("name")} <${f.get("email")}>\n\n${f.get("message")}`;
          window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Hello niksyy")}&body=${encodeURIComponent(body)}`;
          setSent(true);
        }}
      >
        <span className="tape -top-3 right-10 rotate-[5deg]" aria-hidden />
        {!configured && (
          <p role="note" className="rounded-md border-l-4 border-accent bg-muted p-3 text-sm">
            Setup note: the contact email hasn't been added yet, so messages can't be sent.
          </p>
        )}
        {[["name", "Name", "text"], ["email", "Email", "email"]].map(([id, l, t]) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-semibold">{l}</label>
            <input id={id} name={id} type={t} required maxLength={200} className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
          </div>
        ))}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold">Message</label>
          <textarea id="message" name="message" required rows={5} maxLength={2000} className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <Button variant="hero" size="lg" type="submit" disabled={!configured}>Send message</Button>
        {sent && <p aria-live="polite" className="text-sm">Your email app should open with the message ready to send.</p>}
      </form>
    </section>
  );
}

function Index() {
  const [active, setActive] = useState<Product | null>(null);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 bg-paper p-2">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Divider />
        <About />
        <Products onOpen={setActive} />
        <PinterestSection />
        <Divider />
        <Contact />
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <Divider className="mb-4" />
        © {new Date().getFullYear()} {site.name}
      </footer>
      <ProductModal p={active} onClose={() => setActive(null)} />
    </>
  );
}
