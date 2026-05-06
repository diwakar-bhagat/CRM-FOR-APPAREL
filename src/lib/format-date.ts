import { format } from "date-fns";

export function formatDate(value: Date | string | null | undefined, pattern = "dd MMM yyyy"): string {
  if (!value) {
    return "-";
  }

  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return format(date, pattern);
}
