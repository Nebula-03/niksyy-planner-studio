import { createServerFn } from "@tanstack/react-start";
import type { Product } from "@/data/products";
import { products } from "@/data/products";

export type ProductsResult =
  | { status: "disconnected" }
  | { status: "error"; message: string }
  | { status: "ok"; products: Product[]; fetchedAt: string };

const API = "https://api.pinterest.com/v5";

/**
 * Fetches the newest Pins from the connected Pinterest account and turns
 * every Pin that links to a Gumroad product into a product card.
 * Pins whose link matches a product in src/data/products.ts inherit that
 * product's price, formats and description; brand-new Pins show with the
 * Pin's title, image and link (no price until added to products.ts).
 *
 * Server-only: reads a read-scoped token (pins:read, user_accounts:read)
 * from the PINTEREST_ACCESS_TOKEN env var. Never called from the browser.
 */
export const getPinterestProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProductsResult> => {
    const token = process.env["PINTEREST_ACCESS_TOKEN"];
    if (!token) return { status: "disconnected" };
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const res = await fetch(`${API}/pins?page_size=50`, { headers });
      if (!res.ok) {
        const body = await res.text();
        console.error(`Pinterest /pins failed [${res.status}]: ${body}`);
        return { status: "error", message: `Pinterest responded ${res.status}` };
      }
      const list = (await res.json()) as { items?: any[] };

      const manualByUrl = new Map(
        products.map((p) => [normalizeUrl(p.url), p]),
      );

      const seen = new Set<string>();
      const synced: Product[] = [];
      for (const pin of list.items ?? []) {
        const link: string = pin.link ?? "";
        if (!link || !/gumroad\.com/i.test(link)) continue;
        const key = normalizeUrl(link);
        if (seen.has(key)) continue; // several Pins can point to one product
        seen.add(key);

        const manual = manualByUrl.get(key);
        const image =
          pin.media?.images?.["600x"]?.url ??
          pin.media?.images?.["400x300"]?.url ??
          pin.media?.image_cover_url ??
          manual?.image ??
          "";
        synced.push({
          id: `pin-${pin.id}`,
          name: manual?.name ?? pin.title ?? "Untitled product",
          short: manual?.short ?? firstLine(pin.description) ?? "",
          details:
            manual?.details ?? pin.description ?? "See the Gumroad listing for details.",
          formats: manual?.formats ?? [],
          price: manual?.price ?? "",
          url: link,
          image,
          order: manual?.order ?? 1000 + synced.length,
        });
      }

      // Manual products that have no Pin yet still show, in their set order.
      const unsynced = products.filter(
        (p) => !p.hidden && !seen.has(normalizeUrl(p.url)),
      );
      const merged = [...synced, ...unsynced].sort((a, b) => a.order - b.order);

      return {
        status: "ok",
        products: merged,
        fetchedAt: new Date().toISOString(),
      };
    } catch (e) {
      return {
        status: "error",
        message: e instanceof Error ? e.message : "Unknown error",
      };
    }
  },
);

function normalizeUrl(url: string): string {
  return url
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "");
}

function firstLine(text: string | null | undefined): string | null {
  if (!text) return null;
  const line = (text.split("\n")[0] ?? "").trim();
  return line.length > 140 ? line.slice(0, 137) + "…" : line;
}
