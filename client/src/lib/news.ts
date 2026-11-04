// Shared helpers for the news-style layout.

// Dates are stored as midnight UTC, so format in UTC to avoid showing the day before.
export function newsDate(d: string | Date, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) {
  return new Date(d).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
}

// Strips the "Official sources:" line the content carries, and returns the links separately.
export function splitSources(content: string) {
  const [body, sources] = content.split(/\n\nOfficial sources:\s*/);
  return { body: body.trim(), sources: sources ? sources.split(" | ").map((s) => s.trim()).filter(Boolean) : [] };
}

export const agencyNames: Record<string, string> = {
  DOT: "DOT",
  FMCSA: "Trucking · FMCSA",
  FAA: "Aviation · FAA",
  FTA: "Transit · FTA",
  FRA: "Rail · FRA",
  PHMSA: "Pipeline · PHMSA",
  USCG: "Maritime · USCG",
};

// Topic photos (free under the Unsplash License), stored in client/public/images.
// A story's own imageUrl wins; otherwise a photo is picked by agency, then by category.
// Topics with several photos rotate so stories next to each other don't repeat.
type StoryLike = { id: string; agency: string; category: string; imageUrl?: string | null };

const agencyPhotos: Record<string, string[]> = {
  FMCSA: ["/images/trucking.jpg"],
  FAA: ["/images/aviation.jpg"],
  FTA: ["/images/transit.jpg"],
  FRA: ["/images/rail.jpg"],
  PHMSA: ["/images/pipeline.jpg"],
  USCG: ["/images/maritime.jpg"],
};

function photoPool(u: StoryLike): string[] {
  if (agencyPhotos[u.agency]) return agencyPhotos[u.agency];
  const c = u.category.toLowerCase();
  if (/sap|return-to-duty|rtd/.test(c)) return ["/images/sap.jpg", "/images/office-2.jpg"];
  if (/rulemaking|policy|regulation/.test(c)) return ["/images/capitol.jpg", "/images/paperwork.jpg"];
  if (/lab|test|collect|specimen|form|procedure/.test(c)) return ["/images/lab.jpg", "/images/lab-2.jpg", "/images/lab-3.jpg"];
  return ["/images/paperwork.jpg", "/images/office-2.jpg", "/images/capitol.jpg"];
}

// Assigns photos across ALL stories (newest first), rotating through each topic's photos,
// so each story keeps the same photo on every page and neighbours rarely repeat.
export function storyImages(all: (StoryLike & { publishedDate: string | Date })[]) {
  const sorted = [...all].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  const counters: Record<string, number> = {};
  const out: Record<string, string> = {};
  for (const u of sorted) {
    if (u.imageUrl) { out[u.id] = u.imageUrl; continue; }
    const pool = photoPool(u);
    const key = pool.join("|");
    const n = counters[key] ?? 0;
    out[u.id] = pool[n % pool.length];
    counters[key] = n + 1;
  }
  return out;
}

// Single-story fallback when the full list isn't loaded yet.
export function storyImage(u: StoryLike) {
  if (u.imageUrl) return u.imageUrl;
  return photoPool(u)[0];
}
