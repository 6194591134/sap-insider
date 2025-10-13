import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Clock, TrendingUp, AlertCircle, Star, CheckCircle } from "lucide-react";
import type { RegulatoryUpdate, Provider } from "@shared/schema";

export default function Home() {
  const { data: featuredUpdate, isLoading: updatesLoading } = useQuery<RegulatoryUpdate>({
    queryKey: ["/api/updates/featured"],
  });

  const { data: latestUpdates } = useQuery<RegulatoryUpdate[]>({
    queryKey: ["/api/updates?limit=5"],
  });

  const { data: topProviders } = useQuery<Provider[]>({
    queryKey: ["/api/providers/top?limit=3"],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Your Inside Source for DOT Compliance
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay informed. Stay compliant. Stay connected.
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Trusted regulatory updates, education resources, and independent provider reviews for substance abuse professionals and DOT compliance officers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/updates">
                <Button size="lg" data-testid="button-view-updates" className="hover-elevate">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Latest Updates
                </Button>
              </Link>
              <Link href="/reviews">
                <Button size="lg" variant="outline" data-testid="button-view-reviews" className="hover-elevate">
                  <Star className="mr-2 h-5 w-5" />
                  Provider Reviews
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            {updatesLoading ? (
              <Card className="hover-elevate">
                <CardHeader className="space-y-4">
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                  </div>
                </CardContent>
              </Card>
            ) : featuredUpdate ? (
              <Card className="border-l-4 border-l-primary hover-elevate" data-testid="card-featured-update">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" data-testid="badge-featured">Featured Update</Badge>
                    <Badge variant="outline" data-testid={`badge-agency-${featuredUpdate.agency}`}>{featuredUpdate.agency}</Badge>
                  </div>
                  <CardTitle className="text-2xl lg:text-3xl">
                    {featuredUpdate.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(featuredUpdate.publishedDate).toLocaleDateString()}
                    </span>
                    <span>{featuredUpdate.category}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base text-foreground leading-relaxed">
                    {featuredUpdate.summary}
                  </p>
                  <Link href={`/updates/${featuredUpdate.id}`}>
                    <Button variant="outline" data-testid="button-read-featured">
                      Read Full Update
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-l-4 border-l-muted">
                <CardHeader>
                  <CardTitle>No Featured Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Check back soon for the latest regulatory updates.</p>
                </CardContent>
              </Card>
            )}

            {/* Latest Updates Feed */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Latest Updates</h2>
                <Link href="/updates">
                  <Button variant="ghost" size="sm" data-testid="button-view-all-updates" className="hover-elevate">
                    View All
                    <TrendingUp className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {latestUpdates?.map((update) => (
                  <Card key={update.id} className="hover-elevate" data-testid={`card-update-${update.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" data-testid={`badge-${update.agency}`}>{update.agency}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(update.publishedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <CardTitle className="text-lg">
                            <Link href={`/updates/${update.id}`}>
                              <span className="hover:text-primary transition-colors cursor-pointer">
                                {update.title}
                              </span>
                            </Link>
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {update.summary}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-8">
            {/* Top Providers */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Top Providers</h2>
              <div className="space-y-3">
                {topProviders?.map((provider) => (
                  <Card key={provider.id} className="hover-elevate" data-testid={`card-provider-${provider.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-lg font-semibold text-muted-foreground">
                          {provider.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/reviews/${provider.id}`}>
                            <CardTitle className="text-base hover:text-primary transition-colors cursor-pointer truncate">
                              {provider.name}
                            </CardTitle>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                              <span className="text-sm font-medium">{provider.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ({provider.reviewCount} reviews)
                            </span>
                          </div>
                          {provider.verified && (
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle className="h-3.5 w-3.5 text-accent" />
                              <span className="text-xs text-accent">DOT Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              <Link href="/reviews">
                <Button variant="outline" className="w-full hover-elevate" data-testid="button-view-all-providers">
                  View All Providers
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/rtd">
                  <Button variant="ghost" className="w-full justify-start hover-elevate" data-testid="link-rtd-guide">
                    RTD Process Guide
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button variant="ghost" className="w-full justify-start hover-elevate" data-testid="link-resources">
                    Compliance Resources
                  </Button>
                </Link>
                <Link href="/organizations">
                  <Button variant="ghost" className="w-full justify-start hover-elevate" data-testid="link-organizations">
                    SAP Organizations
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
