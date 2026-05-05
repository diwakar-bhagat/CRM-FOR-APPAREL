import { neon, neonConfig } from "@neondatabase/serverless";

// Configure Neon to use HTTP fetch
neonConfig.fetchConnectionCache = true;

// Define a placeholder SQL executor if the database URL isn't present
// This ensures Next.js can compile pages without breaking on missing DB env vars
const mockSql = async (strings: TemplateStringsArray, ...values: any[]) => {
  console.warn("Neon DB not configured. Missing DATABASE_URL.");
  return [];
};

export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : mockSql;
