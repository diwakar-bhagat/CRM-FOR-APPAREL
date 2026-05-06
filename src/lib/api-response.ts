import { NextResponse } from 'next/server';
import type { ZodError } from 'zod';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  issues?: unknown[];
  total?: number;
  page?: number;
  pages?: number;
}

export function ok<T>(
  data: T,
  meta?: { total?: number; page?: number; pages?: number }
): NextResponse {
  return NextResponse.json({ data, ...meta }, { status: 200 });
}

export function created<T>(data: T): NextResponse {
  return NextResponse.json({ data }, { status: 201 });
}

export function badRequest(error: string, issues?: unknown[]): NextResponse {
  return NextResponse.json({ error, issues }, { status: 400 });
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function forbidden(): NextResponse {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export function notFound(resource = 'Resource'): NextResponse {
  return NextResponse.json({ error: `${resource} not found` }, { status: 404 });
}

export function serverError(error: unknown): NextResponse {
  console.error('[SERVER_ERROR]', error instanceof Error ? error.message : String(error));
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export function validationError(zodError: ZodError): NextResponse {
  return NextResponse.json(
    {
      error: 'Validation failed',
      issues: zodError.issues,
    },
    { status: 400 }
  );
}
