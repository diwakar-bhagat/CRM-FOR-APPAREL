"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HighlightCardProps {
  title: string;
  data: any[];
  isLoading: boolean;
}

export function HighlightCard({ title, data, isLoading }: HighlightCardProps) {
  return (
    <Card className="w-full shadow-sm border border-border/50 flex flex-col h-full">
      <CardHeader className="pb-3 pt-4 px-4 bg-muted/10 border-b border-border/30">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-y-auto flex-1 max-h-[300px]">
        <table className="w-full text-xs">
          <thead className="bg-muted/5 text-muted-foreground font-medium sticky top-0 backdrop-blur-md">
            <tr>
              <th className="py-2 px-4 text-left font-medium">Reff No.</th>
              <th className="py-2 px-4 text-left font-medium">Buyer</th>
              <th className="py-2 px-4 text-left font-medium">Brand</th>
              <th className="py-2 px-4 text-left font-medium">Style No.</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">Loading...</td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">No records</td>
              </tr>
            ) : (
              data?.map((row, i) => (
                <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/10">
                  <td className="py-2.5 px-4">
                    <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary/20 bg-primary/5">
                      {row.refNo}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-4 font-medium">{row.buyer}</td>
                  <td className="py-2.5 px-4 text-muted-foreground">{row.brand || "-"}</td>
                  <td className="py-2.5 px-4 truncate max-w-[120px]">{row.styleId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
