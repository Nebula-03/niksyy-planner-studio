import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { boards, visibleProducts, type Product } from "@/data/products";
import { site } from "@/data/site";
import { ProductImage } from "@/components/site/ProductImage";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Sprig, Flower, Divider, FlowerLine } from "@/components/site/Botanical";
import portrait from "@/assets/niksyy-portrait.jpeg";
import pinterestQr from "@/assets/pinterest-qr.png";

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
  const ps = visibleProducts();
  const spots = [
    { c: "left-[2%] top-[4%] w-40 md:w-52", r: "-6deg", a: "animate-float-a" },
    { c: "right-[4%] top-[0%] w-36 md:w-48", r: "5deg", a: "animate-float-b" },
    { c: "left-[22%] bottom-[2%] w-36 md:w-44", r: "3deg", a: "animate-float-b" },
    { c: "right-[14%] bottom-[6%] w-40 md:w-52", r: "-4deg", a: "animate-float-a" },
  ];
  return (
    <section id="top" className="relative mx-auto grid max-w-6xl items-center gap-10 overflow-hidden px-5 pt-14 pb-20 md:grid-cols-2 md:pt-20">
      <Sprig className="pointer-events-none absolute -left-4 bottom-0 h-56 text-sage opacity-60 animate-float-b" />
      <div className="relative animate-rise">
        <p className="font-hand text-3xl text-muted-foreground">a designer's pinboard ✿</p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold leading-[1.05]">
          Little things, beautifully made.
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted-foreground">
          niksyy is a creative designer sharing Pins, boards and handmade digital products on Pinterest.
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
        <Flower className="pointer-events-none absolute left-[44%] bottom-[34%] h-28 text-coral opacity-70 animate-float-a" />
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
        <Flower className="pointer-events-none absolute -right-5 -bottom-8 h-28 text-coral opacity-70" />
        <Sprig className="pointer-events-none absolute -left-8 -top-10 h-24 rotate-[-20deg] text-sage opacity-70" />
        <h2 id="about-h" className="text-4xl font-semibold">About</h2>
        <p className="font-hand text-2xl text-muted-foreground mt-1">{site.aboutTitle}</p>
        <div className="mt-5 space-y-4 text-lg leading-relaxed">
          {site.about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, i, onOpen }: { p: Product; i: number; onOpen: (p: Product) => void }) {
  const tints = ["bg-sage/40", "bg-lilac/40", "bg-coral/30"];
  return (
    <li className="relative paper-card flex flex-col p-4 transition-transform hover:-translate-y-1 hover:shadow-lift" style={{ rotate: `${(i % 3 - 1) * 0.7}deg` }}>
      <span className="pin left-1/2 -top-1.5 -translate-x-1/2" aria-hidden />
      <button onClick={() => onOpen(p)} className={`block overflow-hidden rounded-sm ${tints[i % 3]}`} aria-label={`View details: ${p.name}`}>
        <ProductImage src={p.image} alt={`${p.name} cover`} className="aspect-[4/3] w-full" />
      </button>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h4 className="text-xl font-semibold leading-snug">
          <button onClick={() => onOpen(p)} className="text-left hover:underline">{p.name}</button>
        </h4>
        {p.price && <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">{p.price}</span>}
      </div>
      <p className="mt-2 text-muted-foreground">{p.short}</p>
      {p.formats.length > 0 && <p className="mt-3 text-xs font-semibold uppercase tracking-wide">{p.formats.join(" · ")}</p>}
      <div className="mt-auto pt-5">
        <Button variant="coral" className="w-full" asChild>
          <a href={p.url} target="_blank" rel="noopener noreferrer">{p.linkLabel ?? "View on Gumroad"} <ExternalLink aria-hidden /></a>
        </Button>
      </div>
    </li>
  );
}

function Products({ onOpen }: { onOpen: (p: Product) => void }) {
  const ps = visibleProducts();
  const groups = [...boards]
    .sort((a, b) => a.order - b.order)
    .map((b) => ({ ...b, items: ps.filter((p) => p.board === b.id) }))
    .filter((g) => g.items.length > 0);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const toggle = (id: string) => setOpenIds((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  return (
    <section id="products" aria-labelledby="prod-h" className="relative overflow-hidden bg-muted/60 py-24">
      <Sprig className="pointer-events-none absolute -right-4 top-10 h-64 text-sage opacity-50 animate-float-a" />
      <div className="relative mx-auto max-w-6xl px-5">
        <p className="font-hand text-2xl text-muted-foreground">fresh off the pinboard</p>
        <h2 id="prod-h" className="flex items-center gap-3 text-4xl md:text-5xl font-semibold"><Flower className="h-10 text-coral" />Products</h2>
        <div className="mt-10">
          {groups.map((g, gi) => {
            const isOpen = openIds.includes(g.id);
            return (
              <div key={g.id}>
                {gi > 0 && <FlowerLine className="my-6" />}
                <h3 className="text-2xl md:text-3xl font-semibold">
                  <button
                    onClick={() => toggle(g.id)}
                    aria-expanded={isOpen}
                    aria-controls={`board-${g.id}`}
                    className="group flex w-full items-center gap-3 py-3 text-left"
                  >
                    <span className="underline-offset-8 decoration-accent decoration-2 group-hover:underline">{g.name}</span>
                    <span className="text-base font-normal text-muted-foreground">{g.items.length} {g.items.length === 1 ? "Pin" : "Pins"}</span>
                    <ChevronRight aria-hidden className={`size-6 shrink-0 text-accent transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </button>
                </h3>
                {isOpen && (
                  <ul id={`board-${g.id}`} className="animate-rise mt-6 mb-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((p, i) => <ProductCard key={p.id} p={p} i={i} onOpen={onOpen} />)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
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
                <a href={p.url} target="_blank" rel="noopener noreferrer">{p.linkLabel ?? "View on Gumroad"} <ExternalLink aria-hidden /></a>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="mx-auto max-w-5xl px-5 py-24 grid gap-10 md:grid-cols-[1fr_1.3fr] items-center">
      <div>
        <p className="font-hand text-2xl text-muted-foreground">say hello</p>
        <h2 id="contact-h" className="text-4xl md:text-5xl font-semibold">Contact</h2>
        <p className="mt-4 text-muted-foreground">Questions about a planner? Scan my Pinterest code or tap the button — I reply there.</p>
        <ul className="mt-6 space-y-3 font-semibold">
          <li><a className="underline underline-offset-4" href={site.pinterestUrl} target="_blank" rel="noopener noreferrer">Pinterest profile ↗</a></li>
          <li><a className="underline underline-offset-4" href={site.gumroadUrl} target="_blank" rel="noopener noreferrer">Gumroad store ↗</a></li>
        </ul>
      </div>
      <div className="relative paper-card p-6 md:p-8 flex flex-col items-center text-center">
        <span className="tape -top-3 left-10 -rotate-[4deg]" aria-hidden />
        <Sprig className="pointer-events-none absolute -right-8 -bottom-6 h-24 text-sage opacity-70" />
        <img src={portrait} alt="Portrait of Niksyy" className="size-20 rounded-full object-cover ring-4 ring-sage/60 shadow-lift" />
        <p className="mt-3 font-hand text-2xl leading-none">scan to follow</p>
        <img src={pinterestQr} alt="QR code that opens the Niksyy Shop Pinterest profile" width={176} height={176} className="mt-4 size-44 rounded-md border shadow-lift" />
        <p className="mt-3 text-sm text-muted-foreground">Point your camera at the code to open <span className="font-semibold">@niksyymyshop</span> on Pinterest.</p>
        <Button variant="hero" size="lg" className="mt-5" asChild>
          <a href={site.pinterestUrl} target="_blank" rel="noopener noreferrer">Follow on Pinterest <ExternalLink aria-hidden /></a>
        </Button>
      </div>
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
