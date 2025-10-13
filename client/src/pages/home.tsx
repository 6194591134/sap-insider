import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Clock, TrendingUp, AlertCircle, Star, CheckCircle, Award, Building2, ExternalLink } from "lucide-react";
import type { RegulatoryUpdate, Provider } from "@shared/schema";

export default function Home() {
  const { data: featuredUpdate, isLoading: updatesLoading } = useQuery<RegulatoryUpdate>({
    queryKey: ["/api/updates/featured"],
  });

  const { data: latestUpdates } = useQuery<RegulatoryUpdate[]>({
    queryKey: ["/api/updates?limit=6"],
  });

  const { data: topProviders } = useQuery<Provider[]>({
    queryKey: ["/api/providers/top?limit=6"],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Emphasizing Provider Rankings & DOT Focus */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-8 w-8 text-primary" />
              <Badge variant="default" className="text-sm">Trusted by DOT Compliance Professionals</Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Independent Rankings & Reviews for DOT Substance Abuse Education Providers
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the best SAP training, certification courses, and Return-to-Duty resources
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Unbiased provider reviews, industry regulatory updates from FMCSA, FAA, FTA, FRA, PHMSA, USCG, and expert resources for substance abuse professionals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/reviews">
                <Button size="lg" data-testid="button-view-providers" className="hover-elevate">
                  <Star className="mr-2 h-5 w-5" />
                  Browse Top Providers
                </Button>
              </Link>
              <Link href="/updates">
                <Button size="lg" variant="outline" data-testid="button-view-updates" className="hover-elevate">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Latest DOT Updates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Featured Top Providers Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Top-Rated DOT Education Providers</h2>
              <p className="text-muted-foreground mt-1">Independently reviewed and ranked by compliance professionals</p>
            </div>
            <Link href="/reviews">
              <Button variant="outline" data-testid="button-see-all-providers" className="hover-elevate">
                See All Providers
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProviders?.slice(0, 6).map((provider, index) => (
              <Card key={provider.id} className="hover-elevate" data-testid={`card-provider-${provider.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                      #{index + 1}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < provider.rating
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {provider.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  <Link href={`/reviews/${provider.id}`} data-testid={`link-provider-${provider.id}`}>
                    <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                      {provider.name}
                    </CardTitle>
                  </Link>
                  <CardDescription className="line-clamp-2">
                    {provider.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {provider.dotCompliant && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        DOT Compliant
                      </Badge>
                    )}
                    {provider.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <Link href={`/reviews/${provider.id}`}>
                    <Button size="sm" variant="outline" className="w-full" data-testid={`button-view-provider-${provider.id}`}>
                      View Details & Reviews
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Industry News & Updates Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Industry News & Regulatory Updates</h2>
              <p className="text-muted-foreground mt-1">From American Substance Abuse Professionals, The SAP List, DOT agencies, and industry publications</p>
            </div>
            <Link href="/updates">
              <Button variant="outline" data-testid="button-view-all-updates" className="hover-elevate">
                View All Updates
                <TrendingUp className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Featured Update */}
          {updatesLoading ? (
            <Card className="hover-elevate mb-6">
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
            <Card className="border-2 border-primary hover-elevate mb-6" data-testid="card-featured-update">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="default" data-testid="badge-featured">Featured Update</Badge>
                  <Badge variant="outline" data-testid={`badge-agency-${featuredUpdate.agency}`}>
                    <Building2 className="mr-1 h-3 w-3" />
                    {featuredUpdate.agency}
                  </Badge>
                  <Badge variant="outline">{featuredUpdate.category}</Badge>
                </div>
                <CardTitle className="text-2xl lg:text-3xl">
                  {featuredUpdate.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(featuredUpdate.publishedDate).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base text-foreground leading-relaxed">
                  {featuredUpdate.summary}
                </p>
                {featuredUpdate.plainLanguageSummary && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Plain Language Summary:</strong> {featuredUpdate.plainLanguageSummary}
                    </p>
                  </div>
                )}
                <Link href={`/updates/${featuredUpdate.id}`}>
                  <Button variant="outline" data-testid="button-read-featured">
                    Read Full Update
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : null}

          {/* Latest Updates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestUpdates?.slice(0, 6).map((update) => (
              <Card key={update.id} className="hover-elevate" data-testid={`card-update-${update.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge variant="outline" data-testid={`badge-${update.agency}`}>
                      {update.agency}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(update.publishedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <Link href={`/updates/${update.id}`} data-testid={`link-update-${update.id}`}>
                    <CardTitle className="text-base hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {update.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {update.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sources & Resources Section */}
        <section className="bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Trusted Industry Sources</h2>
          <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
            We aggregate regulatory updates and news from leading DOT agencies, professional organizations, and industry publications
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">DOT Agencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• FMCSA (Trucking)</p>
                  <p>• FAA (Aviation)</p>
                  <p>• FTA (Transit)</p>
                  <p>• FRA (Railroad)</p>
                  <p>• PHMSA (Pipeline)</p>
                  <p>• USCG (Maritime)</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Professional Orgs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• American Substance Abuse Professionals</p>
                  <p>• The SAP List</p>
                  <p>• EAP Associations</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Industry Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• Long Haul Trucker</p>
                  <p>• Aviation Week</p>
                  <p>• Fleet Owner</p>
                  <p>• Transport Topics</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/resources">
                  <Button size="sm" variant="outline" className="w-full mb-2" data-testid="button-templates-guides">
                    Templates & Guides
                  </Button>
                </Link>
                <Link href="/rtd">
                  <Button size="sm" variant="outline" className="w-full" data-testid="button-rtd-guide">
                    RTD Process Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
