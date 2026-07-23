import pkg from '@prisma/client';
const { MediaType, Category } = pkg;
import { v4 as uuidv4 } from 'uuid';

const productsData = [
  {
    product_name: "Malcasado",
    description: "Saboroso macasado caseiro",
    category: Category.PROCESSADO,
    image: "https://storage.mulheresrurais.com.br/typebot/public/tmp/typebots/cketor63k011m9bole7usb06/blocks/jv2bycs020prsic44drergij/WhatsApp Image 2025-11-05 at 14.48.14.jpeg",
  },
  {
    product_name: "Pé de Moleque",
    description: "Pé de Moleque com assado na folha de bananeira",
    category: Category.PROCESSADO,
    image: "https://storage.mulheresrurais.com.br/typebot/public/tmp/typebots/cketor63k011m9bole7usb06/blocks/jv2bycs020prsic44drergij/WhatsApp%20Image%202025-11-05%20at%2014.49.01(1).jpeg",
  },
  {
    product_name: "Cocada mundinha",
    description: "Cocada mundinha com gosto de infancia",
    category: Category.PROCESSADO,
    image: "https://storage.mulheresrurais.com.br/typebot/public/tmp/typebots/cketor63k011m9bole7usb06/blocks/kikn9164xu6m5ot4rxulsvai/WhatsApp Image 2025-11-05 at 14.49.17.jpeg",
  },
  {
    product_name: "Bolo de Macaxeira",
    description: "Bolo de macaxeira da vó",
    category: Category.PROCESSADO,
    image: "https://storage.mulheresrurais.com.br/typebot/public/tmp/typebots/cketor63k011m9bole7usb06/blocks/z5z6egot3qj3msvxa4nzhqqp/WhatsApp Image 2025-11-05 at 14.49.44.jpeg",
  },
];

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
