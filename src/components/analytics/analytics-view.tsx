'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';

interface MonthlyData {
  month: string;
  totalPlanned: number;
  totalStitched: number;
  balToSew: number;
}

export function AnalyticsView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics-monthly-output'],
    queryFn: async () => {
      const res = await fetch(`/api/analytics/monthly-output?year=${new Date().getFullYear()}`);
      if (!res.ok) throw new Error('Failed to fetch analytics');
      return res.json() as Promise<{ months: MonthlyData[] }>;
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
        <AlertDescription>Failed to load analytics. Please try again.</AlertDescription>
      </Alert>
    );
  }

  const chartData = data?.months ?? [];

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Production Trend</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalPlanned" stroke="#8b5cf6" name="Planned Qty" />
                <Line type="monotone" dataKey="totalStitched" stroke="#10b981" name="Stitched Qty" />
                <Line type="monotone" dataKey="balToSew" stroke="#ef4444" name="Balance to Sew" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Month</th>
                  <th className="text-right py-2 px-2">Planned</th>
                  <th className="text-right py-2 px-2">Stitched</th>
                  <th className="text-right py-2 px-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((row) => (
                  <tr key={row.month} className="border-b hover:bg-slate-50">
                    <td className="py-2 px-2">{row.month}</td>
                    <td className="text-right py-2 px-2 font-medium">{row.totalPlanned.toLocaleString()}</td>
                    <td className="text-right py-2 px-2 font-medium text-green-600">{row.totalStitched.toLocaleString()}</td>
                    <td className="text-right py-2 px-2 font-medium text-red-600">{row.balToSew.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
