import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Heart } from "lucide-react";
import { Link } from "wouter";
import type { Favorite, Provider, Resource } from "@shared/schema";

export default function Favorites() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: favorites, isLoading } = useQuery<Favorite[]>({
    queryKey: ["/api/favorites"],
    enabled: isAuthenticated,
  });

  const { data: providers } = useQuery<Provider[]>({
    queryKey: ["/api/providers"],
  });

  const { data: resources } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  const favoriteProviders = favorites
    ?.filter((f) => f.itemType === "provider")
    .map((f) => providers?.find((p) => p.id === f.itemId))
    .filter(Boolean) as Provider[];

  const favoriteResources = favorites
    ?.filter((f) => f.itemType === "resource")
    .map((f) => resources?.find((r) => r.id === f.itemId))
    .filter(Boolean) as Resource[];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h1 className="text-3xl font-bold">My Favorites</h1>
          </div>
          <p className="text-muted-foreground">
            Providers and resources you've saved for quick access
          </p>
        </div>

        <div className="space-y-8">
          {/* Favorite Providers */}
          <div>
            <h2 className="headline text-3xl mb-4">Saved Providers</h2>
            {favoriteProviders && favoriteProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteProviders.map((provider) => (
                  <Card key={provider.id} data-testid={`card-provider-${provider.id}`} className="hover-elevate">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="flex items-center">
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
                              ({provider.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {provider.description}
                      </p>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {provider.dotCompliant && (
                          <Badge variant="secondary">DOT Compliant</Badge>
                        )}
                        {provider.verified && <Badge variant="secondary">Verified</Badge>}
                      </div>
                      <Link href={`/reviews/${provider.id}`}>
                        <Button size="sm" className="w-full" data-testid={`button-view-${provider.id}`}>
                          View Details
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No saved providers yet. Visit the{" "}
                  <Link href="/reviews">
                    <Button variant="link" className="px-1">
                      Provider Reviews
                    </Button>
                  </Link>{" "}
                  page to save your favorites.
                </CardContent>
              </Card>
            )}
          </div>

          {/* Favorite Resources */}
          <div>
            <h2 className="headline text-3xl mb-4">Saved Resources</h2>
            {favoriteResources && favoriteResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteResources.map((resource) => (
                  <Card key={resource.id} data-testid={`card-resource-${resource.id}`} className="hover-elevate">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <CardDescription>{resource.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      {resource.downloadUrl && (
                        <Button size="sm" variant="secondary" className="w-full" asChild>
                          <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
                            Access Resource
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No saved resources yet. Visit the{" "}
                  <Link href="/resources">
                    <Button variant="link" className="px-1">
                      Resources
                    </Button>
                  </Link>{" "}
                  page to save your favorites.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
