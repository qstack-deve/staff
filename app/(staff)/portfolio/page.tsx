"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Pin, Loader2, FolderKanban } from "lucide-react";
import { useGetPortfolios } from "@/lib/hooks/portfolio.hook";
import { PortfolioItem } from "@/lib/types/portfolio.types";

const statusColors: Record<string, string> = {
  development: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  live: "bg-green-500/10 text-green-600 border-green-500/20",
  archived: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
      {item.is_pinned && (
        <div className="absolute top-3 right-3 z-10">
          <Pin className="h-4 w-4 text-primary fill-primary" />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {item.description}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant="outline"
            className={statusColors[item.status] || statusColors.development}
          >
            {item.status}
          </Badge>
          <Badge variant="secondary">{item.category.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <Badge key={tag.id} variant="outline" className="text-xs">
              {tag.name}
            </Badge>
          ))}
        </div>
        {item.client && (
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-medium">Client:</span> {item.client}
          </p>
        )}
        {item.long_description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {item.long_description}
          </p>
        )}
        {item.url && (
          <div className="mt-4 pt-4 border-t">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              View Project
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function StaffPortfolioPage() {
  const { data: portfolios, isLoading } = useGetPortfolios();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-muted-foreground mt-2">
          View our portfolio of projects and case studies.
        </p>
      </div>

      {/* Portfolio Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !portfolios || portfolios.length === 0 ? (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <FolderKanban className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No portfolio items yet</h3>
            <p className="text-muted-foreground mt-1">
              Check back later for our project showcase.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((item: PortfolioItem) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
