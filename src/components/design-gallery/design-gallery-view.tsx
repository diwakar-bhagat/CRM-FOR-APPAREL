'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';
import { DesignGalleryGrid } from './design-gallery-grid';

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

export function DesignGalleryView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['design-gallery'],
    queryFn: async () => {
      const res = await fetch('/api/design/gallery?page=1&limit=50');
      if (!res.ok) throw new Error('Failed to fetch designs');
      return res.json() as Promise<{ designs: Design[]; total: number }>;
    },
    retry: 2,
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <DataTableSkeleton cols={4} rows={12} />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load design gallery. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <DesignGalleryGrid designs={data?.designs ?? []} />
      </CardContent>
    </Card>
  );
}
