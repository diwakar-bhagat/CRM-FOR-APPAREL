import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../../generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn("[v0] DATABASE_URL not found. Prisma will use default connection.");
    return new PrismaClient({ errorFormat: "pretty" });
  }

  const adapter = new PrismaPg(databaseUrl);
  return new PrismaClient({
    adapter,
    errorFormat: "pretty",
  });
}

export async function disconnectPrisma() {
  if (globalForPrisma.prisma) {
    await globalForPrisma.prisma.$disconnect();
  }
}
