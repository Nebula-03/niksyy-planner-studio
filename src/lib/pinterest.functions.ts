import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type PinStat = {
  id: string;
  title: string;
  image: string;
  url: string;
  impressions: number;
  outboundClicks: number;
  saves: number;
};

export type PinsResult =
  | { status: "disconnected" }
  | { status: "error"; message: string }
  | { status: "ok"; pins: PinStat[]; fetchedAt: string };

const API = "https://api.pinterest.com/v5";

// Server-only: reads a read-scoped token (pins:read, user_accounts:read) from env.
export const getTopPins = createServerFn({ method: "GET" })
  .validator(z.object({ limit: z.number().int().min(1).max(24), days: z.number().int().min(7).max(90) }))
  .handler(async ({ data }): Promise<PinsResult> => {
    const token = process.env["PINTEREST_ACCESS_TOKEN"];
    if (!token) return { status: "disconnected" };
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const res = await fetch(`${API}/pins?page_size=50`, { headers });
      if (!res.ok) return { status: "error", message: `Pinterest responded ${res.status}` };
      const list = (await res.json()) as { items: any[] };
      const end = new Date();
      const start = new Date(end.getTime() - data.days * 86400000);
      const fmt = (d: Date) => d.toISOString().slice(0, 10);
      const pins = await Promise.all(
        (list.items ?? []).map(async (p) => {
          let m: any = {};
          const a = await fetch(
            `${API}/pins/${p.id}/analytics?start_date=${fmt(start)}&end_date=${fmt(end)}&metric_types=IMPRESSION,OUTBOUND_CLICK,SAVE`,
            { headers },
          );
          if (a.ok) m = (await a.json())?.all?.lifetime_metrics;
          const img = p.media?.images?.["600x"]?.url ?? p.media?.images?.["400x300"]?.url ?? "";
          return {
            id: p.id,
            title: p.title || p.description || "Untitled Pin",
            image: img,
            url: `https://www.pinterest.com/pin/${p.id}/`,
            impressions: m.IMPRESSION ?? 0,
            outboundClicks: m.OUTBOUND_CLICK ?? 0,
            saves: m.SAVE ?? 0,
          } satisfies PinStat;
        }),
      );
      pins.sort((x, y) => y.impressions - x.impressions);
      return { status: "ok", pins: pins.slice(0, data.limit), fetchedAt: new Date().toISOString() };
    } catch (e) {
      return { status: "error", message: e instanceof Error ? e.message : "Unknown error" };
    }
  });

export type BoardStat = { id: string; name: string; image: string; url: string; pinCount: number | null };
export type BoardsResult =
  | { status: "disconnected" }
  | { status: "error"; message: string }
  | { status: "ok"; boards: BoardStat[]; fetchedAt: string };

// Lists the account's boards so newly created boards appear after a refresh.
export const getBoards = createServerFn({ method: "GET" }).handler(async (): Promise<BoardsResult> => {
  const token = process.env["PINTEREST_ACCESS_TOKEN"];
  if (!token) return { status: "disconnected" };
  try {
    const res = await fetch(`${API}/boards?page_size=50`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return { status: "error", message: `Pinterest responded ${res.status}` };
    const j = (await res.json()) as { items: any[] };
    const boards = (j.items ?? []).map((b) => ({
      id: b.id,
      name: b.name ?? "Board",
      image: b.media?.image_cover_url ?? "",
      url: b.owner?.username ? `https://www.pinterest.com/${b.owner.username}/` : "https://in.pinterest.com/niksyymyshop/",
      pinCount: b.pin_count ?? null,
    }));
    return { status: "ok", boards, fetchedAt: new Date().toISOString() };
  } catch (e) {
    return { status: "error", message: e instanceof Error ? e.message : "Unknown error" };
  }
});
