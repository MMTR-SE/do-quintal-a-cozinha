import Image from "next/image";

export const dynamic = "force-static";

const people = [
  {
    name: "Dona Raimunda",
    description: "Exemplo de vida e como seguir com garra o que ela te apresenta. Sempre presente.",
    image: "/images/stories/raimunda.png",
    href: "/nossas-historias/raimunda", 
  },
  {
    name: "Silvia Helena",
    description: "Exemplo de vida e como seguir com garra o que ela te apresenta. Sempre presente.",
    image: "/images/stories/dita.jpg",
    href: "/nossas-historias/silvia-helena", 
  },
];

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <header className="mb-14 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Nossas Histórias
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Conheça a história das mulheres que constroem os seus territórios e o nosso movimento!
        </p>
      </header>
      <section
        aria-label="Lista de histórias"
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {people.map((person) => (
          <article
            key={person.name}
            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col focus-within:ring-4 focus-within:ring-blue-300"
          >
            {/* Imagem */}
            <div className="relative h-64 w-full">
              <Image
                src={person.image}
                alt={`Foto de ${person.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 leading-snug">
                {person.name}
              </h2>

              <p className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                {person.description}
              </p>

              <a
                href={person.href}
                className="inline-block w-full bg-purple-700 text-white text-center py-2.5 rounded-lg font-medium hover:bg-purple-700 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                aria-label={`Saiba mais sobre ${person.name}`}
              >
                Saiba mais
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
