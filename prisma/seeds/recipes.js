import pkg from '@prisma/client';
import { MediaType, PrismaClient, RecipeDifficulty } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const recipes = [
  {
    title: "Macasado",
    description:
      "Receita caseira de macasado docinho, assado na folha de bananeira",
    image: "/receitas/macasado-assado.webp",
    preparation_time_in_minutes: 90,
    cooking_time_in_minutes: 40,
    number_of_servings: 40,
    difficulty: RecipeDifficulty.INTERMEDIARY,
    ingredients: [
      "5kg de tapioca",
      "1kg de açúcar",
      "1 colher de sopa de sal",
      "8 cocos ralados",
      "folhas de bananeira"
    ],
    steps: [
      { step_number: 1, instruction: "Ralar os cocos" },
      { step_number: 2, instruction: "Em um recipiente grande, misturar todos os ingredientes e esperar até que dissolvam e se tornem como uma massa de bolo" },
      { step_number: 3, instruction: "Limpar e cortar as folhas de bananeira em pedaços menores" },
      { step_number: 4, instruction: "Colocar um pouco da massa na folha de bananeira e dobrar" },
      { step_number: 5, instruction: "Colocar os pacotinhos de folha de bananeira em uma chapa grande de metal já aquecida" },
      { step_number: 6, instruction: "Esperar até que os macasados estejam assados. Leva em média uns 20 minutos." },
    ]
  },
  {
    title: "Pé de Moleque",
    description:
      "Receita caseira de pé de moleque fofinho, assado na folha de bananeira e taxo de metal",
    image: "/receitas/pe-de-moleque.webp",
    preparation_time_in_minutes: 50,
    cooking_time_in_minutes: 20,
    number_of_servings: 40,
    difficulty: RecipeDifficulty.INTERMEDIARY,
    ingredients: [
      "15 kg de puba",
      "10 coco ralado",
      "500 g de tapioca",
      "2 colher de sopa de margarina",
      "3 kg de açúcar",
      "1 sopa sal",
      "água até dar o ponto"
    ],
    steps: [
      { step_number: 1, instruction: "Ralar os cocos e bater com água" },
      { step_number: 2, instruction: "Em um recipiente grande, misturar todos os ingredientes e esperar até que dissolvam e se tornem como uma massa de bolo" },
      { step_number: 3, instruction: "Limpar e cortar as folhas de bananeira em pedaços menores" },
      { step_number: 4, instruction: "Colocar um pouco da massa na folha de bananeira e enrolar" },
      { step_number: 5, instruction: "Colocar os pacotinhos de folha de bananeira em uma chapa grande de metal já aquecida" },
      { step_number: 6, instruction: "Esperar até que os pé de moleques estejam assados, em média 20 minutos. Eles ficarão mais consistentes" },
    ]
  },
];

const profile = {
  name: "Edna Salgado",
  phone_number: "+557996847218",
};

export async function seedRecipes(prisma) {
  if (!prisma) throw new Error('Prisma client is required');

  const createdProfile = await prisma.profile.upsert({
    where: { phone_number: profile.phone_number },
    update: { name: profile.name },
    create: {
      id: uuidv4(),
      name: profile.name,
      phone_number: profile.phone_number,
    },
  });

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: {
        id: uuidv4(),
        title: recipe.title,
        description: recipe.description,
        preparation_time_in_minutes: recipe.preparation_time_in_minutes ?? 0,
        cooking_time_in_minutes: recipe.cooking_time_in_minutes ?? 0,
        number_of_servings: recipe.number_of_servings ?? 1,
        difficulty: recipe.difficulty,
        ingredients: recipe.ingredients ? JSON.stringify(recipe.ingredients) : JSON.stringify([]),
        profile: {
          connect: { id: createdProfile.id },
        },
        media: {
          create: {
            media: {
              create: {
                id: uuidv4(),
                media_type: MediaType.IMAGE,
                url: recipe.image
              }
            }
          }
        },
        steps: { create: recipe.steps.map(step => ({ instruction: step.instruction, step_number: step.step_number })) }
      },
    });
  }
}
