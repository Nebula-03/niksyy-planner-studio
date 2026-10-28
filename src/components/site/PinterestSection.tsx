import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTopPins } from "@/lib/pinterest.functions";
import { manualPins, site } from "@/data/site";

const n = (v: number | null) => (v == null ? "—" : v.toLocaleString());

type Card = { key: string; title: string; image: string; url: string; impressions: number | null; outboundClicks: number | null; saves: number | null };

export function PinterestSection() {
  const [limit, setLimit] = useState(6);
  const [days, setDays] = useState(30);
  const q = useQuery({
    queryKey: ["pins", limit, days],
    queryFn: () => getTopPins({ data: { limit, days } }),
    refetchInterval: 1000 * 60 * 60 * 6, // refresh every 6 hours while open
    staleTime: 1000 * 60 * 30,
  });

  const r = q.data;
  const connected = r?.status === "ok";
  const cards: Card[] = connected
    ? r.pins.map((p) => ({ key: p.id, ...p }))
    : manualPins.slice(0, limit).map((p) => ({ key: p.url, ...p }));

  return (
    <section id="pinterest" aria-labelledby="pin-h" className="mx-auto max-w-6xl px-5 py-24">
      <p className="font-hand text-2xl text-accent-foreground/80">pinned with love</p>
      <h2 id="pin-h" className="text-4xl md:text-5xl font-semibold">Featured on Pinterest</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">Top Pins ranked by impressions, with outbound clicks and saves.</p>

      <div className="mt-8 flex flex-wrap items-end gap-4">
        <label className="text-sm">
          <span className="block mb-1 font-medium">Pins to show</span>
          <select value={limit} onChange={(e) => setLimit(+e.target.value)} className="rounded-md border bg-paper px-3 py-2">
            {[3, 6, 9, 12].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="block mb-1 font-medium">Date range</span>
          <select value={days} onChange={(e) => setDays(+e.target.value)} className="rounded-md border bg-paper px-3 py-2">
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </label>
        <Button variant="paper" onClick={() => q.refetch()} disabled={q.isFetching}>
          <RefreshCw className={q.isFetching ? "animate-spin" : ""} aria-hidden /> Refresh Pins
        </Button>
        <a href={site.pinterestUrl} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm font-semibold underline underline-offset-4">
          Visit my Pinterest profile ↗
        </a>
      </div>

      <div aria-live="polite" className="mt-6 text-sm">
        {q.isLoading && <p className="text-muted-foreground">Loading Pins…</p>}
        {q.isError && <p className="paper-card p-4 text-destructive">Couldn't reach the Pins service. Try Refresh Pins.</p>}
        {r?.status === "error" && <p className="paper-card p-4 text-destructive">Pinterest returned an error ({r.message}). Your connection may need re-authorizing.</p>}
        {r?.status === "disconnected" && (
          <div className="paper-card p-5 border-l-4 border-lilac">
            <p className="font-semibold">Pinterest isn't connected yet.</p>
            <p className="mt-1 text-muted-foreground">
              Live analytics appear here once a read-only Pinterest connection is set up. Meanwhile, Pins you add by hand in the site settings are shown below{manualPins.length ? "" : " (none added yet)"}.
            </p>
          </div>
        )}
        {connected && <p className="text-muted-foreground">Last updated {new Date(r.fetchedAt).toLocaleString()}. Pinterest analytics can take a while to update after posting.</p>}
      </div>

      {!q.isLoading && cards.length === 0 && r?.status !== "disconnected" && r?.status !== "error" && (
        <p className="mt-6 text-muted-foreground">No Pins found for this date range.</p>
      )}

      <ul className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-6 [&>li]:mb-6">
        {cards.map((c, i) => (
          <li key={c.key} className="break-inside-avoid relative paper-card p-3" style={{ rotate: `${(i % 3 - 1) * 0.8}deg` }}>
            <span className="pin left-1/2 -top-1.5 -translate-x-1/2" aria-hidden />
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="block">
              {c.image ? <img src={c.image} alt={c.title} loading="lazy" className="w-full rounded-sm" /> : <div className="aspect-[2/3] bg-muted rounded-sm" />}
              <h3 className="mt-3 font-sans font-semibold leading-snug">{c.title}</h3>
            </a>
            <dl className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded bg-lilac/50 p-2"><dt>Impressions</dt><dd className="text-base font-bold">{n(c.impressions)}</dd></div>
              <div className="rounded bg-sage/50 p-2"><dt>Clicks</dt><dd className="text-base font-bold">{n(c.outboundClicks)}</dd></div>
              <div className="rounded bg-coral/40 p-2"><dt>Saves</dt><dd className="text-base font-bold">{n(c.saves)}</dd></div>
            </dl>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">
              View Pin <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
