import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { newsDate, splitSources, storyImage, storyImages } from "@/lib/news";
import type { RegulatoryUpdate } from "@shared/schema";

function sourceLabel(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("govinfo") || host.includes("federalregister")) return "Federal Register notice";
    if (host.includes("transportation.gov")) return "U.S. DOT";
    if (host.includes("fmcsa")) return "FMCSA";
    if (host.includes("faa.gov")) return "FAA";
    return host;
  } catch {
    return "Official source";
  }
}

export default function UpdateDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: update, isLoading, error } = useQuery<RegulatoryUpdate>({ queryKey: ["/api/updates", id] });
  const { data: all } = useQuery<RegulatoryUpdate[]>({ queryKey: ["/api/updates"] });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-10 max-w-3xl space-y-4">
        <div className="h-4 w-40 bg-muted animate-pulse rounded" />
        <div className="h-12 w-full bg-muted animate-pulse rounded" />
        <div className="aspect-[16/9] w-full bg-muted animate-pulse rounded-sm" />
      </div>
    );
  }

  if (error || !update) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
        <p className="text-muted-foreground mb-4">This update could not be found.</p>
        <Link href="/updates" className="font-semibold underline">Back to all updates</Link>
      </div>
    );
  }

  const { body, sources } = splitSources(update.content);
  const related = (all || []).filter((u) => u.id !== update.id).slice(0, 3);
  const imgs = storyImages(all || []);

  return (
    <article className="container mx-auto px-4 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/updates" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" /> All updates
        </Link>

        <div className="kicker mt-6">
          {update.agency} <span className="text-muted-foreground font-semibold">· {update.category}</span>
        </div>
        <h1 className="headline text-3xl md:text-5xl leading-[1.08] mt-3" data-testid="text-update-title">{update.title}</h1>
        <p className="text-xl text-muted-foreground mt-4 leading-relaxed" data-testid="text-update-summary">{update.summary}</p>
        <div className="text-sm text-muted-foreground mt-4 pb-6 border-b">
          Published {newsDate(update.publishedDate, { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </div>

      <img src={imgs[update.id] || storyImage(update)} alt="" className="max-w-5xl w-full mx-auto aspect-[16/9] object-cover rounded-sm mt-8 bg-muted" />

      <div className="max-w-3xl mx-auto mt-8">
        {update.plainLanguageSummary && (
          <div className="border-l-4 border-[hsl(4_72%_44%)] bg-muted/50 px-5 py-4 mb-8" data-testid="text-plain-summary">
            <div className="text-xs font-bold uppercase tracking-[0.14em] mb-1">What it means</div>
            <p className="text-lg leading-relaxed">{update.plainLanguageSummary}</p>
          </div>
        )}

        <div className="text-lg leading-[1.75] space-y-5" data-testid="text-update-content">
          {body.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {sources.length > 0 && (
          <div className="mt-10 border-t-2 border-foreground/90 pt-4">
            <div className="text-xs font-bold uppercase tracking-[0.14em] mb-3">Official source{sources.length > 1 ? "s" : ""}</div>
            <ul className="space-y-2">
              {sources.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4 hover:opacity-80">
                    {sourceLabel(url)} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-3">Always confirm requirements with the governing agency before acting on them.</p>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <section className="max-w-5xl mx-auto mt-16">
          <div className="section-label mb-6">More updates</div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((u) => (
              <Link key={u.id} href={`/updates/${u.id}`} className="news-link block">
                <img src={imgs[u.id]} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover rounded-sm mb-3 bg-muted" />
                <div className="kicker">{u.agency}</div>
                <h3 className="headline text-lg leading-snug mt-1">{u.title}</h3>
                <div className="text-xs text-muted-foreground mt-2">{newsDate(u.publishedDate)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
