import { boards as staticBoards, type Product } from "@/data/products";
import type { BoardsResult } from "@/lib/pinterest.functions";

export type BoardGroup = { id: string; name: string; items: Product[] };

const norm = (u: string) => u.trim().toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/[?#].*$/, "").replace(/\/+$/, "");

/** The hand-written list in products.ts, grouped by board. Used until Pinterest is connected, or if it fails. */
export function staticGroups(products: Product[]): BoardGroup[] {
  return [...staticBoards]
    .sort((a, b) => a.order - b.order)
    .map((b) => ({ id: b.id, name: b.name, items: products.filter((p) => p.board === b.id) }))
    .filter((g) => g.items.length > 0);
}

/**
 * Pinterest boards -> board groups. Every public board becomes a dropdown and every Pin a product.
 * A Pin whose link matches a product in products.ts keeps that product's price, formats and details.
 */
export function pinterestGroups(result: BoardsResult, products: Product[]): BoardGroup[] | null {
  if (result.status !== "ok") return null;
  const known = new Map(products.map((p) => [norm(p.url), p]));
  const groups = result.boards.map((b): BoardGroup => {
    const seen = new Set<string>();
    const items: Product[] = [];
    b.pins.forEach((pin, i) => {
      const key = norm(pin.link || pin.pinUrl);
      if (seen.has(key)) return; // the same Pin saved twice shows once
      seen.add(key);
      const match = pin.link ? known.get(norm(pin.link)) : undefined;
      if (match) {
        items.push({ ...match, order: i });
        return;
      }
      const onGumroad = /gumroad\.com/i.test(pin.link);
      items.push({
        id: `pin-${pin.id}`,
        name: pin.title,
        short: "See details and get it on the link below.",
        details: "See this planner's full details on its listing.",
        formats: [],
        price: "",
        url: pin.link || pin.pinUrl,
        linkLabel: pin.link ? (onGumroad ? "View on Gumroad" : "View product") : "View on Pinterest",
        image: pin.image,
        order: i,
        board: "paycheck",
      });
    });
    return { id: b.id, name: b.name, items };
  });
  return groups.filter((g) => g.items.length > 0);
}
