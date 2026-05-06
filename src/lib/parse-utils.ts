/**
 * Safely parse a date from any input
 */
export function isValidDate(value: unknown): boolean {
  if (!value) return false;
  const date = new Date(value as string | number);
  return !Number.isNaN(date.getTime());
}

/**
 * Safely parse a number from any input
 */
export function safeNumber(value: unknown, fallback = 0): number {
  if (value === null || value === undefined || value === '') return fallback;
  const n = Number(value);
  return Number.isNaN(n) ? fallback : n;
}

/**
 * Safely parse an integer from any input
 */
export function safeInt(value: unknown, fallback = 0): number {
  return Math.floor(safeNumber(value, fallback));
}

/**
 * Safely parse pagination parameters
 */
export function parsePagination(
  page: unknown,
  limit: unknown,
  maxLimit = 100
): { page: number; limit: number; skip: number } {
  const pageNum = Math.max(1, safeInt(page, 1));
  const limitNum = Math.min(maxLimit, Math.max(1, safeInt(limit, 20)));
  const skip = (pageNum - 1) * limitNum;
  return { page: pageNum, limit: limitNum, skip };
}

/**
 * Get total pages from count and limit
 */
export function getTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}
