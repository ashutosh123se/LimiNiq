import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function withConnectTimeout(url?: string) {
  if (!url || url.includes("connect_timeout=")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}connect_timeout=5`;
}

let prismaInstance: PrismaClient;

try {
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      datasources: process.env.DATABASE_URL
        ? {
            db: {
              url: withConnectTimeout(process.env.DATABASE_URL),
            },
          }
        : undefined,
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
