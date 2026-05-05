"use client";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function CreateOrderModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    refNo: "",
    buyer: "",
    brand: "",
    styleNo: "",
    styleName: "",
    orderQty: "",
    targetPfhDate: "",
    deliveryDate: "",
    imageUrl: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create order");

      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      setOpen(false);
      // Reset form
      setFormData({
        refNo: "",
        buyer: "",
        brand: "",
        styleNo: "",
        styleName: "",
        orderQty: "",
        targetPfhDate: "",
        deliveryDate: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="size-4" />
          <span className="font-bold text-xs">Initialize Order</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border border-white/10 bg-background/60 backdrop-blur-3xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Initialize Order</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="order-ref-no"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Ref No.
              </label>
              <Input
                id="order-ref-no"
                required
                placeholder="e.g. CTA-2026-001"
                value={formData.refNo}
                onChange={(e) => setFormData((p) => ({ ...p, refNo: e.target.value }))}
                className="bg-background/50 border-white/10 h-11"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="order-buyer"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Buyer
              </label>
              <Input
                id="order-buyer"
                required
                placeholder="e.g. Next UK"
                value={formData.buyer}
                onChange={(e) => setFormData((p) => ({ ...p, buyer: e.target.value }))}
                className="bg-background/50 border-white/10 h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="order-brand"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Brand
              </label>
              <Input
                id="order-brand"
                placeholder="e.g. NX-Mens"
                value={formData.brand}
                onChange={(e) => setFormData((p) => ({ ...p, brand: e.target.value }))}
                className="bg-background/50 border-white/10 h-11"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="order-qty"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Order Qty
              </label>
              <Input
                id="order-qty"
                required
                type="number"
                placeholder="e.g. 5000"
                value={formData.orderQty}
                onChange={(e) => setFormData((p) => ({ ...p, orderQty: e.target.value }))}
                className="bg-background/50 border-white/10 h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="order-style-no"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Style No.
              </label>
              <Input
                id="order-style-no"
                required
                placeholder="e.g. STY-892"
                value={formData.styleNo}
                onChange={(e) => setFormData((p) => ({ ...p, styleNo: e.target.value }))}
                className="bg-background/50 border-white/10 h-11"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="order-style-name"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Style Name
              </label>
              <Input
                id="order-style-name"
                placeholder="e.g. Denim Jacket"
                value={formData.styleName}
                onChange={(e) => setFormData((p) => ({ ...p, styleName: e.target.value }))}
                className="bg-background/50 border-white/10 h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="order-target-pfh-date"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Target PFH Date
              </label>
              <Input
                id="order-target-pfh-date"
                type="date"
                value={formData.targetPfhDate}
                onChange={(e) => setFormData((p) => ({ ...p, targetPfhDate: e.target.value }))}
                className="bg-background/50 border-white/10 h-11"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="order-delivery-date"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Delivery Date
              </label>
              <Input
                id="order-delivery-date"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData((p) => ({ ...p, deliveryDate: e.target.value }))}
                className="bg-background/50 border-white/10 h-11"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2 mt-2">
            <label
              htmlFor="order-stock-image"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Stock Image
            </label>
            <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl bg-background/30 hover:bg-background/50 transition-colors cursor-pointer overflow-hidden">
              <input
                id="order-stock-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover opacity-80" />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <UploadCloud className="size-8 mb-2 opacity-50" />
                  <span className="text-sm font-medium">Click or drag image to upload</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 mt-2 border-t border-white/10">
            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground font-semibold px-8">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
