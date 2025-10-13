import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Star, CheckCircle, Search, Filter } from "lucide-react";
import type { Provider } from "@shared/schema";

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDOT, setFilterDOT] = useState(false);
  const [filterNonDOT, setFilterNonDOT] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);

  const { data: providers, isLoading } = useQuery<Provider[]>({
    queryKey: ["/api/providers"],
  });

  const filteredProviders = providers?.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDOT = !filterDOT || provider.dotCompliant;
    const matchesNonDOT = !filterNonDOT || provider.nonDotCompliant;
    const matchesVerified = !filterVerified || provider.verified;
    return matchesSearch && matchesDOT && matchesNonDOT && matchesVerified;
  });

  const hasActiveFilters = filterDOT || filterNonDOT || filterVerified;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold">Provider Reviews</h1>
          <p className="text-muted-foreground mt-2">
            Independent ratings and reviews of DOT education providers
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
                      placeholder="Search providers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                      data-testid="input-search-providers"
                    />
                  </div>
                </div>

                {/* Compliance Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Compliance Type</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dot"
                        checked={filterDOT}
                        onCheckedChange={(checked) => setFilterDOT(checked as boolean)}
                        data-testid="checkbox-filter-dot"
                      />
                      <label htmlFor="dot" className="text-sm cursor-pointer">
                        DOT Compliant
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="non-dot"
                        checked={filterNonDOT}
                        onCheckedChange={(checked) => setFilterNonDOT(checked as boolean)}
                        data-testid="checkbox-filter-non-dot"
                      />
                      <label htmlFor="non-dot" className="text-sm cursor-pointer">
                        Non-DOT
                      </label>
                    </div>
                  </div>
                </div>

                {/* Verification */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={filterVerified}
                      onCheckedChange={(checked) => setFilterVerified(checked as boolean)}
                      data-testid="checkbox-filter-verified"
                    />
                    <label htmlFor="verified" className="text-sm cursor-pointer">
                      DOT Verified Only
                    </label>
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilterDOT(false);
                      setFilterNonDOT(false);
                      setFilterVerified(false);
                    }}
                    className="w-full hover-elevate"
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Provider Cards Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredProviders?.length || 0} providers found
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-64">
                    <CardHeader className="space-y-3">
                      <div className="h-12 w-12 bg-muted animate-pulse rounded" />
                      <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : filteredProviders && filteredProviders.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((provider) => (
                  <Card key={provider.id} className="hover-elevate flex flex-col" data-testid={`card-provider-${provider.id}`}>
                    <CardHeader className="space-y-3 pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="h-16 w-16 rounded bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground flex-shrink-0">
                          {provider.name.charAt(0)}
                        </div>
                        {provider.verified && (
                          <Badge variant="default" className="bg-accent text-accent-foreground flex items-center gap-1" data-testid={`badge-verified-${provider.id}`}>
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{provider.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < provider.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{provider.rating}.0</span>
                          <span className="text-xs text-muted-foreground">
                            ({provider.reviewCount})
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {provider.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {provider.dotCompliant && (
                          <Badge variant="outline" className="text-xs">DOT</Badge>
                        )}
                        {provider.nonDotCompliant && (
                          <Badge variant="outline" className="text-xs">Non-DOT</Badge>
                        )}
                      </div>
                      <Link href={`/reviews/${provider.id}`}>
                        <Button variant="outline" className="w-full hover-elevate" data-testid={`button-view-provider-${provider.id}`}>
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No providers found matching your criteria</p>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilterDOT(false);
                        setFilterNonDOT(false);
                        setFilterVerified(false);
                      }}
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
