import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, Building2 } from "lucide-react";
import type { RegulatoryUpdate } from "@shared/schema";

export default function UpdateDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: update, isLoading, error } = useQuery<RegulatoryUpdate>({
    queryKey: ["/api/updates", id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
            <div className="h-12 w-3/4 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Card>
            <CardContent className="py-8 space-y-4">
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4/5 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !update) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Update not found</p>
              <Link href="/updates">
                <Button variant="outline" data-testid="button-back-to-updates">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Updates
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <Link href="/updates">
            <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Updates
            </Button>
          </Link>
          
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <Badge variant="default" data-testid={`badge-agency-${update.agency}`}>
              <Building2 className="mr-1 h-3 w-3" />
              {update.agency}
            </Badge>
            <Badge variant="outline">{update.category}</Badge>
            {update.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold" data-testid="text-update-title">
            {update.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Published: {new Date(update.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed" data-testid="text-update-summary">
                {update.summary}
              </p>
            </CardContent>
          </Card>

          {update.plainLanguageSummary && (
            <Card className="mb-6 border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Plain Language Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed" data-testid="text-plain-summary">
                  {update.plainLanguageSummary}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Full Update</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none"
                data-testid="text-update-content"
              >
                {update.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
