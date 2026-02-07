import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Clock, Search, Filter, ChevronDown, ChevronUp, Newspaper } from "lucide-react";
import type { RegulatoryUpdate } from "@shared/schema";
import sectionUpdatesImg from "@/assets/images/section-updates.png";

const agencies = ["DOT", "FMCSA", "PHMSA", "FAA", "FTA", "FRA", "USCG"];

export default function Updates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: updates, isLoading } = useQuery<RegulatoryUpdate[]>({
    queryKey: ["/api/updates"],
  });

  const toggleAgency = (agency: string) => {
    setSelectedAgencies((prev) =>
      prev.includes(agency)
        ? prev.filter((a) => a !== agency)
        : [...prev, agency]
    );
  };

  const filteredUpdates = updates?.filter((update) => {
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = selectedAgencies.length === 0 || selectedAgencies.includes(update.agency);
    return matchesSearch && matchesAgency;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b relative overflow-hidden">
        <img src={sectionUpdatesImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="container mx-auto px-4 lg:px-8 py-12 relative">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <Badge variant="outline">All Agencies</Badge>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">Regulatory Updates</h1>
          <p className="text-muted-foreground mt-2">
            Stay current with the latest DOT compliance changes and notices
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search updates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                      data-testid="input-search-updates"
                    />
                  </div>
                </div>

                {/* Agency Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Agency</label>
                  <div className="space-y-2">
                    {agencies.map((agency) => (
                      <div key={agency} className="flex items-center space-x-2">
                        <Checkbox
                          id={agency}
                          checked={selectedAgencies.includes(agency)}
                          onCheckedChange={() => toggleAgency(agency)}
                          data-testid={`checkbox-agency-${agency}`}
                        />
                        <label
                          htmlFor={agency}
                          className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {agency}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedAgencies.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAgencies([])}
                    className="w-full hover-elevate"
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Updates Feed */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredUpdates?.length || 0} updates found
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="space-y-3">
                      <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                      <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredUpdates && filteredUpdates.length > 0 ? (
              <div className="space-y-4">
                {filteredUpdates.map((update) => (
                  <Card
                    key={update.id}
                    className="border-2 border-primary hover-elevate"
                    data-testid={`card-update-${update.id}`}
                  >
                    <CardHeader className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="default" data-testid={`badge-agency-${update.agency}`}>
                          {update.agency}
                        </Badge>
                        <Badge variant="outline">{update.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(update.publishedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{update.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {update.summary}
                      </p>
                      
                      {update.plainLanguageSummary && (
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedId(expandedId === update.id ? null : update.id)}
                            className="hover-elevate"
                            data-testid={`button-toggle-plain-${update.id}`}
                          >
                            {expandedId === update.id ? (
                              <>
                                <ChevronUp className="mr-2 h-4 w-4" />
                                Hide Plain Language Summary
                              </>
                            ) : (
                              <>
                                <ChevronDown className="mr-2 h-4 w-4" />
                                View Plain Language Summary
                              </>
                            )}
                          </Button>
                          {expandedId === update.id && (
                            <div className="bg-muted/50 p-4 rounded-md">
                              <p className="text-sm text-foreground leading-relaxed">
                                {update.plainLanguageSummary}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <Link href={`/updates/${update.id}`}>
                        <Button variant="outline" size="sm" className="hover-elevate" data-testid={`button-read-update-${update.id}`}>
                          Read Full Update
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No updates found matching your criteria</p>
                  {selectedAgencies.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedAgencies([])}
                      className="mt-4 hover-elevate"
                      data-testid="button-clear-all-filters"
                    >
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
