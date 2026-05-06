'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Design {
  id: string;
  galleryId: number;
  styleNo: string;
  buyer: string;
  designer: string | null;
  season: string | null;
  status: string;
  imageUrl: string | null;
}

interface DesignGalleryGridProps {
  designs: Design[];
}

export function DesignGalleryGrid({ designs }: DesignGalleryGridProps) {
  if (designs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No designs found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {designs.map((design) => (
        <div key={design.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            {design.imageUrl ? (
              <img src={design.imageUrl} alt={design.styleNo} className="w-full h-full object-cover" />
            ) : (
              <div className="text-slate-400">No image</div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-2">{design.styleNo}</h3>
            <p className="text-xs text-muted-foreground mb-2">{design.buyer}</p>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {design.season}
              </Badge>
              <Badge
                variant={
                  design.status === 'Designing'
                    ? 'secondary'
                    : design.status === 'Production'
                      ? 'default'
                      : 'outline'
                }
                className="text-xs"
              >
                {design.status}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3">
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
