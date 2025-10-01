
import React from 'react';

export const RecipeCardSkeleton: React.FC = () => (
  <div className="bg-surface rounded-2xl shadow-md overflow-hidden border border-subtle-border">
    <div className="relative aspect-[4/3] bg-brown/10 animate-pulse"></div>
    <div className="p-5 space-y-4">
      <div className="h-5 w-3/4 bg-brown/10 animate-pulse rounded"></div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-brown/10 animate-pulse rounded"></div>
        <div className="h-3 w-5/6 bg-brown/10 animate-pulse rounded"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-7 w-20 bg-brown/10 animate-pulse rounded-full"></div>
        <div className="h-7 w-20 bg-brown/10 animate-pulse rounded-full"></div>
      </div>
    </div>
  </div>
);
