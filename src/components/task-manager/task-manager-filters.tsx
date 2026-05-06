'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TaskManagerFilters() {
  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Search orders..."
        className="w-full max-w-xs"
      />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="delivery">Delivery Date</SelectItem>
          <SelectItem value="created">Created Date</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Buyer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Buyers</SelectItem>
          <SelectItem value="hm">H&M</SelectItem>
          <SelectItem value="zara">ZARA</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline">Columns</Button>
    </div>
  );
}
