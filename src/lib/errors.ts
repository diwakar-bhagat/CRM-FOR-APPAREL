import { NextResponse } from "next/server";

type ApiErrorResponse = {
  success: false;
  error: string;
};

export function jsonError(status: number, error: string) {
  return NextResponse.json<ApiErrorResponse>({ success: false, error }, { status });
}

export function handlePrismaError(err: unknown): NextResponse {
  const e = err as { code?: string; message?: string };

  switch (e.code) {
    case "P2025":
      return jsonError(404, "Not found");
    case "P2002":
      return jsonError(409, "Already exists");
    case "P2003":
      return jsonError(400, "Invalid reference");
    case "P1001":
    case "P1002":
      console.error("[DB] Connection failed:", e.message ?? "unknown");
      return jsonError(503, "Database unavailable");
    default:
      console.error("[DB] Unhandled error:", e.message ?? "unknown");
      return jsonError(500, "Internal server error");
  }
}
