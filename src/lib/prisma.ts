import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Return a mock client for build-time when DATABASE_URL is not set
    // This allows the build to succeed without a database
    return new PrismaClient({
      // Disable SSL verification in development
      errorFormat: "pretty",
    });
  }

  const client = new PrismaClient({
    datasources: {
      db: {
        url: connectionString,
      },
    },
    errorFormat: "pretty",
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export async function disconnectPrisma() {
  if (globalForPrisma.prisma) {
    await globalForPrisma.prisma.$disconnect();
  }
}
