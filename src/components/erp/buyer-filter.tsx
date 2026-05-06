"use client";

import { useQuery } from "@tanstack/react-query";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type BuyerFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BuyerFilter({ value, onChange }: BuyerFilterProps) {
  const { data } = useQuery({
    queryKey: ["orders", { distinct: "buyers" }],
    queryFn: async () => {
      const response = await fetch("/api/orders?distinct=buyers");
      if (!response.ok) throw new Error("Failed to fetch buyers");
      return (await response.json()) as { buyers: string[] };
    },
  });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Buyer" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Buyers</SelectItem>
        {(data?.buyers ?? []).map((buyer) => (
          <SelectItem key={buyer} value={buyer}>
            {buyer}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
