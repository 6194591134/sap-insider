import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Star, ArrowRight, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { newsDate, agencyNames, storyImages, storyImage } from "@/lib/news";
import type { RegulatoryUpdate, Provider, Organization } from "@shared/schema";

const agencies = ["FMCSA", "FAA", "FTA", "FRA", "PHMSA", "USCG"];

function Kicker({ u }: { u: RegulatoryUpdate }) {
  return (
    <div className="kicker">
      {u.agency} <span className="text-muted-foreground font-semibold">· {u.category}</span>
    </div>
  );
}

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const { data: featured, isLoading } = useQuery<RegulatoryUpdate>({ queryKey: ["/api/updates/featured"] });
  const { data: updates } = useQuery<RegulatoryUpdate[]>({ queryKey: ["/api/updates"] });
  const { data: topProviders } = useQuery<Provider[]>({ queryKey: ["/api/providers/top?limit=5"] });
  const { data: orgs } = useQuery<Organization[]>({ queryKey: ["/api/organizations"] });

  const rest = (updates || []).filter((u) => u.id !== featured?.id);
  const latest = rest.slice(0, 5);
  const more = rest.slice(5, 11);
  const imgs = storyImages([...(updates || []), ...(featured && !(updates || []).some((u) => u.id === featured.id) ? [featured] : [])]);
  const featuredOrgs = (orgs || []).filter((o) => o.featured);

  const subscribe = useMutation({
    mutationFn: (data: { email: string; frequency: string }) => apiRequest("POST", "/api/newsletter/subscribe", data),
    onSuccess: () => {
      toast({ title: "You're subscribed", description: "Weekly updates will come to your inbox." });
      setEmail("");
    },
    onError: () => toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" }),
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Top: lead story + latest rail */}
      <section className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:pr-8 lg:border-r min-w-0">
          {isLoading || !featured ? (
            <div className="space-y-4">
              <div className="h-4 w-40 bg-muted animate-pulse rounded" />
              <div className="h-12 w-full bg-muted animate-pulse rounded" />
              <div className="h-12 w-3/4 bg-muted animate-pulse rounded" />
            </div>
          ) : (
            <Link href={`/updates/${featured.id}`} className="news-link block" data-testid="card-featured-update">
              <img src={imgs[featured.id] || storyImage(featured)} alt="" className="aspect-[16/9] w-full object-cover mb-6 rounded-sm bg-muted" />
              <Kicker u={featured} />
              <h1 className="headline text-3xl md:text-4xl lg:text-5xl leading-[1.08] mt-3">{featured.title}</h1>
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed max-w-3xl">{featured.summary}</p>
              {featured.plainLanguageSummary && (
                <p className="mt-4 border-l-4 border-[hsl(4_72%_44%)] pl-4 text-base leading-relaxed max-w-3xl">
                  <span className="font-semibold">What it means: </span>{featured.plainLanguageSummary}
                </p>
              )}
              <div className="text-sm text-muted-foreground mt-4">{newsDate(featured.publishedDate, { month: "long", day: "numeric", year: "numeric" })}</div>
            </Link>
          )}
        </div>

        <aside className="lg:col-span-4 min-w-0">
          <div className="section-label mb-4">Latest</div>
          <ol className="divide-y">
            {latest.map((u, i) => (
              <li key={u.id} className="py-4 first:pt-0">
                <Link href={`/updates/${u.id}`} className="news-link flex gap-4" data-testid={`card-update-${u.id}`}>
                  <span className="font-serif text-3xl font-bold text-muted-foreground/40 leading-none w-6 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <Kicker u={u} />
                    <h3 className="headline text-lg leading-snug mt-1">{u.title}</h3>
                    <div className="text-xs text-muted-foreground mt-1">{newsDate(u.publishedDate)}</div>
                  </div>
                  <img src={imgs[u.id]} alt="" loading="lazy" className="w-20 h-20 object-cover rounded-sm shrink-0 bg-muted" />
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/updates" className="inline-flex items-center gap-1 text-sm font-semibold mt-2 hover:underline">
            All updates <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </section>

      {/* Browse by agency */}
      <section className="mt-12 border-y py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.14em]">By agency</span>
        {agencies.map((a) => (
          <Link key={a} href={`/updates?agency=${a}`} className="text-sm text-muted-foreground hover:text-foreground">
            {agencyNames[a]}
          </Link>
        ))}
      </section>

      {/* More stories */}
      {more.length > 0 && (
        <section className="mt-10">
          <div className="section-label mb-6">More regulatory news</div>
          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {more.map((u) => (
              <Link key={u.id} href={`/updates/${u.id}`} className="news-link block" data-testid={`card-update-${u.id}`}>
                <img src={imgs[u.id]} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover rounded-sm mb-4 bg-muted" />
                <Kicker u={u} />
                <h3 className="headline text-xl leading-snug mt-2">{u.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">{u.summary}</p>
                <div className="text-xs text-muted-foreground mt-3">{newsDate(u.publishedDate)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Providers + newsletter */}
      <section className="mt-14 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 min-w-0">
          <div className="section-label mb-2">Education providers</div>
          <p className="text-sm text-muted-foreground mb-4">DOT and non-DOT education providers listed on The SAP Insider.</p>
          <ol className="divide-y border-b">
            {(topProviders || []).map((p, i) => (
              <li key={p.id}>
                <Link href={`/reviews/${p.id}`} className="news-link flex items-center gap-4 py-4" data-testid={`card-provider-${p.id}`}>
                  <span className="font-serif text-2xl font-bold w-8 text-muted-foreground/50">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="headline text-lg">{p.name}</div>
                    <div className="text-sm text-muted-foreground truncate">{p.description}</div>
                  </div>
                  <div className="text-right shrink-0">
                    {p.reviewCount ? (
                      <>
                        <div className="flex gap-0.5 justify-end">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className={`h-3.5 w-3.5 ${s < p.rating ? "fill-foreground text-foreground" : "text-muted-foreground/30"}`} />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{p.reviewCount} reviews</div>
                      </>
                    ) : (
                      <div className="text-xs text-muted-foreground">No reviews yet</div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/reviews" className="inline-flex items-center gap-1 text-sm font-semibold mt-3 hover:underline">
            All providers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <aside className="lg:col-span-4 min-w-0">
          <div className="bg-foreground text-background p-6 rounded-sm">
            <div className="font-serif text-2xl font-bold leading-tight">The weekly briefing</div>
            <p className="text-sm opacity-80 mt-2">The week's DOT compliance updates, in plain language. Free.</p>
            <form
              className="mt-4 space-y-2"
              onSubmit={(e) => { e.preventDefault(); if (email) subscribe.mutate({ email, frequency: "weekly" }); }}
            >
              <Input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="bg-background text-foreground border-0" data-testid="input-newsletter-email" />
              <Button type="submit" className="w-full bg-[hsl(4_72%_44%)] hover:bg-[hsl(4_72%_38%)] text-white border-0" disabled={subscribe.isPending} data-testid="button-subscribe">
                {subscribe.isPending ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
          </div>

          {featuredOrgs.length > 0 && (
            <div className="mt-8">
              <div className="section-label mb-3">Organizations</div>
              <ul className="divide-y">
                {featuredOrgs.map((o) => (
                  <li key={o.id} className="py-3">
                    <a href={o.website} target="_blank" rel="noopener noreferrer" className="news-link flex items-start justify-between gap-3">
                      <span className="headline text-base leading-snug">{o.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 mt-1 text-muted-foreground shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
