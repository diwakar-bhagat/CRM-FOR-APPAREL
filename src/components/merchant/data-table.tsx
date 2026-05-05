"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, FileEdit } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EditModal } from "./edit-modal";

interface DataTableProps {
  title: string;
  apiRoute: string;
}

export function MerchantDataTable({ title, apiRoute }: DataTableProps) {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: [apiRoute],
    queryFn: async () => {
      const res = await fetch(apiRoute);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    refetchInterval: 60000,
  });

  return (
    <Card className="w-full shadow-sm border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/20 border-b border-border/30">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/10 border-b border-border/40 text-muted-foreground text-xs uppercase font-medium">
              <tr>
                <th className="py-3 px-4 text-left">Action</th>
                <th className="py-3 px-4 text-left">Our Ref</th>
                <th className="py-3 px-4 text-left">First Delivery Date</th>
                <th className="py-3 px-4 text-left">Buyer</th>
                <th className="py-3 px-4 text-left">Style No.(s)</th>
                <th className="py-3 px-4 text-left">Style Name</th>
                <th className="py-3 px-4 text-right">Order Qty</th>
                <th className="py-3 px-4 text-right">Total ReqdQty</th>
                <th className="py-3 px-4 text-center">Target PFH Date</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="p-4">
                    <Skeleton className="w-full h-8" />
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-4 text-center text-muted-foreground">
                    No records found
                  </td>
                </tr>
              ) : (
                data?.data?.map((row: any, i: number) => (
                  <tr key={row.id || i} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => setSelectedRow(row)}
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs font-medium">
                      <Badge variant="secondary" className="bg-surface-2 text-foreground font-mono">{row.refNo}</Badge>
                    </td>
                    <td className="py-3 px-4">{row.deliveryDate ? new Date(row.deliveryDate).toLocaleDateString() : "-"}</td>
                    <td className="py-3 px-4">{row.buyer}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.styleId}</td>
                    <td className="py-3 px-4">{row.styleName}</td>
                    <td className="py-3 px-4 text-right tabular-nums">{row.orderQty ?? "0.00"}</td>
                    <td className="py-3 px-4 text-right tabular-nums">{row.totalReqdQty ?? "0.00"}</td>
                    <td className="py-3 px-4 text-center">{row.targetPfhDate ? new Date(row.targetPfhDate).toLocaleDateString() : "-"}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Badge className="bg-status-delayed text-white w-5 h-5 p-0 flex items-center justify-center rounded-full text-[10px]">{row.statusRed ?? 0}</Badge>
                        <Badge className="bg-status-at-risk text-white w-5 h-5 p-0 flex items-center justify-center rounded-full text-[10px]">{row.statusOrange ?? 0}</Badge>
                        <Badge className="bg-status-on-track text-white w-5 h-5 p-0 flex items-center justify-center rounded-full text-[10px]">{row.statusGreen ?? 0}</Badge>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      {selectedRow && (
        <EditModal
          isOpen={!!selectedRow}
          onClose={() => setSelectedRow(null)}
          rowData={selectedRow}
          apiRoute={apiRoute}
        />
      )}
    </Card>
  );
}
