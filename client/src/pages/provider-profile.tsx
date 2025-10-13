import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Star, CheckCircle, ExternalLink, Mail, Phone, Globe } from "lucide-react";
import type { Provider, Review } from "@shared/schema";

export default function ProviderProfile() {
  const [, params] = useRoute("/reviews/:id");
  const providerId = params?.id;

  const { data: provider, isLoading: providerLoading } = useQuery<Provider>({
    queryKey: [`/api/providers/${providerId}`],
    enabled: !!providerId,
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: [`/api/reviews/${providerId}`],
    enabled: !!providerId,
  });

  if (providerLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Card>
            <CardHeader className="space-y-4">
              <div className="h-20 w-20 bg-muted animate-pulse rounded" />
              <div className="h-8 w-64 bg-muted animate-pulse rounded" />
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (!provider || Array.isArray(provider)) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Provider not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const avgCriteria = reviews?.length
    ? {
        courseQuality: (reviews.reduce((sum, r) => sum + r.courseQuality, 0) / reviews.length).toFixed(1),
        reportingTools: (reviews.reduce((sum, r) => sum + r.reportingTools, 0) / reviews.length).toFixed(1),
        communication: (reviews.reduce((sum, r) => sum + r.communication, 0) / reviews.length).toFixed(1),
        sapSupport: (reviews.reduce((sum, r) => sum + r.sapSupport, 0) / reviews.length).toFixed(1),
      }
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center text-3xl font-semibold text-muted-foreground">
              {provider.name.charAt(0)}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-3xl font-bold">{provider.name}</h1>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < provider.rating
                              ? "fill-accent text-accent"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{provider.rating}.0</span>
                    <span className="text-muted-foreground">
                      ({provider.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                {provider.verified && (
                  <Badge variant="default" className="bg-accent text-accent-foreground flex items-center gap-1" data-testid="badge-verified">
                    <CheckCircle className="h-4 w-4" />
                    DOT Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList data-testid="tabs-provider">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{provider.description}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {provider.dotCompliant && (
                    <Badge variant="outline" className="mr-2">DOT Compliant</Badge>
                  )}
                  {provider.nonDotCompliant && (
                    <Badge variant="outline">Non-DOT</Badge>
                  )}
                </CardContent>
              </Card>

              {provider.features && provider.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {provider.languages && provider.languages.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Languages Supported</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.languages.map((language, index) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {avgCriteria && (
              <Card>
                <CardHeader>
                  <CardTitle>Rating Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Course Quality</span>
                        <span className="text-sm font-medium">{avgCriteria.courseQuality}/5</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${(parseFloat(avgCriteria.courseQuality) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Reporting Tools</span>
                        <span className="text-sm font-medium">{avgCriteria.reportingTools}/5</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${(parseFloat(avgCriteria.reportingTools) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Communication</span>
                        <span className="text-sm font-medium">{avgCriteria.communication}/5</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${(parseFloat(avgCriteria.communication) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">SAP Support</span>
                        <span className="text-sm font-medium">{avgCriteria.sapSupport}/5</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${(parseFloat(avgCriteria.sapSupport) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {reviewsLoading ? (
              <Card>
                <CardContent className="py-8">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            ) : reviews && Array.isArray(reviews) && reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id} data-testid={`card-review-${review.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{review.rating}.0</span>
                        </div>
                        {review.reviewerName && (
                          <p className="text-sm text-muted-foreground">{review.reviewerName}</p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  {review.comment && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No reviews yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {provider.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                      data-testid="link-website"
                    >
                      {provider.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
                {provider.contactEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a
                      href={`mailto:${provider.contactEmail}`}
                      className="text-primary hover:underline"
                      data-testid="link-email"
                    >
                      {provider.contactEmail}
                    </a>
                  </div>
                )}
                {provider.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a
                      href={`tel:${provider.contactPhone}`}
                      className="text-primary hover:underline"
                      data-testid="link-phone"
                    >
                      {provider.contactPhone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
