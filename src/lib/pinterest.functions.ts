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
  .inputValidator(z.object({ limit: z.number().int().min(1).max(24), days: z.number().int().min(7).max(90) }))
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

export type BoardPin = { id: string; title: string; image: string; link: string; pinUrl: string };
export type BoardWithPins = { id: string; name: string; pins: BoardPin[] };
export type BoardsResult =
  | { status: "disconnected" }
  | { status: "error"; message: string }
  | { status: "ok"; boards: BoardWithPins[]; fetchedAt: string };

// Pinterest has rate limits, so keep the last good answer on the server for a few minutes.
const BOARDS_TTL_MS = 10 * 60 * 1000;
let boardsCache: { at: number; value: BoardsResult } | null = null;

// Server-only: lists your public boards and the Pins in each one (needs boards:read + pins:read).
export const getBoardPins = createServerFn({ method: "GET" }).handler(async (): Promise<BoardsResult> => {
  const token = process.env["PINTEREST_ACCESS_TOKEN"];
  if (!token) return { status: "disconnected" };
  if (boardsCache && Date.now() - boardsCache.at < BOARDS_TTL_MS) return boardsCache.value;
  const headers = { Authorization: `Bearer ${token}` };
  const getAll = async (path: string): Promise<any[]> => {
    const items: any[] = [];
    let bookmark: string | undefined;
    for (let page = 0; page < 10; page++) {
      const sep = path.includes("?") ? "&" : "?";
      const res = await fetch(`${API}${path}${sep}page_size=100${bookmark ? `&bookmark=${encodeURIComponent(bookmark)}` : ""}`, { headers });
      if (!res.ok) throw new Error(`Pinterest responded ${res.status}`);
      const json = (await res.json()) as { items?: any[]; bookmark?: string | null };
      items.push(...(json.items ?? []));
      if (!json.bookmark) break;
      bookmark = json.bookmark;
    }
    return items;
  };
  try {
    const rawBoards = (await getAll("/boards")).filter((b) => !b.privacy || b.privacy === "PUBLIC");
    const boards: BoardWithPins[] = await Promise.all(
      rawBoards.map(async (b) => {
        const rawPins = await getAll(`/boards/${b.id}/pins`);
        return {
          id: String(b.id),
          name: String(b.name ?? "Untitled board"),
          pins: rawPins.map((p) => ({
            id: String(p.id),
            title: String(p.title || p.description || "Untitled Pin"),
            image: p.media?.images?.["600x"]?.url ?? p.media?.images?.["400x300"]?.url ?? "",
            link: typeof p.link === "string" ? p.link : "",
            pinUrl: `https://www.pinterest.com/pin/${p.id}/`,
          })),
        };
      }),
    );
    const value: BoardsResult = { status: "ok", boards, fetchedAt: new Date().toISOString() };
    boardsCache = { at: Date.now(), value };
    return value;
  } catch (e) {
    return { status: "error", message: e instanceof Error ? e.message : "Unknown error" };
  }
});
