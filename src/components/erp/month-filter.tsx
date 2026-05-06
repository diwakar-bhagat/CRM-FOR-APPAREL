"use client";

import { useQuery } from "@tanstack/react-query";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MonthFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MonthFilter({ value, onChange }: MonthFilterProps) {
  const { data } = useQuery({
    queryKey: ["orders", { distinct: "months" }],
    queryFn: async () => {
      const response = await fetch("/api/orders?distinct=months");
      if (!response.ok) throw new Error("Failed to fetch months");
      return (await response.json()) as { months: string[] };
    },
  });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Months</SelectItem>
        {(data?.months ?? []).map((month) => (
          <SelectItem key={month} value={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
