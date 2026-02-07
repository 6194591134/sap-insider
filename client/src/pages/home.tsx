import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Clock, TrendingUp, AlertCircle, Star, CheckCircle, Award, Building2, ExternalLink, Mail, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { RegulatoryUpdate, Provider, Organization } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [frequency, setFrequency] = useState("weekly");

  const { data: featuredUpdate, isLoading: updatesLoading } = useQuery<RegulatoryUpdate>({
    queryKey: ["/api/updates/featured"],
  });

  const { data: latestUpdates } = useQuery<RegulatoryUpdate[]>({
    queryKey: ["/api/updates?limit=6"],
  });

  const { data: topProviders } = useQuery<Provider[]>({
    queryKey: ["/api/providers/top?limit=6"],
  });

  const { data: allOrganizations } = useQuery<Organization[]>({
    queryKey: ["/api/organizations"],
  });

  const featuredOrganizations = allOrganizations?.filter(org => org.featured) || [];

  const subscribeMutation = useMutation({
    mutationFn: async (data: { email: string; firstName?: string; frequency: string }) => {
      return await apiRequest("POST", "/api/newsletter/subscribe", data);
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter. Check your inbox for updates.",
      });
      setEmail("");
      setFirstName("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate({ email, firstName: firstName || undefined, frequency });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-8 w-8 text-primary" />
              <Badge variant="default" className="text-sm">Trusted by DOT Compliance Professionals</Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Independent Rankings & Reviews for Substance Abuse Professionals
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the best SAP training, certification courses, and Return-to-Duty resources
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Unbiased provider reviews, industry regulatory updates from FMCSA, FAA, FTA, FRA, PHMSA, USCG, and expert resources for substance abuse professionals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/updates">
                <Button size="lg" data-testid="button-view-updates" className="hover-elevate">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Latest DOT Updates
                </Button>
              </Link>
              <Link href="/reviews">
                <Button size="lg" variant="outline" data-testid="button-view-providers" className="hover-elevate">
                  <Star className="mr-2 h-5 w-5" />
                  Browse Top Providers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Industry News & Updates Section - NOW FIRST */}
        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
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

        {/* Newsletter Signup Section */}
        <section className="mb-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Stay Informed with The SAP Insider Newsletter</CardTitle>
              <CardDescription className="text-base max-w-2xl mx-auto">
                Get regulatory updates, provider news, and industry insights delivered directly to your inbox. Choose daily or weekly delivery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="max-w-xl mx-auto space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newsletter-name">First Name (optional)</Label>
                    <Input
                      id="newsletter-name"
                      type="text"
                      placeholder="Your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      data-testid="input-newsletter-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newsletter-email">Email Address</Label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-newsletter-email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Delivery Frequency</Label>
                  <RadioGroup
                    value={frequency}
                    onValueChange={setFrequency}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" data-testid="radio-daily" />
                      <Label htmlFor="daily" className="cursor-pointer">Daily Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" data-testid="radio-weekly" />
                      <Label htmlFor="weekly" className="cursor-pointer">Weekly Digest</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={subscribeMutation.isPending}
                  data-testid="button-subscribe"
                >
                  {subscribeMutation.isPending ? (
                    "Subscribing..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Subscribe to Newsletter
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Top-Rated Providers Section - NOW SECOND */}
        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
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

        {/* Featured Organizations Section */}
        {featuredOrganizations.length > 0 && (
          <section>
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold" data-testid="text-featured-orgs-heading">Featured Organizations</h2>
                </div>
                <p className="text-muted-foreground">Leading professional organizations in the SAP industry</p>
              </div>
              <Link href="/organizations">
                <Button variant="outline" size="sm" data-testid="button-view-all-organizations">
                  View All Organizations
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {featuredOrganizations.map((org) => (
                <Card key={org.id} className="hover-elevate" data-testid={`card-org-${org.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <CardTitle className="text-lg" data-testid={`text-org-name-${org.id}`}>{org.name}</CardTitle>
                        {org.stats && (
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            {(org.stats as Record<string, string>).established && (
                              <span className="text-xs text-muted-foreground">Est. {(org.stats as Record<string, string>).established}</span>
                            )}
                            {(org.stats as Record<string, string>).members && (
                              <Badge variant="secondary" className="text-xs">{(org.stats as Record<string, string>).members} Members</Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <Badge variant="default" className="text-xs shrink-0">Featured</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4" data-testid={`text-org-desc-${org.id}`}>{org.description}</p>
                    <a href={org.website} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="w-full" data-testid={`button-visit-org-${org.id}`}>
                        Visit Website
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

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
                  <a href="https://www.fmcsa.dot.gov" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-fmcsa">FMCSA (Trucking)</a>
                  <a href="https://www.faa.gov" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-faa">FAA (Aviation)</a>
                  <a href="https://www.transit.dot.gov" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-fta">FTA (Transit)</a>
                  <a href="https://railroads.dot.gov" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-fra">FRA (Railroad)</a>
                  <a href="https://www.phmsa.dot.gov" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-phmsa">PHMSA (Pipeline)</a>
                  <a href="https://www.uscg.mil" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-uscg">USCG (Maritime)</a>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Professional Orgs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <a href="https://go2asap.com" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-asap">American Substance Abuse Professionals</a>
                  <a href="https://www.thesaplist.com" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-saplist">The SAP List</a>
                  <a href="https://www.eapassn.org" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-eapassn">EAP Associations</a>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Industry Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <a href="https://www.longhaultrucker.com" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-longhaultrucker">Long Haul Trucker</a>
                  <a href="https://aviationweek.com" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-aviationweek">Aviation Week</a>
                  <a href="https://www.fleetowner.com" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-fleetowner">Fleet Owner</a>
                  <a href="https://www.ttnews.com" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors" data-testid="link-transporttopics">Transport Topics</a>
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
