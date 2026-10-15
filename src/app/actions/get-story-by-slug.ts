"use server";

import { prisma } from "@/lib/prisma";

export async function getStoryBySlug({ slug }: { slug: string }) {
  return prisma.story.findUnique({
    select: {
      id: true, name: true, title: true, description: true, slug: true, content: true,
      region: true, media: { include: { media: { select: { url: true } } } },
    },
    where: { slug },
  });
}
