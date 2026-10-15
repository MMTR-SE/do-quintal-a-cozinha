import pkg from '@prisma/client';
const { MediaType, Category } = pkg;
import { v4 as uuidv4 } from 'uuid';

// Os produtos do site agora são gerenciados no Strapi (content-type "produtos").
// Este seed mantém apenas o perfil da produtora; não recria produtos no banco do app
// para não duplicar os que já existem no CMS.
const productsData = [];

const profile = {
  name: "Edna Salgado",
  phone_number: "+557996847218",
};

export async function seedProducts(prisma) {
  if (!prisma) throw new Error('Prisma client is required');

  // cria ou atualiza o profile uma vez
  const createdProfile = await prisma.profile.upsert({
    where: { phone_number: profile.phone_number },
    update: { name: profile.name },
    create: {
      id: uuidv4(),
      name: profile.name,
      phone_number: profile.phone_number,
    },
  });

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        id: uuidv4(),
        product_name: product.product_name,
        description: product.description,
        category: product.category,
        profile: {
          connect: { id: createdProfile.id },
        },
        media: {
          create: {
            media: {
              create: {
                id: uuidv4(),
                media_type: MediaType.IMAGE,
                url: product.image,
              },
            },
          },
        },
      },
    });
  }

  return prisma.product.findMany({ where: { profile: { id: createdProfile.id } } });
}
