import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

import { handlePrismaError, jsonError } from "@/lib/errors";

type HandlerOptions<T> = {
  requireAuth?: boolean;
  bodySchema?: ZodSchema<T>;
};

type HandlerFn<T> = (params: {
  req: NextRequest;
  userId: string | null;
  body: T;
}) => Promise<NextResponse>;

export function createHandler<T = never>(options: HandlerOptions<T>, handler: HandlerFn<T>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      let userId: string | null = null;
      if (options.requireAuth) {
        const session = await auth();
        userId = session.userId;
        if (!userId) {
          return jsonError(401, "Unauthorized");
        }
      }

      let body = {} as T;
      if (options.bodySchema) {
        let raw: unknown;
        try {
          raw = await req.json();
        } catch {
          return jsonError(400, "Invalid JSON body");
        }
        const parsed = options.bodySchema.safeParse(raw);
        if (!parsed.success) {
          return NextResponse.json(
            {
              success: false,
              error: "Validation failed",
              details: parsed.error.flatten(),
            },
            { status: 400 },
          );
        }
        body = parsed.data;
      }

      return await handler({ req, userId, body });
    } catch (err) {
      const maybeCode = (err as { code?: string }).code;
      if (maybeCode?.startsWith("P")) {
        return handlePrismaError(err);
      }
      console.error("[API]", req.method, req.nextUrl.pathname, (err as Error).message);
      return jsonError(500, "Internal server error");
    }
  };
}
