import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearch, useLocation } from "wouter";
import { Search } from "lucide-react";
import { newsDate, agencyNames, storyImages } from "@/lib/news";
import type { RegulatoryUpdate } from "@shared/schema";

const agencies = ["DOT", "FMCSA", "FAA", "FTA", "FRA", "PHMSA", "USCG"];

export default function Updates() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const agency = new URLSearchParams(search).get("agency") || "";
  const [query, setQuery] = useState("");

  const { data: updates, isLoading } = useQuery<RegulatoryUpdate[]>({ queryKey: ["/api/updates"] });

  const q = query.toLowerCase();
  const filtered = (updates || []).filter(
    (u) =>
      (!agency || u.agency === agency) &&
      (!q || u.title.toLowerCase().includes(q) || u.summary.toLowerCase().includes(q) || u.category.toLowerCase().includes(q)),
  );
  const imgs = storyImages(updates || []);

  const setAgency = (a: string) => navigate(a ? `/updates?agency=${a}` : "/updates");

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-foreground/90 pb-4">
        <div>
          <div className="kicker">Regulatory news</div>
          <h1 className="headline text-4xl lg:text-5xl mt-2">{agency ? agencyNames[agency] : "All Updates"}</h1>
          <p className="text-muted-foreground mt-2">Notices, rules and guidance from DOT and its agencies, with links to the official source.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search updates" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" data-testid="input-search-updates" />
        </div>
      </div>

      {/* Agency tabs */}
      <div className="flex gap-1 overflow-x-auto border-b py-2 -mx-1">
        {["", ...agencies].map((a) => (
          <button
            key={a || "all"}
            onClick={() => setAgency(a)}
            className={`px-3 py-1.5 text-sm font-semibold whitespace-nowrap rounded-sm ${
              agency === a ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
            data-testid={`filter-agency-${a || "all"}`}
          >
            {a || "All"}
          </button>
        ))}
      </div>

      <div className="max-w-4xl">
        {isLoading ? (
          <div className="space-y-6 mt-6">
            {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-muted animate-pulse rounded-sm" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No updates match.{" "}
            <button className="underline" onClick={() => { setQuery(""); setAgency(""); }}>Show all updates</button>
          </div>
        ) : (
          <ul className="divide-y">
            {filtered.map((u) => (
              <li key={u.id}>
                <Link href={`/updates/${u.id}`} className="news-link flex gap-5 py-6" data-testid={`card-update-${u.id}`}>
                  <img src={imgs[u.id]} alt="" loading="lazy" className="w-28 h-24 sm:w-56 sm:h-36 object-cover rounded-sm shrink-0 bg-muted" />
                  <div className="min-w-0">
                    <div className="kicker">
                      {u.agency} <span className="text-muted-foreground font-semibold">· {u.category}</span>
                    </div>
                    <h2 className="headline text-lg sm:text-2xl leading-snug mt-1">{u.title}</h2>
                    <p className="hidden sm:block text-muted-foreground mt-2 leading-relaxed line-clamp-2">{u.summary}</p>
                    <div className="text-xs text-muted-foreground mt-2">{newsDate(u.publishedDate)}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
