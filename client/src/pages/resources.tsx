import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Download, Search, FileText, Video, BookOpen, ClipboardList, Clock, User, Library } from "lucide-react";
import type { Resource } from "@shared/schema";
import sectionResourcesImg from "@/assets/images/section-resources.png";

const resourceIcons = {
  template: FileText,
  webinar: Video,
  guide: BookOpen,
  checklist: ClipboardList,
};

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const filteredResources = resources?.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const resourceTypes = Array.from(new Set(resources?.map(r => r.type) || []));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b relative overflow-hidden">
        <img src={sectionResourcesImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="container mx-auto px-4 lg:px-8 py-12 relative">
          <div className="flex items-center gap-3 mb-2">
            <Library className="h-6 w-6 text-primary" />
            <Badge variant="outline">Professional Tools</Badge>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">Resources Hub</h1>
          <p className="text-muted-foreground mt-2">
            Templates, webinars, guides, and tools for DOT compliance professionals
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-resources"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
              className="hover-elevate"
              data-testid="button-filter-all"
            >
              All
            </Button>
            {resourceTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="hover-elevate capitalize"
                data-testid={`button-filter-${type}`}
              >
                {type}s
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-48">
                <CardHeader className="space-y-3">
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredResources && filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = resourceIcons[resource.type as keyof typeof resourceIcons] || FileText;
              return (
                <Card key={resource.id} className="hover-elevate flex flex-col" data-testid={`card-resource-${resource.id}`}>
                  <CardHeader className="space-y-3 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="capitalize">{resource.type}</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                      {resource.description}
                    </p>
                    {resource.type === 'webinar' && (resource.duration || resource.speaker) && (
                      <div className="space-y-1">
                        {resource.duration && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{resource.duration}</span>
                          </div>
                        )}
                        {resource.speaker && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{resource.speaker}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      className="w-full hover-elevate"
                      data-testid={`button-download-${resource.id}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {resource.type === 'webinar' ? 'Watch' : 'Download'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No resources found matching your criteria</p>
              {(searchQuery || selectedType) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType(null);
                  }}
                  className="mt-4 hover-elevate"
                  data-testid="button-clear-search"
                >
                  Clear Search
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Categories Overview */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-elevate">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Referral forms, compliance checklists, and documentation templates
              </p>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader>
              <Video className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base">Webinars</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Recorded sessions with industry experts and compliance training
              </p>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base">Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Step-by-step guides for SAP evaluations and compliance procedures
              </p>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader>
              <ClipboardList className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base">Checklists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compliance checklists and process verification tools
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
