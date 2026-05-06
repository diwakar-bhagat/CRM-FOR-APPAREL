'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AnalyticsError({ error }: { error: Error }) {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-2 py-4 sm:px-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load analytics. {process.env.NODE_ENV === 'development' && error.message}
        </AlertDescription>
      </Alert>
    </div>
  );
}
