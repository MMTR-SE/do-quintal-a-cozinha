"use client";

import Image from "next/image";
import { EarthstarChat } from "./earthstar-chat";

export function Cooking() {
  return (
    <main className="container-wrapper min-h-screen">
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Cabeçalho */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Nosso Espaço
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Um lugar de encontro, troca e fortalecimento das mulheres trabalhadoras rurais
            </p>
          </div>

          {/* Imagem principal */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/icons/botton-espaco.webp"
              alt="Ilustração de mãos entrelaçadas formando um coração, símbolo de união entre mulheres"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Conteúdo */}
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                Bem-vindas ao nosso espaço!
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Este é um espaço criado para fortalecer os laços entre as mulheres trabalhadoras
                rurais de Sergipe. Aqui compartilhamos conhecimentos, experiências e construímos
                juntas um futuro mais justo e sustentável.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                O que fazemos aqui
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Compartilhamos experiências sobre produção agroecológica e comercialização</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Trocamos receitas tradicionais e técnicas de beneficiamento</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Fortalecemos nossa organização coletiva e autonomia econômica</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Valorizamos nossos saberes e práticas tradicionais</span>
                </li>
              </ul>
            </section>

            <section className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                Converse conosco!
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Use o botão de chat no canto inferior direito para trocar mensagens com outras
                mulheres da nossa rede. Este é um espaço seguro e colaborativo para todas nós!
              </p>
              <p className="text-sm text-muted-foreground italic">
                💬 Clique no ícone de mensagem para abrir o chat
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Componente de Chat */}
      <EarthstarChat />
    </main>
  );
}
