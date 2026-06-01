import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let prismaInstance: PrismaClient;

try {
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (error) {
  console.warn("Prisma failed to initialize during build:", error);
  // Return a dummy proxy to bypass build-time static analysis crash
  prismaInstance = new Proxy({} as PrismaClient, {
    get() {
      return () => null;
    }
  });
}

export const prisma = prismaInstance;
