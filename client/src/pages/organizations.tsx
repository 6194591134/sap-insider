import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Users, Calendar, Award, Building } from "lucide-react";
import type { Organization } from "@shared/schema";

export default function Organizations() {
  const { data: organizations, isLoading } = useQuery<Organization[]>({
    queryKey: ["/api/organizations"],
  });

  const featuredOrgs = organizations?.filter(org => org.featured);
  const otherOrgs = organizations?.filter(org => !org.featured);

  return (
    <div>
      <PageHeader kicker="Industry partners" title="SAP Organizations & Partners" intro="Professional organizations supporting substance abuse professionals and compliance officers" />

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <Card key={i} className="h-64">
                <CardHeader className="space-y-3">
                  <div className="h-16 w-16 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Organizations */}
            {featuredOrgs && featuredOrgs.length > 0 && (
              <div className="space-y-6">
                <h2 className="headline text-3xl">Featured Organizations</h2>
                <div className="space-y-6">
                  {featuredOrgs.map((org) => (
                    <Card key={org.id} className="border hover-elevate" data-testid={`card-org-${org.id}`}>
                      <CardHeader className="space-y-4">
                        <div className="flex items-start gap-6">
                          <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground flex-shrink-0">
                            {org.name.charAt(0)}
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <CardTitle className="text-2xl">{org.name}</CardTitle>
                              <Badge variant="default" data-testid={`badge-featured-${org.id}`}>Featured</Badge>
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed">
                              {org.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {org.stats && (
                          <div className="grid sm:grid-cols-3 gap-4">
                            {org.stats.members && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">{org.stats.members}</p>
                                  <p className="text-xs text-muted-foreground">Members</p>
                                </div>
                              </div>
                            )}
                            {org.stats.established && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">{org.stats.established}</p>
                                  <p className="text-xs text-muted-foreground">Established</p>
                                </div>
                              </div>
                            )}
                            {org.stats.certifications && (
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">{org.stats.certifications}</p>
                                  <p className="text-xs text-muted-foreground">Certifications</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`link-org-website-${org.id}`}
                        >
                          <Button variant="outline" className="hover-elevate">
                            Visit Website
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other Organizations */}
            {otherOrgs && otherOrgs.length > 0 && (
              <div className="space-y-6">
                <h2 className="headline text-3xl">Additional Organizations</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {otherOrgs.map((org) => (
                    <Card key={org.id} className="hover-elevate flex flex-col" data-testid={`card-org-${org.id}`}>
                      <CardHeader className="space-y-3 pb-4">
                        <div className="flex items-start gap-4">
                          <div className="h-16 w-16 rounded bg-muted flex items-center justify-center text-xl font-semibold text-muted-foreground flex-shrink-0">
                            {org.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg leading-tight">{org.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground line-clamp-4 flex-1">
                          {org.description}
                        </p>
                        {org.stats && (
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            {org.stats.members && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {org.stats.members}
                              </span>
                            )}
                            {org.stats.established && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Est. {org.stats.established}
                              </span>
                            )}
                          </div>
                        )}
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`link-org-website-${org.id}`}
                        >
                          <Button variant="outline" size="sm" className="w-full hover-elevate">
                            Visit Website
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {!isLoading && (!organizations || organizations.length === 0) && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No organizations listed yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
