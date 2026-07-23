/**
 * CRITICAL: Singleton prevents database connection exhaustion during Next.js hot-reload.
 * Without this, each hot-reload creates new connections until SQLite hits limit.
 * globalThis persists across Fast Refresh, reusing the same PrismaClient instance.
 */

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
