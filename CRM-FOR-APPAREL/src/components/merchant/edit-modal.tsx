"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: any;
  apiRoute: string;
}

export function EditModal({ isOpen, onClose, rowData, apiRoute }: EditModalProps) {
  const queryClient = useQueryClient();
  
  // Local state for the form
  const [formData, setFormData] = useState({
    orderQty: rowData?.orderQty || 0,
    totalReqdQty: rowData?.totalReqdQty || 0,
    statusRed: rowData?.statusRed || 0,
    statusOrange: rowData?.statusOrange || 0,
    statusGreen: rowData?.statusGreen || 0,
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch(apiRoute, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: rowData.id, ...data }),
      });
      if (!res.ok) throw new Error("Failed to update record");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Record updated successfully");
      queryClient.invalidateQueries({ queryKey: [apiRoute] });
      onClose();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update record");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      orderQty: Number(formData.orderQty),
      totalReqdQty: Number(formData.totalReqdQty),
      statusRed: Number(formData.statusRed),
      statusOrange: Number(formData.statusOrange),
      statusGreen: Number(formData.statusGreen),
    });
  };

  if (!rowData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Record: {rowData.refNo}</DialogTitle>
          <DialogDescription>
            Update quantities and status indicators for {rowData.styleName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderQty">Order Qty</Label>
              <Input
                id="orderQty"
                type="number"
                value={formData.orderQty}
                onChange={(e) => setFormData({ ...formData, orderQty: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalReqdQty">Total ReqdQty</Label>
              <Input
                id="totalReqdQty"
                type="number"
                value={formData.totalReqdQty}
                onChange={(e) => setFormData({ ...formData, totalReqdQty: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Label>Status Indicators</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-delayed" />
                <Input
                  className="w-16 h-8 text-center"
                  type="number"
                  value={formData.statusRed}
                  onChange={(e) => setFormData({ ...formData, statusRed: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-at-risk" />
                <Input
                  className="w-16 h-8 text-center"
                  type="number"
                  value={formData.statusOrange}
                  onChange={(e) => setFormData({ ...formData, statusOrange: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-on-track" />
                <Input
                  className="w-16 h-8 text-center"
                  type="number"
                  value={formData.statusGreen}
                  onChange={(e) => setFormData({ ...formData, statusGreen: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
