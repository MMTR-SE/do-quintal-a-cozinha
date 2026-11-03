"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

interface Options { search?: string; tags?: string[]; profileId?: string; }

/**
 * Lista as historias do banco do site (Prisma/SQLite).
 */
export async function getAllStories(options?: Options) {
  const where: Prisma.StoryWhereInput = options?.search
    ? { name: { contains: options.search } }
    : {};

  return prisma.story.findMany({
    select: {
      id: true, name: true, title: true, description: true, slug: true, content: true,
      region: true, media: { include: { media: { select: { url: true } } } },
    },
    where,
  });
}
