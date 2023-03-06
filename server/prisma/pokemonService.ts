import { PrismaClient, Pokemon } from "@prisma/client";

const prisma = new PrismaClient();

  async function getPokemonData(): Promise<Pokemon[]> {
    const pokemonData = await prisma.pokemon.findMany();
    return pokemonData;
  }
  async function main() {
  const pokemonData = await getPokemonData();
 }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default getPokemonData;