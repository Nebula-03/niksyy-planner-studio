import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { visibleProducts, type Product } from "@/data/products";
import { site } from "@/data/site";
import { ProductImage } from "@/components/site/ProductImage";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { getPinterestProducts } from "@/lib/pinterest-products.functions";

/** Products from the Pinterest feed when connected, else the manual list. */
function useProducts(): Product[] {
  const q = useQuery({
    queryKey: ["pinterest-products"],
    queryFn: () => getPinterestProducts(),
    refetchInterval: 1000 * 60 * 60, // check for new Pins every hour while open
    staleTime: 1000 * 60 * 15,
  });
  return q.data?.status === "ok" ? q.data.products : visibleProducts();
}

const OG_IMAGE = "https://public-files.gumroad.com/0ff13fix7dff61cu22gstr4qi0ca";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Niksyy Shop — Digital Budget & Savings Planners" },
      { name: "description", content: "Printable and digital planners for budgeting, paychecks, sinking funds and savings — from Niksyy Shop." },
      { property: "og:title", content: "Niksyy Shop — Digital Budget & Savings Planners" },
      { property: "og:description", content: "Printable and digital planners for budgeting, paychecks and savings." },
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
  ["Contact", "#contact"],
] as const;

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-display text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Niksyy<span className="text-accent"> Shop</span>
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
  const ps = useProducts();
  const spots = [
    { c: "left-[2%] top-[4%] w-40 md:w-52", r: "-6deg", a: "animate-float-a" },
    { c: "right-[4%] top-[0%] w-36 md:w-48", r: "5deg", a: "animate-float-b" },
    { c: "left-[22%] bottom-[2%] w-36 md:w-44", r: "3deg", a: "animate-float-b" },
    { c: "right-[14%] bottom-[6%] w-40 md:w-52", r: "-4deg", a: "animate-float-a" },
  ];
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-14 pb-20 md:grid-cols-2 md:pt-20">
      <div className="animate-rise">
        <p className="font-hand text-3xl text-muted-foreground">a little planner shop ✿</p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold leading-[1.05]">
          Plan your money, <em className="text-accent not-italic underline decoration-sage decoration-8 underline-offset-4">gently</em>.
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted-foreground">
          Niksyy Shop is a small digital-planner shop with printable and spreadsheet planners for budgeting, paychecks and savings.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="hero" size="lg" asChild><a href="#products">Browse products</a></Button>
          <Button variant="paper" size="lg" asChild>
            <a href={site.pinterestUrl} target="_blank" rel="noopener noreferrer">Visit Pinterest</a>
          </Button>
        </div>
      </div>
      <div className="relative h-[420px] md:h-[520px]" aria-hidden>
        <div className="absolute inset-[12%] rounded-full bg-lilac/40 blur-3xl" />
        {spots.map((s, i) => ps[i] && (
          <div key={i} className={`absolute ${s.c} ${s.a} paper-card p-2`} style={{ ["--r" as string]: s.r, animationDelay: `${i * -1.7}s` }}>
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
            <ProductImage src={ps[i].image} alt="" className="aspect-[4/3] w-full rounded-sm" />
          </div>
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
        <h2 id="about-h" className="text-4xl font-semibold">About</h2>
        <p className="font-hand text-2xl text-muted-foreground mt-1">{site.aboutTitle}</p>
        <div className="mt-5 space-y-4 text-lg leading-relaxed">
          {site.about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}

function Products({ onOpen }: { onOpen: (p: Product) => void }) {
  const ps = useProducts();
  const tints = ["bg-sage/40", "bg-lilac/40", "bg-coral/30"];
  return (
    <section id="products" aria-labelledby="prod-h" className="bg-muted/60 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-hand text-2xl text-muted-foreground">fresh off the pinboard</p>
        <h2 id="prod-h" className="text-4xl md:text-5xl font-semibold">Products</h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ps.map((p, i) => (
            <li key={p.id} className="relative paper-card flex flex-col p-4 transition-transform hover:-translate-y-1 hover:shadow-lift" style={{ rotate: `${(i % 3 - 1) * 0.7}deg` }}>
              <span className="pin left-1/2 -top-1.5 -translate-x-1/2" aria-hidden />
              <button onClick={() => onOpen(p)} className={`block overflow-hidden rounded-sm ${tints[i % 3]}`} aria-label={`View details: ${p.name}`}>
                <ProductImage src={p.image} alt={`${p.name} cover`} className="aspect-[4/3] w-full" />
              </button>
              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold leading-snug">
                  <button onClick={() => onOpen(p)} className="text-left hover:underline">{p.name}</button>
                </h3>
                {p.price && (
                  <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">{p.price}</span>
                )}
              </div>
              {p.short && <p className="mt-2 text-muted-foreground">{p.short}</p>}
              {p.formats.length > 0 && (
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide">{p.formats.join(" · ")}</p>
              )}
              <div className="mt-auto pt-5">
                <Button variant="coral" className="w-full" asChild>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">View on Gumroad <ExternalLink aria-hidden /></a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
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
              {p.price && <p className="mt-2 text-2xl font-bold text-primary">{p.price}</p>}
              <DialogDescription className="mt-4 text-base text-foreground">{p.details}</DialogDescription>
              {p.formats.length > 0 && (
                <>
                  <h4 className="mt-5 font-semibold">Formats</h4>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.formats.map((f) => <li key={f} className="rounded-full bg-sage/50 px-3 py-1 text-sm">{f}</li>)}
                  </ul>
                </>
              )}
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
    <section id="contact" aria-labelledby="contact-h" className="mx-auto max-w-5xl px-5 py-24 grid gap-10 md:grid-cols-[1fr_1.3fr]">
      <div>
        <p className="font-hand text-2xl text-muted-foreground">say hello</p>
        <h2 id="contact-h" className="text-4xl md:text-5xl font-semibold">Contact</h2>
        <p className="mt-4 text-muted-foreground">Questions about a planner? Send a note.</p>
        <ul className="mt-6 space-y-3 font-semibold">
          <li><a className="underline underline-offset-4" href={site.pinterestUrl} target="_blank" rel="noopener noreferrer">Pinterest profile ↗</a></li>
          <li><a className="underline underline-offset-4" href={site.gumroadUrl} target="_blank" rel="noopener noreferrer">Gumroad store ↗</a></li>
        </ul>
      </div>
      <form
        className="relative paper-card p-6 md:p-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!configured) return;
          const f = new FormData(e.currentTarget);
          const body = `From: ${f.get("name")} <${f.get("email")}>\n\n${f.get("message")}`;
          window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Niksyy Shop enquiry")}&body=${encodeURIComponent(body)}`;
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
        <About />
        <Products onOpen={setActive} />
        <Contact />
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {site.name}
      </footer>
      <ProductModal p={active} onClose={() => setActive(null)} />
    </>
  );
}
