/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";

interface Options { search?: string; tags?: string[]; profileId?: string; }

/**
 * Lista as historias do banco Postgres (conteudo migrado do CMS).
 */
export async function getAllStories(options?: Options) {
  const where: any = options?.search
    ? { name: { contains: options.search, mode: "insensitive" } }
    : {};

  return prisma.story.findMany({
    select: {
      id: true, name: true, title: true, description: true, slug: true, content: true,
      region: true, media: { include: { media: { select: { url: true } } } },
    },
    where,
  });
}
