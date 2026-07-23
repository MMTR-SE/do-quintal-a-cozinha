import { v4 as uuidv4 } from 'uuid';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const categoriesData = [
  { id: 'ARA', name: 'Aracaju' },
  { id: 'SAL', name: 'Salgado' },
  { id: 'GLO', name: 'Nossa Senhora da Glória' },
  { id: 'NLO', name: 'Nossa Senhora de Lourdes' },
];

export async function seedRegions(prisma) {
  if (!prisma) throw new Error('Prisma client is required');

  for (const cat of categoriesData) {
    await prisma.region.upsert({
      where: { id: cat.id },
      update: { name: cat.name },
      create: {
        id: cat.id,
        name: cat.name,
      },
    });
  }

  return prisma.region.findMany();
}