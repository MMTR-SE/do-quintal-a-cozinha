import pkg from '@prisma/client';
const { MediaType } = pkg;
import { v4 as uuidv4 } from 'uuid';

export const storiesData = [
  {
    id: "1",
    title: "Encontrei com Lula, conversei com ele e fiquei feliz",
    name: "Dona Raimunda",
    description:
      "Artesã, agricultora e matriarca da família que vive em Mattas. Segue com a lida e sua vida, sendo inspiração para muitas gerações.",
    slug: "raimunda",
    regionId: "ARA",
    mediaUrls: ["/images/stories/raimunda.webp", "/images/stories/raimunda-2.webp"],
    content:`
  <p>Quer inspiração? Então vamos conhecer um pouquinho da história de Raimunda Raquel da Cruz, 82 anos, mulher branca, moradora do povoado Matatas em Salgado (SE). Ela nos inspira pela simplicidade de enxergar a vida e as dificuldades que acreditamos difíceis de transpor. Não existem obstáculos para sua ocupação nos espaços, seja pela falta de leitura ou condição geracional. Sem ter frequentado escola formal, nos dar aula de sabedoria e nos inspira a superar nossas dificuldades. Onde tem marchas e atividade sempre está presente. Por isso, o aplicativo “Do quintal a cozinha” está  “femenageando” dando nome ao nosso chatbot de <strong>Dona Raimunda</strong>, facilitando a acessibilidade às nossas conversas.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha vida foi assim, desde pequena, com seis anos de idade, eu já trabalhava na roça com meus pais, e com sete anos já ganhava dinheiro, e graças a Deus, a minha vida é assim. Como meu pai e minha mãe me ensinaram, eu vou para a igreja, vou trabalhando. Não cheguei a frequenta a escola.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tive dezoito filhos, mas criei onze e criei dois netos. O tanto de netos, só dormindo pra contar.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Ainda hoje faço roça. Agora sou viúva.  Vivo na minha roça, trabalhando, batalhando a minha vida aqui e acolá. Pouco, porque hoje eu não posso mais [por causa da]  coluna, mais ainda. Graças a Deus, vivo na minha roça, na minha feira. Minha filha não quer mais que eu vá para a feira, mas eu vou, porque eu não estou aleijada. Eu vou para a minha feira, fazer minhas feiras, fazer meus pagamentos.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Homenagem – robochat-dona Raimunda</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Bom, fiquei feliz que botaram meu nome, porque acho que eu mereço, e gostaram de mim. Até hoje, minhas amigas, graças a Deus, fizeram isso comigo, porque estão achando que eu vou ser feliz.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Chegada no Movimento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Fui chamada por Izaldira foi quem me botou lá dentro, no movimento. Graças a Deus, até hoje, elas me ajudam. Izaldira, Madalena, Vera, elas que me ajudam a levar eu até lá.  Eu vou para todo canto. Vou para Brasília, São Paulo, Pernambuco, Caruaru, pra todo canto.
Todo canto que elas me levam, eu vou.
</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">As marchas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Já fui pra todas as Marcha das Margaridas, foi muito bom, graças a Deus. Muitas amigas, muito conforto, tive muito conforto até hoje na minha vida com a Marcha das Margaridas, com o Movimento de Mulher Trabalhadeira Rural também, graças a Deus, fui muito feliz.
Também fui pra Marcha de Mulheres em 2010, em São Paulo, caminhei 100 quilômetros, lembro que não cansei no caminho, graças a Deus. Foi muito o caminho, mas nunca desanimei porque Jesus me sustentava.
</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No outro encontro encontrei com Lula, (Brasília), conversei com ele e fiquei feliz. Ele foi muito bom comigo, graças a Deus, conversou comigo, me ajudou, me deu muita força na minha barraca. Ele disse que se eu precisasse de alguma coisa, podia mandar chamar ele, que ele vinha me ajudar. Mas, graças a Deus, não precisei, também não chamei ele, mas ele conversou muito comigo. Fiquei muito satisfeita com as palavras dele.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Faço artesanato. Faço bordado, vagonite, ponto cruz, puxadinho, escama de peixe e faço pano de prato, coberta de taco. Vendo na feira de Salgado. Onde tem, eu vou.
Meu sítio  fica aqui mesmo, na Matatas. Quando eu comprei, só era terra. Mas agora já tenho mandioca plantada, tenho coco, tenho jaqueira e tenho pé de mangueira.
</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Trabalho</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minhas tarefas eu faço, de  vez em quando fazer uma faxina, mas é eu mesmo. Varro casa, cozinho e vou levando a vida assim mesmo. O meu trabalho é só dentro de casa, bordando, fazendo crochê, vou na roça, boto remédio na formiga e volto para casa.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p><strong>Minha casa é aqui e acho bom  porque graças a Deus até hoje eu moro e vivo feliz.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "2",
    title: "Sou uma guerreira, trabalho todos os dias na roça",
    name: "Silvia Helena",
    description:"Mulher negra, agricultora não assentada, moradora há mais de 30 anos do Assentamento.",
    slug: "silvia-helena",
    regionId: "ARA",
    mediaUrls: ["/images/stories/dita.webp", "/images/stories/dita-2.webp"],
    content:`
  <p class="text-lg leading-relaxed text-gray-800 mb-6>Vamos conhecer a história de vida de Silvia Helena, 56 anos, ou Dita como é conhecida, mulher negra moradora há mais de 30 do Assentamento Vitória da União, no município de Santa Luzia do Itanhy (SE). Arupemba Dita é agricultora não assentada, fez sua vida trabalhando na terra de sua mãe e irmãos assentados, passou por uma infância difícil e a superação veio na conquista de sua autonomia. Ela nos conta com orgulho tudo que conquistou com a organização coletiva.
  Sócia e militante do MMTR-SE, ela ocupa a  diretoria da Associação do seu  Assentamento.
</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">“Já tem mais de 30 anos que a gente mora aqui no assentamento Vitória da União. Consegui ter uma roça, sou agricultora. Filha de agricultora assentada, tenho irmãos assentados. Não sou assentada  e  trabalho todos os dias na roça. No inverno planto muita verdura. Trabalho muito com mandioca, macaxeira. Planto feijão de corda, feijão de arranca, milho, bananeiras, fava. Também tenho gado. Adquiri um pouco de gado. Tem de tudo pouco. Verduras, a gente planta bastante, hortaliça. E tenho minhas plantas ornamentais. Algumas ervas pra fazer chá. Crio galinha. Várias coisas. Sou uma guerreira. Levanto cedo pra batalhar, trabalhar. Tenho a minha casa pra tomar de conta. Tenho os bichos pra tomar de conta. Também participo de uma feirinha da agricultura familiar nas quartas-feiras na cidade.".</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Infância</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Então, a gente quase não teve infância. Começamos a trabalhar cedo. Cedo, cedo, cedo. Eu me lembro que com 9 anos já estava na luta, na roça mais meu pai plantando e cuidando de fumo que era muito, trabalhava bastante com fumo. Também com o negócio brincar era pouco. Trabalhava bastante. Estudava, a gente ia pra escola, sim. Tinha aquelas dificuldades, o colégio era longe. Mas nunca deixei de ir pra escola, sempre que a gente podia, a gente ia pra escola. Mas foi uma infância difícil. A gente trabalhou bastante. Tinha negócio de brinquedo não. Naquela época não tinha celular, não tinha bicicleta. Boneca pra brincar, nada disso. Era trabalho mesmo. Mas foi uma infância feliz, a gente tinha os irmãos, os primos, os avós. Tudo morava junto, próximo um do outro, a gente estava ali, naquela animação, naquela festa, naquela época não tinha energia. Não tinha televisão. Tinha um rádio de pilha. </p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Sobre seus antepassados</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha avó, eu pedi muito cedo, mas lembro que minha avó rezava. E sempre ia dizer, não comam isso que faz mal. Do meu pai aqui na minha casa tem muito, esse negócio de fazer chá de cidreira. Tem a babosa aqui também. Eles lavavam a cabeça com babosa. De criança, eu já lavava a cabeça com babosa, ainda hoje tenho aqui em casa babosa.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">As sementes</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A gente planta e todo ano tem que guardar um pouquinho pra ter pro próximo ano. Eu ganhei uma semente de milho crioulo no Seminário de Biodiversidade em Aracaju (fev. 2025) que participei junto ao MMTR-SE, que plantei esse ano. Se a gente colhe uma abóbora, a gente corta a abóbora. A semente a gente já guarda. Põe pra secar e já guarda pro ano que vem. Mesma coisa é o quiabo, a mesma coisa é a macaxeira... Você tem que deixar pra semente pro próximo ano.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Uso da água</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A água daqui do assentamento é poço, e a associação faz a gestão. Mas todo mundo tem água encanada em casa. No verão tem mudança na distribuição pra não faltar de forma nenhuma. O assentamento cresceu e hoje tem muitos moradores, muitas casas e no verão o gasto é maior.  E aí a gente tem mais dificuldade. Tem que saber economizar.</p>

    <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Sobre as mudanças climáticas</h2>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Ano passado teve uma seca que eu não tinha visto antes. Essa seca, diz minha mãe que há uns 20 anos atrás aconteceu a mesma coisa. Foi seca mesmo, uma seca que a gente perdeu até gado. Então, no verão tem que ter menos planta. E tem que aproveitar as águas, tem que tá pegando as águas que você usa, e tá colocando nas plantas. </p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão de tarefas </h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu faço tudo sozinha. É raro meu companheiro lavar uma xícara. É raro ele colocar água na planta.  Ultimamente ele vai mais pra roça e eu estou indo menos. Mas a gente já trabalhou de igual pra igual na roça. E quando eu chegava em casa, eu tinha que fazer as coisas dele em casa. Buscar lenha, era uma tarefa minha. Mas lenha eu vou buscar de carroça, de galinhota, fecho na cabeça.  Racho lenha até hoje, eu racho lenha.
</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Jornada diária </h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Trabalho da hora que eu levanto até a hora que eu vou deitar, eu tô fazendo as coisas. Não tem assim, quantidade de horas. Não tenho descanso, é o dia todo fazendo uma coisa ou outra, uma coisa ou outra, não paro.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Trabalho</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Por exemplo, eu limpava o terreiro, eu não sabia que o terreiro era um trabalho. Pra mim que era um terreiro que fazia parte da casa. E não é. Quer dizer, dar comida a um animal, um bicho, é um trabalho também. Doméstico, no caso cria galinha, você vai dar comida pra galinha, colocar água pra galinha. É um trabalho também.  Eu pensei que fosse fazer parte da casa, tudo, mas não é. O movimento ajudou a abrir os olhos. A gente aprende muita coisa com o Movimento.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Sua produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Quando a gente tiver o aplicativo e a gente vai colocar os produtos, eu acho uma excelente ideia. Vamos poder vender para além da comunidade. A associação já faz venda também em grupo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Participação </h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No Movimento já tenho  mais de 15 anos. Mas eu não sou uma pessoa, assim, do Movimento que fico na frente. Eu sou sempre, assim, mais atrás, mais calada, mais escutando. Eu gosto de participar das reuniões, de algumas viagens. Tem reunião ali, eu vou. Uma viagem ali, se puder, eu vou. Foi assim que eu cheguei, devagarzinho, devagarzinho. E continuo aí no Movimento, no que eu puder ajudar. O Movimento pra mim tem muita importância, você assistindo, acompanhando o Movimento, as reuniões, você aprende muita coisa. Muita coisa que estava lá, adormecida, você vai lembrando. É importante a gente participar pra viver com os nossos direitos, nossas obrigações. </p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologia</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sem tecnologia você não vai a lugar nenhum. Pra quem gosta tem que correr atrás. Eu sou muito preguiçosa pra aprender, mas é importante. Tem que acompanhar o mundo. </p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Pronto, eu vim pra cá jovem, com meu pai, com minha mãe, com meus irmãos, que são assentados. E aqui fui ficando. Casei, construí minha casa, minha família. Tenho meu trabalho. Eu planto roça no terreno da minha mãe, dos meus irmãos.
  Quando chegamos aqui era uma mata, diz o povo que tinha até onça. Não tinha nada. Só mata mesmo. <i>Devagarzinho</i> foi mudando. Logo chegou energia, depois a  água encanada, Colégio para as crianças estudarem, e  foi melhorando. Se tem coisas boas, também tem coisas ruins no assentamento. Em qualquer lugar que você mora tem coisas boas.
</p>
  <p><strong>Aqui é um lugar bom de se morar. Eu gosto daqui. Eu não penso em sair daqui de forma nenhuma. </strong></p>

  `},
  // ------------------------------------------------------------------
  {
    id: "3",
    title: "Sou benzedeira, minha avó me ensinou",
    name: "Ivanilde",
    description: "Benzedeira e trabalhadora rural, moradora do Povoado São Bento em Salgado (SE). Diretora do MMTR-NE.",
    slug: "ivanilde",
    regionId: "SAL",
    mediaUrls: ["/images/stories/ivanilde.webp", "/images/stories/ivanilde-2.webp"],
    content:`
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Ivanilde Maria de Souza, 61 anos. Mulher negra, moradora do Povoado São Bento, estrada do Riacho Seco em Salgado (SE). Dona de uma história com tantas perdas familiares desde a partida de sua mãe ainda criança, encontrou acolhimento e junto a sua comunidade ajudou com sua herança de benzedeira e construiu sua família.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">"Sou uma trabalhadora rural. Não tenho terra, mas eu tenho meu quintalzinho aqui, trabalho no meu quintal. Me aposentei como trabalhadora rural. Sou benzedeira, minha avó me ensinou a rezar, ela rezava e fui aprendendo. Participo de vários grupos, da associação, da igreja, da Mãe Rainha. E atualmente sou diretora do MMTR-Ne, esse meu segundo mandato.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Minha infância</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A minha história é muito sofrida, mas superei. Eu nasci num lugar chamado Pé da Preta em Lagarto (SE). Desse lugar do Pé da Preta, saí de lá na faixa dos dois anos e sete meses. Vim pra um lugar chamado Teiú, lá comecei a me criar. Nesse Teiú a gente viveu na fome. Não tinha o que comer. Pra gente comer, ia pra o riacho que chamava Alvoroço pescar. E pegava os peixes, milho, torrava e fazia farinha, fubá, para comer com os peixes.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Depois, com dois anos minha mãe engravidou de novo. Dessa gravidez, ela passou muito tempo doente, durante a gravidez. Não tinha médico nessa época. E ela teve uma menina. No parto ficou mais mal ainda que não despachou. A parteira não teve como despachar. Não conseguia. Meu avô, pai de meu pai, morava em Riachão do Dantas, e de lá, ele soube e pegou e veio buscar ela. E levou ela pra Riachão. Ela e minha irmã.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha avó quando soube mandou vir buscar a gente. Quando chegou lá em Riachão, minha irmã só passou dois dias de nascida. Aí, a gente veio-se embora, junto com a minha avó, que se chamava Ilara, que é a mãe que eu conheci. Eu e meu irmão Rael que ficou se arrastando. Quando mãe foi liberada pra vir pra casa, viemos. Mãe chegou, como hoje, no Teiú, com três dias, piorou. Eu ia fazer três anos, mas lembro desse dia. Eu estava tomando banho no riacho Alvoroço, que passava na frente de minha casa, e o povo lá, lutando com ela, depois, chegou uma pessoa e me pegou. Minha filha, vamos pra cá. Quando chegou lá dentro, a mãe me pediu um beijo. Minha avó, a mãe do meu pai, que me falou tudinho isso. Aí, me pegaram e me baixaram perto dela e dei um beijo. Aí, ali mesmo, foi a despedida. Deus levou ela.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Fiquei morando com minha avó, a mãe do meu pai, Ilara. Meu pai não vinha quase em casa ver a gente. Pai não queria que eu estudasse. Não era pra estudar, mãe (avó) dizia, enquanto eu estiver viva, eles vão estudar. Só depois que eu morrer agora, aí você pode fazer o que você quiser com seus filhos, que eu não vou estar, é seu. Aí, continuo estudando no Tanque. Depois do Tanque, minha mãe (avó) adoeceu e faleceu.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Adolescência</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Fui morar no Açu (Lagarto) com meu pai e a madrasta, estava casado com uma mulher chamada Zefa. Foi aí que começou meu inferno, era explorada, tudo que fazia reclamava. Pra roça não prestava, pra dentro de casa não prestava. Era escrava. Tiveram dez filhos e os dez filhos foram todos eu que criei. Trabalhava, mas não pegava o dinheiro. Quem pegava o dinheiro era ela.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">E a roupa era duas roupas, uma no couro e uma no arame. Pra de tardezinha tirar aquela do arame e tomar banho e vestir. Para resumir, depois de uma briga feia com ela e meu pai ficou do lado dela, fugir, mas se não fujo, se não fujo de casa tinha sido estuprada pelo irmão dela, comecei a contar e ela disse que era mentira o irmão contou que era mentira.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Vim morar no Treze, também em Lagarto com uma tia, Judite era irmã da minha avó Ilara, aí fiquei na casa da tia Judite, quando eu tinha uns 20 anos, Deus levou. E desta forma vim morar no São Bento, Salgado. Fiquei trabalhando de doméstica em Aracaju, mãe Luzia me deu um terreno, um chão de casa lá embaixo (no povoado), mas tio Joãozinho lá embaixo não dar certo e em conversa com os filhos me deu esse chão, onde construir minha casa, eu não os amigos, construir através de mutirão, muitas pessoas ajudaram, agradeço a Deus primeiramente e abençoe todas as pessoas que me ajudaram e ainda que vem me ajudando até com uma palavra.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">O Movimento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha história com Movimento começa depois que estou aqui no São Bento. Foi através de Izaldira, ela me chamou pra cozinhar, eu e Marta, nesta etapa de cozinha então a Marta ficava brincando vai se aposentar como cozinheira, depois fui participando de outros momentos e foi uma superação, de cozinheira passei diretora, estou diretora do MMTR-NE pela segunda vez. Vim tendo espaço para contar histórias, comecei a escutar as outras e foi como uma terapia e fui superando principalmente medo de falar.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologia</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Muita coisa a gente que é agricultora precisa saber de tecnologia. Temos condições de mostrar que estamos aprendendo tudo. Apostar na nossa capacidade.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Quintal</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Meu quintalzinho de lado a minha roça é pouca, mas suficiente para mim, planto, minhas cebolinhas, meus coentrinhos, meus tomatinhos, aqui no quintalzinho. Meus chás de remédio. Também faço crochê.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Minha casa</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Era uma casinha pequena com um quarto e um banheiro. Cresci mais a casa, graças a Deus, mais um espaço, e meu quintalzinho que tem tudo.</p>

  <p><strong>O que me motiva aqui é porque aqui é muito calmo, e gosto muito daqui, do meu território aqui. Acho calmo, gosto muito daqui."</strong></p>
  `},
  {
    id: "4",
    title: "Tem que ser mulher, mas tem que ser feminista-aprovada",
    name: "Madalena Santana",
    description: "Militante desde os 15 anos, assentada há 35 anos no Assentamento Vitória da União. Ajudou a criar o MST, CUT e MMTR-NE em Sergipe.",
    slug: "madalena",
    regionId: "GLO",
    mediaUrls: ["/images/stories/madalena.webp", "/images/stories/madalena-2.webp"],
    content: `
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Vamos conhecer Maria Madalena de Santana, 63 anos, nascida em Nossa Senhora da Glória, no sertão de Sergipe. Ela é assentada há 35 anos no Assentamento Vitória da União. Mergulhar um pouco na sua história é também mergulhar na memória das lutas de resistência e por direitos desde o período da redemocratização do país. Militante desde a adolescência, ela ajudou a criar os principais movimentos sociais no estado de Sergipe. Participando dos processos políticos ativamente, engajou-se na luta pela terra, onde passou de sem-terra à assentada.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">"Meu nome de guerra é Madalena Santana. Nasci no sertão de Sergipe, desse imenso nordeste belo, nos anos 60. E o que lembro dos anos 60 e 70, foi uma grande seca, lembro muito bem porque a minha mãe chorou muito, porque quase todos meus tios foram tudo embora para São Paulo e para o sul. E ficou só a gente, outros tios e as avós, que eram idosas. Meus pais eram trabalhadores rurais sem-terra. Quem nasce no sertão, já nasce com a disposição de lutar pela vida. Lutar pela vida e ir lutando também para melhorar as condições da vida. A gente morava em uma comunidade e lá éramos uns dos mais pobres, então existia toda essa carga de discriminação que até hoje existe. Éramos nove filhos, seis homens e três mulheres, sou a do meio, entre os nove e entre as mulheres."</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Hoje sou assentada no Assentamento Vitória da União há 35 anos, quando a gente criou o assentamento em 1990. Sou mãe de duas filhas, também militantes.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Infância</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Meus pais eram trabalhadores rurais sem terra. Somos nove filhos. Meu irmão mais velho do que eu, morreu ainda pequeno. E meu outro irmão, Francisco, morreu já com oito, nove anos porque a gente não tinha acesso à saúde, não tinha água, não tinha nada. Então ficamos em sete irmãos. Foi daí que começamos a discutir e ver que o problema do sertão não era a seca, era a cerca.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Quando criança não estudei. Quando fui alfabetizada foi no Mobral (Movimento Brasileiro de Alfabetização) que hoje é equivalente ao EJA (Educação de Jovens e Adultos). Depois eu estudei na escola normal.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Meus dois irmãos mais velhos, não lembro da vivência de infância com eles, porque eles iam trabalhar com meu pai de alugado, que hoje chamam de diarista, eles que desbravaram as terras entre Nossa Senhora da Glória para Monte Alegre, para outro município distante, e ficaram lá a semana. Eles só vinham para casa no final de semana.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Início da militância nos anos 70</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Nos anos 70, a gente fazia parte do grupo de jovens ligados à igreja católica e como jovens fomos participar da luta da retomada de Santana dos Frades (Pacatuba-SE) e da resistência dos índios Xocós em Porto da Folha (SE). Começou lá.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Não tinha muita coisa na cabeça, mas eu só achava injusto o que estava acontecendo. E a gente fez muita campanha em Nossa Senhora da Glória para ajudar os posseiros e indígenas.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Naquele tempo, principalmente as meninas, sair era uma coisa brava. Mesmo assim a gente foi para essas lutas. Depois, já nos anos 80, já estava na luta pela redemocratização do país e a gente começou a participar de um monte de lutas.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">A gente fez a oposição sindical no sindicato rural de Glória e ajudou a construir a CUT- Central Única dos Trabalhadores e o Partido dos Trabalhadores. O Movimento Sem Terra foi a gente que trouxe para Sergipe.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Fizemos a primeira ocupação de terra em Barra da Onça, em Poço Redondo (SE) nos anos 80, e naquele corre-corre ia fazendo a luta também contra a Companhia de Saneamento de Sergipe (Deso) porque não tinha água. As pessoas pagavam, não tinha.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Assim passamos a viver vigiados. Na Barra da Onça, a gente só sai escondidos porque tinha muito jagunço atrás da gente também. E a luta foi acontecendo, os trabalhadoras/es foram entrando e discutindo e decidimos avançar para região Sul do estado que também tinham problemas como as/os catadoras/es de laranja, das crianças que quebraram pedra.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Aqui também existe a cerca, as pessoas eram exploradas porque eles não tinham terra.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Quem não tem terra não tem água.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu participei de todas as lutas, desde os meus 15 anos, inclusive de resistência à terra e de oposição de tudo. Era uma jovem e era menina, e tinha toda aquela carga de preconceito e o movimento veio me ajudar discutir e enfrentar esses preconceitos.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">As frentes de trabalho: emergências</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">As frentes de trabalho eram feitas nas fazendas dos fazendeiros, nas terras deles. Então, essa água quando chovia também era deles. E, naquela época, só os homens podiam se cadastrar para trabalhar, porque as mulheres não podiam. Segundo quem coordenava na época, diziam que as mulheres menstruavam e perdiam o dia de serviço. Então, a gente não tinha acesso a esse trabalho. Mas, a gente também já estava participando do sindicato rural e íamos para as barragens, de mulheres tinha eu e Lúcia que era minha cunhada fazer trabalho de base com as pessoas, falando sobre os direitos, o que estava errado, o que não estava e colocando o porquê daquela situação.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Movimento de Mulheres</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu e a companheira Yolanda, que ainda está lá em Nossa Senhora da Glória, tivemos o privilégio de ir para a primeira reunião na Paraíba de fundação e criação do MMTR Nordeste. Nunca me esqueço. Conheci Nazaré Flor e outras companheiras que já partiram também. E aí a gente começou a lutar.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Me achei enquanto mulher no MMTR, então esse é um movimento. E por ser do MMTR que, em 2017, tive o prazer e o privilégio de ir na caravana Lula pelo Brasil. Ele esteve aqui em Estância (SE) e representei as mulheres trabalhadoras rurais. Falei com o Lula, dei a bandeira do movimento para ele, porque tem muita assentada aqui, mas fui escolhida e me sinto privilegiada de falar com o Presidente Lula e dizer da importância do que foi e do que são as políticas públicas que o ele implantou nesse Brasil para as/os trabalhadoras/es de modo geral.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tem que ser mulher, mas tem que ser feminista</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha vida foi sempre marcada por grandes desafios, pela luta de se firmar enquanto mulher, enquanto trabalhadora e enquanto jovem porque ninguém acreditava e acredita na juventude. Eu era muito jovem, comecei com 15 anos a lutar e até hoje estou aqui na luta, vivendo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Políticas públicas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tenho duas filhas que hoje com as políticas públicas de acesso à educação e com todos os esforços que tivemos são formadas, uma em Direito e a outra em Assistência Social, para a gente é um orgulho ver essas meninas e outras meninas estudando e chegando lá. Fui abrindo espaços para outras e fui assumindo outras missões. Algumas infelizmente só acontece para as mulheres quando os filhos chegam.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Trabalho do Cuidado</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Agora é cuidar dos nossos pais. Já cuidaram da gente, a gente tem que cuidar dos pais. A mulher é sempre desafiada a tudo, é a grande criadora, a grande cuidadora da humanidade. Posso dizer porque cuido desde pequena, e quando chega mais pra frente vai ter que cuidar dos seus pais. Pra mim é um orgulho cuidar do meu pai.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Já éramos contra o uso de veneno, agora com mais consciência estamos entrando nessa linha da agroecologia e está legal a discussão com outras/os companheiras/os. Não são muitas ainda, mas vamos chegar lá. Eu acho que é por aí o caminho. Acho que a luta tem várias frentes e vários momentos e que a gente tem que estar em todas.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Mudanças</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Morar em Agrovila foi uma escolha por facilitar a organização social, inclusive das mulheres participarem. E facilita a chegada de energia, de água encanada. Na época isso era uma novidade, alguns não entenderam. Hoje é um espaço meio quadrado, que tem a intenção de fazer uma praça mais bela do que aqui já tem.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Assentamento como território</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No início foi a luta pela nossa permanência no assentamento porque também os coronéis, os fazendeiros e a polícia lá do sertão também tinha aqui e também veio atrás da gente.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">E a gente conseguiu. Aqui não era nada. Hoje, essa beleza que é o assentamento e o Priapu têm mais de 100 famílias. Fomos os pioneiros aqui no estado, em vários pontos fomos os pioneiros a brigar por água, por qualidade de vida. Estamos lutando pra melhorar e pra se firmar aqui, nesse pedaço que eu digo que é meu.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Também, na área da agroecologia, temos uma boa reserva de mato. Mas ainda faltam muitas condições para avançar na produção. Tem várias frutas plantadas e juntos querendo entrar nessa linha. Então, a minha roça, tirando meu fundo de casa, ela tem uma diversidade muito grande de frutas. Tá uma beleza.</p>

  <p><strong>Aqui é meu lugar, aqui é a minha vida, aqui foi que eu escolhi, eu escolhi vir para aqui, morar aqui, criar minhas filhas aqui e vou continuar aqui.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "5",
    title: "Venha o que vier, mas eu estou sempre sorrindo",
    name: "Rosa",
    description: "Doceira e agricultora de 58 anos, moradora do Assentamento Vitória da União. Mãe de três filhos, sempre sorridente e engajada no MMTR.",
    slug: "rosa",
    regionId: "GLO",
    mediaUrls: ["/images/stories/rosa.webp", "/images/stories/rosa-2.webp"],
    content: `
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Nada é mais contagiante que um sorriso, nos faz bem encontrar pessoas felizes. Esse é o convite para conhecer um pedaço da história de vida de Rosa, ou Rosivania Farias, 58 anos, mãe de três filhos, duas netas, e dona de risadas soltas que contagia quem está ao redor. Doceira de mão cheia, nos conta que herdou o gosto pela cozinha de sua mãe, também excelente cozinheira, com especialidade para comidas típicas Alagoana. Hoje vive dividida entre Sergipe e Alagoas.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">"Rosa é uma pessoa amigueira, sorridente, rio com o vento. Adoro fazer amizade, conhecer pessoas, interagir. E estou sempre feliz. Venha o que vier, mas eu estou sempre sorrindo. E Tenho três filhos, o Jefferson foi o primeiro depois do Jefferson veio a Aline, depois o Jonathan, que é uma benção, ele é filho do coração. Mas que eu amo da mesma forma, não tem diferença. E são minhas três joias raras. E agora duas netas que Deus me deu de presente agora. A Alice e a Maya.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sou agricultora e faço e vendo doces e salgados. Também vendo roupas, trabalho com vendas. E sempre estou buscando uma ajuda financeira, porque depois que a gente se aposenta é aquela quantia contada. E agradecer a Deus por ter. Mas a gente tem que sempre estar buscando, trabalhando para ter uma rendinha, não só depender daquele salariozinho."</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">MMTR</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Quando eu cheguei aqui, em Sergipe, que sou alagoana, mas nunca tinha participado de nada desses projetos. Quando cheguei aqui em Sergipe, conheci Madalena. E através de Madalena, foi que me engajei nesses projetos. Tive conhecimento do MMTR, comecei a participar de reuniões, viajar com elas, conhecer o dia-a-dia de outras pessoas fora. E assim fui me apegando a participar de todas as coisas que surgiam, que pudesse participar, estava presente. E me trouxe conhecimento enorme, eu achava que a mulher era só ser dona de casa, trabalhar, cozinhar, lavar, passar. E através do movimento eu tive outra visão da vida, que não só é isso, a mulher tem seus direitos, tem seus sonhos. E quando a gente busca, tem que batalhar para conseguir as coisas, realizar os sonhos. E através do MMTR a gente tem muitos conhecimentos, sabemos nossos direitos, os deveres. E assim, a cada dia, a cada encontro, a gente vai se aperfeiçoando, ganhando conhecimento. E foi assim que eu aprendi muitas coisas.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Uso tecnologia da comunicação</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">É importante as agricultoras aprenderem a usar as tecnologias porque facilita a vida. Como eu já falei, era difícil expor as coisas da agricultura, o que a gente vendesse, alguma coisa. E hoje em dia, com a tecnologia, as coisas ficam tudo mais fáceis. Você posta, divulga e vender os produtos.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção / Herança de mãe</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Estou trabalhando com doces, doces caseiros.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Aprendi a cozinhar, a culinária, com a minha mãe, porque ela cozinhava muito bem e eu peguei o gosto pela cozinha, porque eu estando dentro de uma cozinha, eu me realizo. Então, eu acho que foi isso, pelo gosto pela culinária da minha mãe.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Ela fazia muito bem, buchada, que é um prato típico lá de Alagoas, o povo gosta muito, e o doce de mamão com coco.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Assentamento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Agora, no Assentamento Vitória da União, está com muito sol e as está plantações estão penando, no momento, tem fruteiras, abacate, laranja, mexerica, quando eu cheguei, aí só tinha, no local, tinha muitas acerolas, só que dono antigo, cortou. Aí a gente foi replantando, aí plantamos as fruteiras que tem hoje, pé de coco, coco d'água, e, como é, bananeira, e as outras coisas que já tinha, que era o abacateiro e o Genipapo.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Vejo muitas melhoras, o calçamento, que facilitou a vida das pessoas, por não ter as estradas. Melhoraram muito. E cada dia, aos poucos, está melhorando.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Adaptações ao clima</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu vejo que as chuvas, principalmente esse ano, no tempo da plantação foi pouquinha, mas depois ela já chegou. Então, o tempo está mudando.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão de tarefas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu faço tudo em casa, costumo fazer tudo. Os filhos só levantam, forram a cama e pronto. Mas as outras coisas eu tenho mania de fazer tudo só. Eu não gosto muito de botar eles para fazer, mas eles sabem como são os deveres deles e sempre que pode ajuda.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Venda no aplicativo</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Então, quero sim. Vou achar os meus produtos que eu estou vendendo agora, os meus doces gourmet. A comunidade já comprou, e gostam.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Ultimamente eu estou fazendo doce gourmet, que é o doce de leite saborizado com morango, ameixa, geleia de maracujá, geleia de abacaxi. Então, eu estou fazendo agora esses doces. São fáceis. Você faz o doce batido e depois você saboriza com a geleia.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Quando a gente vem para um lugar morar, que a gente encontra pessoas boas, encontrar amigas, fazer amizade. sempre tem aquela motivação de continuar naquele lugar, para crescer com aquelas pessoas, buscar sempre as melhoras para a nossa comunidade, participar das coisas, principalmente das coisas da igreja, das coisas que Deus nos propõe a cada dia, que é servir ao nosso próximo.</p>

  <p><strong>E estar sempre engajada em todas as coisas que surgem, buscando dar o melhor para a nossa comunidade.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "6",
    title: "Me descobri a mulher que sou, me descobri como feminista",
    name: "Alba Rafaela",
    description: "Agroecóloga de 42 anos, moradora do Povoado Barro Vermelho em Nossa Senhora de Lourdes. Produtora de queijo artesanal e feminista.",
    slug: "alba-rafaela",
    regionId: "NLO",
    mediaUrls: ["/images/stories/alba.webp"],
    content: `
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Filha do semiárido e moradora do povoado Barro Vermelho, no Alto Sertão sergipano. Nasceu e cresceu na comunidade, onde viveu sua infância inteira e começou, ainda aos 12 anos, a trabalhar na roça junto à família.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">"Meu nome é Alba Rafaela de Andrade, tenho 42 anos solteiros, sou do município de Nossa Senhora de Lourdes, no Alto Sertão sergipano. Nasci e cresci nesse lugar. Vivi toda minha infância aqui, sempre muito ligada à roça e ao trabalho da terra.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na minha família, a gente cultivava em um sistema parecido com agrofloresta, onde tudo era cultivado no mesmo espaço, feijão, milho, abóbora, quiabo, macaxeira. Todo esse cultivo era para o nosso próprio sustento. Aos 30 anos, eu saí da comunidade para morar na capital, buscando estudo. Fiz faculdade de Agroecologia no Instituto Federal de Sergipe. Foram quatro anos de estudo e mais um tempo de trabalho na capital, embora não tenha trabalhado diretamente na área. Há cerca de seis meses, retornei para o campo, para meu município, onde trabalho na agroecologia e também na produção de queijo artesanal, um trabalho feito em família."</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Minha chegada ao MMTR</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Entrei no MMTR através de Gisélia, que conheci em um encontro da ASA. Foi ela quem me apresentou ao movimento. Desde 2010 participo dos espaços do MMTR. O movimento foi transformador na minha vida, me mostrou caminhos que eu não conhecia, me fez descobrir a mulher que eu sou e me descobrir como feminista. Para outras mulheres também é muito importante, porque ajuda a revelar nossa capacidade, dentro e fora de casa, e a importância da nossa liberdade e autonomia.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">A importância das tecnologias para nós, mulheres agricultoras</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Hoje, a tecnologia é essencial. Ela facilita divulgar nossos produtos, falar com familiares distantes, aprender coisas novas, acessar direitos e oportunidades. Mas também é importante saber usar, ter limite e usar a tecnologia ao nosso favor.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sobre o aplicativo que o MMTR está lançando junto com o Intervozes, acredito que ele vai ajudar muito as mulheres a conhecerem melhor as ferramentas, divulgar sua produção e enxergar a tecnologia como algo que pode fortalecer nosso trabalho e nossa autonomia.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No meu dia a dia uso WhatsApp, Instagram, Gmail, aplicativos de banco, sites de compras e outros que facilitam a rotina. Eu gosto muito de ler livros, não online. Para estudar, prefiro o livro físico. Pelo celular, gosto de assistir vídeos, ouvir coisas, usar aplicativos.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Nossa maior renda é o leite, criamos galinhas para consumo e venda de ovos. Não participamos atualmente de feiras, mas já vendemos produtos no PNAE anos atrás. Os queijos são vendidos por encomenda, na porta de casa ou para atravessadores. Temos sementes de abobora, fava e feijão de corda.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Terra, sementes, água e mudanças climáticas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A terra onde vivemos veio de herança. São cerca de 30 tarefas que eram usadas mais para o gado, e a roça nós fazíamos em terras de um fazendeiro, em troca de plantar palma para ele. Depois minha irmã comprou um terreno maior e a partir dai começamos produzir na nossa própria terra.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">O território como um todo melhorou muito. Hoje é um território forte na bacia leiteira na agricultura. Quase todo mundo tem um pedacinho de terra e uma vaquinha. O lado negativo é a monocultura do milho, que tomou conta e devastou a caatinga. Antes tinha diversidade de plantas e animais silvestre, hoje, o solo estar descoberto, muito uso de adubo químico que acaba prejudicando um todo.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A maioria das sementes a gente acabou perdendo principalmente o milho crioulo hoje a gente pega com vizinho, ou com minha tia, mais hoje plantamos pouco, atualmente estamos comprando milho para ração animal porque vimos que comprar sai mais em conta o custo é menor pra produzir hoje o milho é necessário alto investimento. O que mantemos mais é a semente da palma. A água chega encanada, vinda do Rio São Francisco. Para os animais usamos água de chuva guardada em barreiros. Temos cisterna e, quando necessário, também dependemos de carro-pipa. O clima mudou muito. Há anos de muita chuva e anos de pouca. Este ano choveu até setembro, o que é raro no semiárido.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão de tarefas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na nossa família somos três mulheres e um homem. Meu irmão é agente de saúde e mora em outro povoado, mas vem para tirar o leite. Depois disso, todo o trabalho na produção é feito por nós, as três mulheres. Minhas irmãs Renata e Rosimeire cuidam dos animais e da produção do leite. Eu fico mais com os cuidados da casa e do quintal. A produção do queijo começou por iniciativa da minha irmã mais velha, Rosimeire. Antes, a gente só vendia o leite. Ela decidiu começar a produzir o queijo para agregar valor ao produto, e deu certo. Minha irmã também cuida da roça e dos animais. Eu e minha irmã mais nova cuidamos da casa, limpar, cozinhar e ela também faz o queijo e administra a propriedade junto com minha irmã mais velha. Eu sou a única que não faço queijo, mas eu sei fazer, só não faço no momento. No meu caso, sou mais do cuidado com os afazeres de casa lavar cozinhar. Todas nós trabalhamos cerca de 10 horas por dia das cinco da manhã ate a cinco da tarde.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">O que me motiva é a família e o desejo de produzir alimentos orgânicos, oferecer comida de qualidade para as pessoas, especialmente para quem enfrenta problemas de saúde, pois a nossa alimentação é a nossa base para uma vida saudável. Também tenho o sonho de trabalhar com turismo rural.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">São ideias que precisam de estrutura e apoio, mas que guardo com carinho.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No momento estou no interior também porque estou desempregada. Se surgir uma boa oportunidade de trabalho fora, posso sair de novo, porém enquanto estou lá, sigo acreditando no potencial do território, da agroecologia e nas possibilidades que ainda posso construir no campo.</p>
  `},
  // ------------------------------------------------------------------
  {
    id: "7",
    title: "Aprendi a correr atrás dos meus objetivos, dos meus direitos",
    name: "Edna Rodrigues",
    description: "Trabalhadora rural e feirante de 45 anos, moradora da comunidade São Bento em Salgado. Aprendeu a lutar pelos seus direitos no MMTR.",
    slug: "edna-rodrigues",
    regionId: "SAL",
    mediaUrls: ["/images/stories/edna.webp"],
    content: `
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Trabalhadora rural e feirante, Edna Rodrigues dos Santos Celestino, 45 anos, natural de Salgado. Cresceu e se desenvolveu na luta. Correu atrás dos seus objetivos e dos seus direitos. Mora na comunidade São Bento, município de Salgado.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">"E hoje tô aqui. Aprendi a ser feirante. A necessidade ensina a gente, e eu aprendi."</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu também me encontrei na cozinha. Gosto de cozinhar. É uma das partes que mais gosto. Eu amo estar no forno, boto meu som e fico assando os produtos que vendo na feira.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Infância</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">"Sou uma trabalhadora rural, não tive infância quando era criança. Minha infância foi na roça."</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Filha mais velha de uma família de cinco irmãos. Seus pais são assentados da reforma agrária em Santa Luzia do Itanhy. Quando meu pai saiu de casa na luta, em busca de terra, foi a parte mais sofrida, vi minha mãe chorar. Chorava porque meu pai ganhou o mundo e ficou sozinha com três filhas. Depois que tomou posse da terra, voltou para buscar a gente.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">"Quando eu cheguei aqui com nove anos, não tive infância. Era só na roça. Da roça para casa, de casa para a beira do rio, lavar e pescar para comer."</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Vi o assentamento (onde meus pais moram) se transformar. Ainda criança, teve uma época que a associação construiu uma horta comunitária e eu era responsável pelas crianças do assentamento para as mães trabalharem. As mulheres se revezavam, cada uma era responsável pelo almoço do dia. Eu também trabalhei em uma roça de fumo que meu pai fez, e foi um período complicado, meu pai foi mordido de cobra e hospitalizado.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na adolescência e juventude jogava bola, mas meu pai era contra, dizia que bola era para homem. Eu e minhas irmãs saíamos escondidas, ele sempre descobria, mas nunca nos bateu.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Namorei, noivei e casei</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Antes de casar, passei cinco meses no Rio de Janeiro, "saí daqui em busca de uma vida melhor, que foi só ilusão. Sabe aquela história quando você sai achando que você vai encontrar um rio de leite e você não acha nada? Foi só ilusão." Quando retornei do Rio de Janeiro casei, construí uma família e fui embora do assentamento, voltei para o São Bento, Salgado.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tenho duas filhas, uma de 23 anos, casada e fazendo faculdade física, e outra de 17 que ainda estuda e mora comigo. Em casa divido as tarefas por três: eu, a filha e o marido. Quando ele tá em casa, tem que fazer, senão, a gente deixa a parte dele.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Autonomia</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Comecei a participar do movimento através de uma amiga. Ela chegou em casa e disse: "Vamos para reunião do movimento?". Eu pensei: vou sair de casa, nem que seja um dia. Fui, gostei e comecei a participar dos eventos. Através do movimento fui para Caruaru e Recife (PE), fui para Salvador e Juazeiro (BA) e para Brasília, tudo através do movimento.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No movimento eu aprendi a ter autonomia. Eu achava que a gente tinha que ser submissa ao marido, apesar de o meu nunca ter reclamado nem me proibido de fazer nada. O movimento é importante para mim porque até hoje eu faço parte e sigo aprendendo cada vez mais.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Participar da Marcha das Margaridas foi muito emocionante para mim. Eu nunca tinha ido, sempre tinha vontade, mas nunca dava certo. Antes eu não participava por causa do medo. No ano em que eu fui para marcha eu pedi muito a Deus para não ter problema com a asma. Eu tinha medo de ter uma crise no meio do caminho e dar trabalho às companheiras. Mas naquele ano foi diferente. Foi um ano em que eu me emocionei demais. Foi a primeira vez que viajei para Brasília, eu nunca tinha ido tão longe. Caminhar todo aquele percurso, naquele mundão de gente, foi uma emoção tão grande que eu nem senti o peso da caminhada. Eu não senti cansaço, só alegria de estar ali, fazendo parte da luta. Foi uma emoção grande caminhar junto daquelas mulheres. A gente chegou até o Palácio, e ver aquele monte de mulher marchando, todas na mesma luta, foi emocionante mesmo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologia</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Me ajuda a divulgar meus produtos, a ter notícias da família, participar de reuniões, a acessar as coisas do banco. Em minha casa uso wifi, ajuda muito.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Bolo de macaxeira, bolo de puba, tapioca, maracujá, laranja, couve, milho e amendoim, vendo boa parte da produção na feira da cidade. Já vendi também para o PNAE.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha roça fica no fundo da minha casa, onde moro. Antigamente era cheio de mato, e hoje é a terra onde produzo meus alimentos. Grande parte das sementes que uso eu ganho, e guardo também, fava, feijão de corda, milho e amendoim. Uso a água da chuva para regar minha plantação. Antes na comunidade não tinha água, a gente pegava de carroça, agora passa água da Iguá, tem a casa de farinha que voltou a funcionar, onde também aprendi a trabalhar, além da roça e da feira.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Antigamente o pessoal era mais unido. Hoje, a convivência já não é a mesma, com a política, o povo se dividiu. A maioria não tá mais naquela união que tinha antes.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6"><strong>Confesso que, se tivesse a oportunidade, voltaria para o assentamento onde meus pais moram.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "8",
    title: "Não me habituei bem em cidade, acho o sítio mais tranquilo",
    name: "Mariazinha",
    description: "Maria Elza, 38 anos, nascida no povoado São Bento, Salgado (SE). Servidora pública, licenciada em Geografia, empreendedora e catequista no Assentamento Vitória da União.",
    slug: "mariazinha",
    regionId: "ARA",
    mediaUrls: ["/images/stories/mariazinha.webp", "/images/stories/mariazinha-2.webp"],
    content: `
  <p>Maria Elza, 38 anos é nascida no povoado São Bento, município de Salgado, Sergipe. Trazida ainda criança para viver no recém criado Projeto de Assentamento Vitória da União em Santa Luzia do Itanhy, Elza vivenciou toda história da comunidade. Ela estudou, casou e por escolha continua sua vida no Assentamento com sua família, empreendendo e fortalecendo a juventude com seu trabalho catequético e associativo.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Cheguei aqui com quatro anos, ainda no início do assentamento. E aqui cresci, estudei. Fui estudar em Estância, Sergipe, e lá conheci o rapaz que hoje é meu esposo. Morei três meses em Estância, depois que a gente foi morar junto. Mas não gostei, não me adaptei, voltei para o meu lugar e trouxe ele. E aqui a gente construiu nossa família. Tenho um rapaz com 17 anos. Sou mãe de dois filhos, tive cinco gestações, três partos foram prematuros. O último foi um bebê que nasceu de seis meses que hoje em dia é a alegria da casa e a preocupação também. Como ele nasceu prematuro, tem suas limitações. Tem problema de visão e a gente sempre tem que estar levando nos médicos para que seja avaliado e ter um bom desenvolvimento. Depois que o mais velho nasceu, continuei meus estudos. Iniciei faculdade de licenciatura em Geografia. Sou licenciada em Geografia, também fiz Técnico Administrativo. Passei no concurso do município e hoje eu sou servidora pública. Atualmente estou trabalhando como monitora escolar por conta de um problema no joelho. Fui readaptada, porque sou concursada como servente. Agora estou cursando a faculdade de Pedagogia.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Também cuido do meu terreno, da minha rocinha, lá no sítio do meu pai, onde eu moro. Tenho couve, coentros, cebolinha plantada. E faço salgados para vender nos domingos. E bordados. Gosto muito de bordar.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Atividade na comunidade</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Além dessas atividades, eu ainda sou ministra da igreja católica. E coordeno um grupo de jovens, um coral de jovens. Sou da direção da Associação e agora estou no Conselho Fiscal.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Como era antes</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Quando eu cheguei no assentamento, ainda estava na fase de acampamento, ainda o pessoal estava com seus barracos, alguns de palha, outros já de barro. De taipa. E estavam na luta para conseguir a posse do terreno.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Infância</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A minha infância foi boa, aqui no sítio, brincando, ajudando meus pais na roça. Se arrebentando um pouco nas ladeiras, como criança, fazendo arte, estudando. Uma infância aproveitada.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">MMTR</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Cheguei no MMTR através da minha mãe e das minhas colegas que já faziam parte. A partir do momento que eu fui crescendo, fui chegando na adolescência. Eu comecei a participar também, e até hoje estou aqui. O movimento fortalece a luta feminina. E além de nos ensinar várias coisas, correr atrás dos nossos direitos e dos nossos objetivos.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologia</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A tecnologia pode me ajudar na divulgação dos produtos que eu tenho na roça. E também dos produtos que eu faço, facilitando também o comércio e a visibilização dos nossos produtos; para a gente não precisar estar saindo do nosso local para estar levando os produtos. Os produtos podem chegar a vários lugares por meio dessa tecnologia. Já uso alguns aplicativos como WhatsApp, Facebook, Instagram, Youtube, aplicativos do governo, aplicativos de música e também o da faculdade porque a minha faculdade é online. Uso bastante aplicativos da faculdade e e-mail.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Minha roça</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha roça fica no terreno do meu pai, onde ele cedeu para a gente morar e deu um pedacinho de terra onde eu planto e cultivo as minhas coisas. Quando eu cheguei para morar, ele já era um sítio de laranja, mas antes ele era mato. Aí o pessoal capinou e cultivou.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Quando eu cheguei para lá ele já era um sítio de laranja que meu pai cultivava, mas hoje em dia é só um sítio de laranja um pouco velho, porque os pés de laranja ficaram velhos e a gente não replantou. O que a gente tem ainda é da época que o pai plantou.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Nós já plantamos mangueira, jaqueira, cajueiro, várias frutas. Além disso, tenho galinha no quintal e cultivo as minhas hortaliças lá também.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território assentamento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">O território do assentamento desenvolveu bastante, cresceu e agora tem bastantes casas. Já chegou o acesso à rede elétrica, às novas tecnologias, mas em contrapartida também perdemos muitos da natureza, porque a partir do momento que o povo chega, começa a desmatar, a construir roças e muito da natureza vai se perdendo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Água</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A água vem pela tubulação de canos. A gestão é a comunidade que faz e tem o rapaz que liga todo dia a bomba para distribuir na rede das casas. Cada pessoa armazena em sua caixa d'água e da caixa d'água é distribuída para casa, para as torneiras de dentro de casa e para o banheiro. Antes a gente não tinha água encanada, a gente tinha que pegar nas cisternas ou então no rio. Com a água encanada ficou muito melhor, só que a partir do momento que vai chegando mais gente no povoado, vai aumentando, o poço não vai dando vazão suficiente para manter todas essas casas no verão. Aí no verão nós temos um pouco de dificuldade, porque aí o poço diminui a vazão e a água chega menos na casa do pessoal porque também o pessoal gasta mais. Nós temos a caixa que armazena 500 litros e dá para a gente passar uns três a quatro dias sossegados.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão trabalho</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Em casa, o serviço na maioria das vezes é dividido, mais o serviço da roça, na maioria das vezes fica só comigo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tempo de trabalho</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No meu trabalho eu fico oito horas por dia, em casa eu tenho o serviço do sítio que eu dou conta quando eu chego do serviço, e o serviço do lar, chego a trabalhar mais de 12 horas por dia.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Mutirão</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Existiam bastante mutirões da associação. Hoje em dia é mais raro, mas ainda acontece do pessoal se juntar para fazer plantios e mutirões no terreno um dos outros. Tem a casa de farinha que é tipo mutirão quando alguém vai fazer farinha.</p>

  <p><strong>Não me habituei bem à cidade, acho o sítio mais tranquilo e aqui eu posso cultivar as minhas verduras, posso criar meus animais, posso viver no meu cantinho e no meu sossego. Com sossego, com paz e a tranquilidade que a roça nos traz, e também o costume.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "9",
    title: "Eu sempre estive dentro do movimento",
    name: "Mariellen",
    description: "Josefa Mariellen Rodrigues Rosendo, 21 anos, nascida e criada na comunidade São Bento de Baixo, Salgado (SE). Estudante universitária, catequista e jovem militante do MMTR-SE.",
    slug: "mariellen",
    regionId: "SAL",
    mediaUrls: ["/images/stories/mariellen.webp", "/images/stories/mariellen-2.webp"],
    content: `
  <p>A jovem Josefa Mariellen Rodrigues Rosendo, 21 anos, nascida, criada e moradora da comunidade São Bento de Baixo, Salgado/SE, fala de como sempre fez parte do movimento, já que a mãe e as tias levavam para as rodas de mulheres desde muito nova.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sou uma pessoa curiosa e gosto de estudar. Fiz um curso técnico no IFS e hoje estudo física médica na Universidade Federal de Sergipe, no campus de São Cristóvão. E também vendo na feira do município produtos agrícolas que minha própria família produz. Moro com meus pais e meu irmão.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Uma experiência sem palavras</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Em agosto de 2023 eu participei da Marcha das Margaridas. Foi a primeira marcha da qual participei. Na época eu tinha 18 anos. Também foi a minha primeira viagem para fora do estado de Sergipe, tudo se tornou ainda mais marcante. Quando as mulheres do MMTR/SE apresentaram a proposta para nós, as mais jovens, eu fiquei muito animada. Para alguém que nunca tinha saído do estado, viajar justamente para Brasília, capital do Brasil, foi algo enorme. Foi revolucionário para mim, enquanto jovem. É até difícil colocar em palavras: foi muito emocionante. Para mim e para as minhas primas, que foram junto comigo, foi uma experiência sem igual. A gente nunca tinha saído daqui, então tudo foi novidade, tudo foi forte. Foi, realmente, uma experiência sem palavras.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Movimento da mulher</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu sempre estive dentro do movimento, comecei a participar quando tinha uns 12 ou 13 anos. Foi nessa idade que passei a participar ativamente do movimento. A gente, minhas primas e eu sempre estivemos relacionadas, mesmo que indiretamente. Às vezes até sem querer, porque como minhas tias participavam, elas sempre levavam a gente. Desde novinha eu sempre estive lá, envolvida no movimento da mulher, sempre muito imersa. A influência das minhas tias e da minha mãe, que também participou, foi muito grande. Elas tiveram um papel importante na minha participação hoje dentro do movimento. Tenho uma memória muito afetiva de uma almofadinha que minha mãe bordou para mim quando eu era pequena. Tenho uma vasta lembrança de que minha mãe, quando eu era mais novinha, ia para uns cursos de costura que o movimento disponibilizava aqui na fábrica da minha comunidade. Foi nesses cursos que ela aprendeu a bordar.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Comunidade em movimento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Dentro da comunidade, eu também participo dos movimentos e pastorais ligados à Igreja. Sou coordenadora do Ministério de Coroinhas, participo tanto da catequese quanto da pascom, e sempre que estão precisando de alguma coisa relacionada à organização ou à coordenação, eu ajudo. Eu estou sempre envolvida, e vira e mexe aparece ainda mais gente querendo participar. Então, assim, a juventude daqui da comunidade, é muito ativa graças a Deus. A catequese é subdividida entre cada catequista, com sua formação específica. Eu não sou professora, porque a gente não dá aula, a gente dá formação. Eu trabalho com a formação para a Pré Primeira Eucaristia, que é a etapa dos mais novos, aqueles que ainda estão aprendendo e entrando no mundo católico.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Apps</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu tenho vontade de vender nossos produtos por meio de um aplicativo, para facilitar e ampliar as vendas. Um dos produtos que eu faço é o pé de moleque. Na minha casa tem dois aparelhos de celular e um notebook. A internet é via wifi, usamos pra estudar, email, sistema da universidade. Uso apps de banco, redes sociais, sites de compras, canva e tudo que a internet pode me proporcionar.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Relação com a terra</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minhas avós, tanto do lado materno quanto paterno, sempre foram trabalhadoras rurais, é daí que vem minha relação com a terra. Minha avó paterna vive do trabalho com a castanha de caju e a ameixa, acompanhando todo o processo, desde a queima até o preparo para a comercialização. Já minha avó materna dedicou a vida ao cultivo de alimentos nativos, como mandioca, maracujá, goiaba, feijão, laranja e coco. Meu avô, hoje falecido, também contribuiu para essa história, trabalhando no plantio de fumo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu e minha família dedicamos de 6 a 12 horas por dia ao plantio e colheita do que plantamos. Produzimos também puba, macaxeira, quiabo, maxixe, coentro, couve, pitomba, goiaba, dicuri, coco, cocada, malcasado, pé de moleque e beiju.</p>

  <p><strong>Viver aqui significa continuar cuidando e fortalecendo as relações coletivas.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "10",
    title: "Me sinto alegre, me sinto sadia",
    name: "Tide",
    description: "Eroltidis Alves Rodrigues, 68 anos, moradora de São Bento de Baixo, Salgado (SE). Mãe, avó e agricultora que começou a trabalhar na roça aos oito anos.",
    slug: "tide",
    regionId: "SAL",
    mediaUrls: ["/images/stories/tide.webp", "/images/stories/tide-2.webp"],
    content: `
  <p>Popularmente conhecida por Tide, começou a trabalhar na roça aos oito anos de idade, teve uma infância forte, viva e inesquecível. Estudou até o terceiro ano do ensino fundamental.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Meu nome é Eroltidis Alves Rodrigues, tenho 68 anos e moro na comunidade de São Bento de Baixo, município de Salgado, Sergipe. Cheguei aqui com 15 anos de idade. Antes, morava no Curralinho, município de Lagarto. Vendi na feira de Salgado e Lagarto por mais de vinte anos, além do trabalho na roça.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu sou mãe e avó. Tenho três filhos vivos, perdi dois. Tenho oito netos, e ainda crio um menino que considero como neto, mesmo não sendo de sangue. Ele chegou até mim com 11 meses, no dia da missa de sétimo dia de um dos meus filhos que faleceu. O menino ficou comigo e nunca mais saiu. Hoje com 19 anos, cresceu comigo desde o primeiro ano de vida.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha infância foi muito sofrida, com muita pobreza, mas ao mesmo tempo cheia de alegria. Quando a gente é criança, não sente o peso das dificuldades. Era uma infância pobre, mas feliz. Lembro do aroma do café que a gente plantava, torrava e guardava de um ano para outro. Nada de comprar no mercado: feijão, farinha, milho, batata e café, tudo era da roça. Papai só ia à feira para comprar carne.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Participação</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Cheguei ao movimento por convite de Izaldira. Fui para uma reunião e achei muita coisa bonita e importante, porque antes a gente não tinha informação nenhuma. Hoje eu participo do grupo da igreja, da associação da comunidade e sou socia do movimento da mulher trabalhadora rural de Sergipe.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Marcha das Margaridas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu tinha um sonho há muito tempo, de participar da Marcha das Margaridas. Na primeira oportunidade, eu ia viajar, mas meu marido estava doente e acabei no hospital com ele. Fiquei muito triste. Depois apareceu outra chance, e eu fui. Agradeço muito a Izaldira, que sempre teve jeito de convencer a gente a participar, a sair de casa, a ir para os encontros. A Marcha das Margaridas foi um dos eventos mais bonitos e importantes que eu já vivi. Não me arrependo. Sei que não dá para ser tudo perfeito com tanta gente, mas tem muito mais positivo que negativo. Toda mulher que vai ganha aprendizado, força e coragem. Eu já fui duas vezes e, se Deus permitir, ainda quero ir mais.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologias</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A tecnologia me ajuda muito. Quando quero saber alguma coisa, vou no Google e pesquiso. No meu dia a dia uso WhatsApp e Facebook. Em casa temos três aparelhos celulares, um para cada. Não tenho computador, mas em casa tem Wi-Fi, que a gente usa só nos celulares. Eu prefiro assistir as coisas, porque para escrever tenho dificuldade.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão de tarefas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Em casa, sou eu quem faço tudo. Acordo 5h30 da manhã e só paro 17h30 da tarde. Trabalho o dia inteiro, embora more três pessoas na casa.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na minha roça eu planto mandioca, feijão, batata e milho. Hoje em dia trabalhar na roça está mais fácil. Antigamente a gente sofria muito mais. Até hoje guardo semente de feijão, fava, feijão de corda, feijão da arranca. Além da roça, também faço ameixa de caju, agora só uma vez por ano. Muita gente da comunidade compra. A ameixa de caju é simples, mas dá trabalho. Tiro o fundinho do caju, tiro o lugar da castanha para não ficar preto, lavo e furo para botar na panela. Já o doce de caju é mais difícil, tem que espremer, tirar a pele, e o caju tem que ser bem durinho para prestar. Já vendi ameixa de caju para a prefeitura de Salgado, para programas do governo. Cheguei a ser convidada para feiras, até para ir a Aracaju, mas não fui.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Antepassadas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Aprendi receitas e remédios com minha mãe. Eu faço lambedor com canudinho, alho, cebola, erva-vaca e manjericão. Cozinhava, coava, botava açúcar e deixava engrossar. Dava aos meus meninos e, graças a Deus, eles nunca tiveram pneumonia.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha roça é no Riacho Seco. Antes era muito mais difícil. As estradas ainda são ruins, mas melhoraram bastante. A vivência também mudou. O que piorou foi a mata, as árvores acabaram. Antes as estradas e rios eram cobertos de árvores, hoje quase não se vê um pé de pau, o povo corta tudo. A água é de cisterna. Sobre viver aqui, nunca pensei em sair. Praticamente me criei aqui, gosto muito do São Bento. Meu marido, Zé, falava em ir embora, mas eu nunca quis. Acho muito bom morar aqui: é sossegado, sem violência.</p>

  <p><strong>O São Bento é um lugar bom de viver, tranquilo, e daqui eu não saio.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "11",
    title: "Sou agricultora a vida toda, e vivo assim",
    name: "Genilda Correia",
    description: "Agricultora assentada e artesã, 61 anos, uma das iniciadoras do Assentamento Vitória da União em Santa Luzia do Itanhy (SE). Há 35 anos construindo comunidade através do trabalho coletivo.",
    slug: "genilda",
    regionId: "ARA",
    mediaUrls: ["/images/stories/genilda.webp", "/images/stories/genilda-2.webp"],
    content: `
  <p>Agricultora assentada e artesã, Genilda Correia, 61 anos, mãe, avó, é uma das iniciantes do Assentamento Vitória da União em Santa Luzia do Itanhy (SE) há 35 anos. Em busca de um pedaço de terra ela e sua família acabou construindo uma comunidade e nos conta como os trabalhos coletivo com as mulheres contribuiu para a resistência e superação das dificuldades nos primeiros anos de assentamento e sua luta para sustentar a sua família.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu sou uma mulher guerreira. Vim aqui para o Assentamento ainda nova com 25 anos. E tive meus filhos, meus três filhos aqui. Quer dizer, tive dois. Uma eu já trouxe, criei meus filhos aqui, trabalhando na roça, de foice, de machado, de tudo. E vivo aqui. Vi nascer essa comunidade participando das coisas. Nasci no Lagoão, em Salgado (SE), depois vim pra Povoado Tombo, também em Salgado, tinha uns 16 anos. Eu vim para aqui através da reforma agrária, já tinha gosto pela terra e vim em busca de uma. Quando chegamos fizemos um barraco de lona e fiquei morando, depois trouxe minhas coisas, um pouco de coisa. Ficamos morando num barraco uns dias, depois resolvemos fazer uma casa de taipa. Na casa de taipa e fomos viver lá, assim, uns três anos ainda. Depois viemos morar aqui na agrovila.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tenho três filhos e quatro netos, a mais velha é a Josielma que sempre ficou aqui comigo. E os outros, uma casou, foi morar na Bahia, e o mais novo está morando em São Paulo, ele tem vontade de morar aqui, mas a mulher é de lá e nunca veio aqui, ainda.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sou agricultora a vida toda, e vivo assim. Hoje eu já estou aposentada como agricultora. Com minha mãe aprendi a fazer artesanato, ela fazia a peneira e eu aprendi com ela. A gente fazia muito, quando a gente estava em casa, era fazendo Arupemba. Mas hoje é que eu não faço mais, muito trabalhosa. Ainda faço vassouras de palha.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Participação</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Cheguei no Movimento (MMTR) através do Movimento Sem Terra- MST, a convite de Madalena, Vera, Edson que sempre são os cabeças que estão por frente das coisas. Edson era meu vizinho, eu morava lá no Tombo. Muitas coisas eu já sabia sobre agricultura, eu já sabia quase tudo. Desde que eu casei, desde nova, eu já sabia que os direitos eram iguais. Quando era menina, eu já sabia, já via as coisas erradas que o pai fazia com a minha mãe. Eu já tinha noção daquele tempo. Que um homem, ele pode ter o valor dele, ele quer ser o tal, mas a mulher tem os direitos iguais. Porque mesmo que o homem trabalhe, a mulher trabalha também. Então a gente tem que ter os direitos iguais. Na minha visão, toda vida o direito pra Deus é igual. É porque o povo do mundo é um povo desgraçado, preconceituoso.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Uso das TICs</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tenho internet em casa. Mas não uso muito não. Eu uso, mas pra ligação, mando áudio, isso eu sei. Estou aprendendo a ler e assistir. Se Madalena mandar um negócio no grupo da igreja, ou no grupo do EJA também vejo. Mas acho melhor ouvir áudio. Horácio só atende. Ele não faz uma ligação, ele não sabe fazer uma ligação. Você acredita? E ele sabe ler.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">A vida no assentamento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tenho um terreno maior, o lote grande que era mato. Horácio ia trabalhar no coletivo e eu ficava tirando pau pra construir minha casa, pra fazer a casa, fazer a roça. E eu sempre não esperava por ele. Plantava maracujá, e ele ia comigo fazer a flor. Tudo isso eu fazia.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Agora a gente ficou mais velho, mais cansado, a melhora é que eu estou aposentada e não trabalho tanto assim, me acabando tanto.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">O sítio já foi feito, mas tem coisas pra fazer, melhorou. Antes não tinha finanças para comprar as coisas, meu marido trabalhava muito, mas não tinha condição financeira de comprar o alimento certinho. A gente fazia tudo de um jeito para garantir o sustento da casa. Eu pescava, eu fazia minhas coisas pra comer, plantava verduras, couve e quiabo, tudo isso eu fazia. Sempre criei minhas galinhas pra ter um ovo pra comer. Toda vida plantei o que comia.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Antigamente tinha muito trabalho de grupo, coletivo, eu sinto falta. Quando tinha roça para limpar íamos todas, Madalena, Vera, Lopa, Didita, um monte de mulher que iam pra roça e aquele serviço ficava feito e hoje? Somente eu. Todas participavam e eu gostava. Era animado. Eu tenho bananeira, tenho pé de coco. Lá no sítio não tenho muito não, mas aqui no meu quintal eu tenho quase tudo. Tem jaqueira, nós plantamos. Tem laranjeira.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">As sementes</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">As minhas sementes eu guardava, mas hoje eu não guardo mais. As vezes compro e também recebo do governo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Adaptações</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A água aqui é encanada. No verão, eu gosto de desviar as águas de uso da casa, quando tá o lugar seco faço outro desvio da água para aquela planta que já tá mais seca. Um pé de cana, um pé de bananeira. Faço essas adaptações. Em relação ao tempo, a mudança é que eu tô mais velha, estou mais cansada e eu não tô fazendo muita roça. Assim, tem uns tempos que chove direto e outros tempos que não. Esse ano mesmo o inverno custou foi muito a vim. A gente veio plantar as coisas já bem tarde, porque a gente plantava, aí batia um solzão e morria. Eu plantei um bocado e vinha o sol e as coisas morria.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão de tarefas e tempo de trabalho</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sim, a gente divide. As vezes eu mando varrer a casa enquanto eu lavo os pratos. Quando eu saio, ele faz, esquenta a comida, cozinha o feijão, cozinha a carne. Na verdade, eu trabalho o dia todo. Se for para trabalhar, não paro, mas faço o que tenho vontade de fazer.</p>

  <p><strong>Eu moro porque eu sou resistente, eu não gosto de estar me mudando pra lá e pra cá. Gosto de morar aqui.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "12",
    title: "Eu posso servir a alguém",
    name: "Maria Renilde",
    description: "Maria Renilde de Santana, 69 anos, povoado Matatas, Salgado (SE). De cor parda, mãe de sete filhos e viúva duas vezes, orgulhosa do seu roçado cheio de fruteiras e de vida.",
    slug: "maria-renilde",
    regionId: "SAL",
    mediaUrls: ["/images/stories/maria-renilde.webp"],
    content: `
  <p>Maria Renilde de Santana, 69 anos. povoado Matatas, Salgado (SE) de cor parda, mãe de sete filhos e viúva duas vezes, ela relata vida de muito trabalho desde criança, da dor pela perda trágica dos seus, mas sem perder a alegria e disposição de trabalhar, viver em comunidade e servindo a quem a procura, está nas rodas de mulheres. Orgulhosa do seu roçado cheio de fruteiras e de vida.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">O povo daqui me conhece bem, tem quarenta e dois anos que moro aqui, sou amiga de todo mundo aqui graças a Deus, não tenho inimigos porque eu posso servir a alguém. Participo da Associação da comunidade dos grupos. Eu morava em Poço Verde (SE) mas com vinte e sete anos eu vim pra cá e estou aqui. Vai ser bom as pessoas conhecerem minha história. Desde criança, dos meus dez anos, trabalhava com meus pais na roça, trabalhavam muito. Depois, quando eu tinha dezesseis anos, me casei. Já fui trabalhar com meus pais e meu marido na roça. Depois disso, com vinte e quatro anos, perdi meu marido. Os cigarros mataram, na minha casa. Balearam ele, levei pra hospital em Salvador, passou um mês e oito dias sofrendo. Fiquei grávida, com quatro meses de grávida. Meu filho nasceu, graças a Deus, com todo o sofrimento, ele nasceu. Fiquei com três filhos, dois já tinham nascidos e um na barriga e fui vivendo. Três anos depois me casei outra vez e vim embora pra cá. Tá com quarenta anos que eu moro aqui. Aqui, graças a Deus, fui vivendo, trabalhei muito. Além dos três filhos que vieram comigo tive mais quatro, então tive sete filhos. Agora está com três anos que o marido morreu, e estou viúva outra vez. Duas vezes. Trabalhei muito aqui, ainda hoje faço umas besteirinhas, mais cansada, com dores nos braços, nas pernas, mas tô indo. Meu filho ia pra feira em São Cristóvão (SE) vender as coisa, às vezes eu ia junto, mas três, quatro vezes, mas também mataram meu filho lá, outra dor. Depois disso nunca mais fui lá.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">O MMTR</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">As meninas daqui que participam, me levavam e fiquei gostando, depois, saí, comecei a não ir. Agora vou só para igreja aqui. Estou cansada.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Minha roça</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha roça aqui mesmo na Matatas, a minha terra era lá no sertão (Poço Verde) mas lá era muito seco. Mas sempre tinha um inverninho, a gente fazia muita plantação de milho, feijão, batata, amendoim, mandioca, tudo que a gente fazia lá. Depois eu vim embora pra cá e a gente ficava fazendo a mesma coisa. O meu marido mesmo aqui plantava muita macaxeira. Plantava roça de milho, feijão, batata. O terreno aqui é pouco, não chega a três tarefas, então plantava aqui e plantava no terreno do vizinho. No meu terreno tenho macaxeira, tem banana, tem jenipapo, tem mandioca, milho, feijão, abacate, tem laranja, tem caju, tem coco e tem mangueira.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Acesso as TICs</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Não uso muito essas coisas da internet (redes sociais) porque eu não sei ler. Mas uso telefone e tenho WI-FI. Eu procuro muita coisa no telefone, vejo muita coisa. Sem saber ler, eu entendo um bocado de coisa, mas não leio porque eu não sei ler, procuro as minhas coisas e eu assisto, porque pra eu ler mesmo, eu não sei ler.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">As sementes</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A gente pegava as frutas que a gente comia, plantava e nascia. As laranjas a gente comprava pra plantar. E a maioria foi nascida aí dentro. Os coqueiros foram plantados também. No verão a gente não faz plantação porque é muito quente essas coisas dão no inverno, em tempos de chuva.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tarefas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Em casa por enquanto faço tudo, mas já estou cansada e pensando em procurar uma pessoa para me ajudar. Já trabalhei muito. Trabalhei muito pra criar meus filhos. Quando eu cheguei pra aqui, eu tinha uns 27 anos.</p>

  <p><strong>Gostei daqui. E pra eu sair daqui mesmo só quando Deus quiser, na horinha dele, eu vou.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "13",
    title: "Eu sou insistente e persistente",
    name: "Solange",
    description: "Solange dos Santos, 46 anos, mulher negra, moradora do Assentamento Vitória da União, Santa Luzia do Itanhy (SE). Agricultora guerreira que construiu sua identidade através da insistência e persistência.",
    slug: "solange",
    regionId: "ARA",
    mediaUrls: ["/images/stories/solange.webp", "/images/stories/solange-2.webp"],
    content: `
  <p>Quer conhecer um pouco da história de Solange dos Santos, 46 anos, mulher negra, que se fez na vida a partir da sua insistência e persistência, rompendo os próprios medos para construir sua identidade e autonomia, amparada pela força do acolhimento de outras mulheres e sua comunidade, hoje cheia de vida e liberdade, reconhecendo suas capacidades.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Meu nome é Solange dos Santos. Moro aqui no Assentamento Vitória da União, município de Santa Luzia do Itanhy (SE). Sou mãe de três filhos, duas mulheres e um homem. Cinco netos. Os três estavam lá, morando em Minas Gerais. Mas agora as duas filhas estão aqui, com os quatro netos. E tem um lá. Ficou o mais novo lá, com a filha. Graças a Deus, estou aqui, rodeada dos quatro netos, que antes estavam longe. Estou rodeada dos quatro netos, graças a Deus.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Vou contar um pouquinho da minha história. Me acho assim, sou uma guerreira. Sou uma mulher que quando eu quero alguma coisa, corro atrás. Quando quero alguma coisa não aceito não como resposta. Sou insistente e persistente. Quando eu quero buscar algum objetivo, para mim. Gosto de trabalhar na lavoura. Sou agricultora. Mas também estou trabalhando na escola. Mas, assim, o meu foco é a agricultura. Eu gosto muito de trabalhar com a terra.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Importância do MMTR-SE</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Conheci o movimento de mulheres (MMTR-SE) já faz muitos anos. Que eu não conhecia. Foi através de Madalena e Verônica, foram elas que começaram a me chamar para os movimentos. Eu ficava com nervoso de sair, não tinha o costume de sair de casa. Era bem mais nova. E não saía de casa. Na época, meus filhos tinham o quê? Uns 10, 11 e 12 anos por aí. Na época que comecei a sair. Assim, mesmo com aquele nervosismo. Não sabia de nada. Que na época não sabia ler e nem escrever. Na verdade, eu não sabia nem fazer o meu nome direito. Então, foi a partir daí do Movimento de Mulher. Fui, digamos, me abrindo mais um pouco. Aí, aprendi o meu nome. Aprendi também, aos pouquinhos, a conhecer dinheiro, que também não sabia. Não sabia fazer compra. Não conhecia nada, assim, de dinheiro. Não tinha experiência nenhuma, na época. E aí comecei a sair. Esses movimentos, ir para as reuniões. Realmente, comecei a gostar, a pessoa vai tendo conhecimento. Que é muito bom o conhecimento para a pessoa. Carol, foi através daí que aprendi a enfrentar a vida.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu planto algumas coisinhas, couve, coentro, cebolinha e também vendo no Programa de alimentação Escolar-PNAE, no município pela associação e no Programa de Aquisição de alimentos- PAA. Minha roça fica no fundo da minha casa. Quando cheguei aqui logo no início, era só mato. Comecei a vir com os meus pais e os meus irmãos, não tinha casa. Para fazer roça, tinha que roçar, essas coisas. E aí começou a construir as coisas. Fez um barraco de palha. E nesse barraco de palha foi ali que a gente passou a morar, a cama era de vara. O barraco era tapado de barro coberto de palha. Melhorou muita coisa. Estamos morando muito bem. A tecnologia avançou bastante para a gente. Temos água encanada, luz, telefone, tem wi-fi.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">A semente</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A semente que eu planto, que é a couve, a gente sempre bota as mudas, ou tira os fios das plantas mais velhas e as vezes compra já a muda. Também guardamos algumas sementes como quiabo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Uso Tecnologia da Informação e Comunicação - TIC</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tenho um telefone que está pedindo arrego. Também já tem mais de seis anos que eu comprei. Mas é digital, minhas filhas pagam e compram as coisas todas pelo telefone. Eu uso o WhatsApp para conversar e mandar mensagem. Redes sociais quase não uso, gosto de mexer no Facebook. Mas tenho alguns aplicativos de lojas, para escutar música e assistir mensagens. Mas tenho mais facilidade com os áudios.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Uso da água</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A água é encanada, mas para as plantações a gente usa dessa água no rio Priapu. No verão a produção diminui, mesmo molhando o rio por causa do consumo de energia elétrica. Agora estou pensando em comprar um kit solar para o verão continuar com minhas plantações e plantar mais coisas.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">As chuvas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tem época, quando a chuva é demais a adaptação que a gente faz com a lavoura, na hora do plantio, aí a gente planta diferente. É adaptação que a gente faz. Aí, às vezes, a gente costuma plantar assim, diferente, para não embebedar as plantações. E quando a chuva também é pouca, aí a gente faz da outra forma para segurar aquele pouco de chuva que tem na plantação, já faz o plantio diferente, leira diferente. Com a chegada do verão, o mato que você for limpando, vai deixando encostado nos pés da plantação, porque ali conserva a planta molhada e a terra também que ali já ajuda o solo não ficar muito ali no sol pegando.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão de tarefas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Somos os dois, eu e Juraci, um ajuda o outro. Porque ele vai trabalhar lá embaixo, lá na roça, e aí vou também. Aí ele limpa, e a minha parte, eu gosto de plantar. Sei plantar do meu jeitinho, de limpar também, vou limpando e vou ensinando para ele, ele é teimoso, eu digo e botando mato no pé das plantas, então a gente ajuda um ao outro. Ele ajuda aqui dentro de casa também, na limpeza da casa, ele me ajuda também, e assim vai.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tempo de trabalho</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na verdade, trabalho, assim, começo às seis e meia, ou mais cedo do que isso, saio daqui seis e vinte e volto para casa doze e vinte. Aí chego em casa, tomo um banho, almoço, e aí descanso um pouquinho, aí a gente vai lá para baixo, e aí trabalho, assim, digamos que umas três, duas e meia, e volto umas cinco, cinco e meia, por aí.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Sobre o aplicativo</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Ainda não sei, mas a gente vai aprendendo conforme o aplicativo vai usando, é uma forma de divulgar nossas coisas. A comunidade compra umas coisas minhas.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Vida na comunidade</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Então, o que me motiva eu continuar aqui no meu território, no nosso território, é o acesso de pegar carro, é bom que fica pertinho, se pessoa quiser ir a qualquer lugar é só ligar e pegar na porta. Outra coisa é sossego, porque aqui é um lugar bom de morar, graças a Deus. Teve uns momentos que deixou a gente com medo, quando chegaram às oito, nove horas já estava todo mundo dentro de casa. E agora não, graças a Deus acalmou e se quiser a pessoa fica até dez horas fora de casa conversando.</p>

  <p><strong>Então aqui é um sossego.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "14",
    title: "Eu sou uma militante agroecológica, feminista e antirracista",
    name: "Vera",
    description: "Maria Verônica de Santana, 58 anos, assentada no Assentamento Vitória da União, Santa Luzia do Itanhy (SE). Representa a Articulação Nacional de Agroecologia e integra a Rede Feminismo e Agroecologia do Nordeste.",
    slug: "vera",
    regionId: "ARA",
    mediaUrls: ["/images/stories/vera.webp", "/images/stories/vera-2.webp"],
    content: `
  <p>Sertaneja, filha e neta de agricultores, conhecida por Vera. Mãe de três filhos e tem um neto. Sua vida é marcada pela militância. Participou do Movimento Sem Terra e depois se envolveu profundamente com o Movimento da Mulher Trabalhadora Rural (MMTR). Em sua trajetória, passou por espaços regionais, estaduais e nacionais. Hoje representa a Articulação Nacional de Agroecologia no Conselho Nacional de Desenvolvimento Rural Sustentável e integra redes como a Rede Feminismo e Agroecologia do Nordeste. Coautora do Livro Ecos de Búzios.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu sou Maria Verônica de Santana, 58 anos, há 35 anos sou assentada aqui no Assentamento Vitória da União, município de Santa Luzia do Itanhy, Sergipe. Meus pais eram agricultores sem-terra e foi aí que começou meu envolvimento nas lutas e da luta pela reforma agrária. Conquistei um pedaço de terra, cheguei aqui com um filho, depois tive mais dois, e aqui construí minha família com meu companheiro. E desde então, a gente desenvolve nossa vida aqui nesse assentamento. O meu filho mais velho, de um relacionamento anterior, mora aqui perto e é pai do meu neto. É pedagogo e policial civil em Alagoas. Minha filha do meio é mestre em sociologia e trabalha em Minas Gerais com assessoria técnica para as atingidas e atingidos por barragens. O mais novo, cursa Engenharia Agronômica e vive entre a universidade e a vida aqui no assentamento. Sou uma militante agroecológica, feminista, antirracista. Essas são as principais pautas da minha militância.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Vida em movimento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha relação com o MMTR começou ainda no sertão, logo após a redemocratização. Minha irmã e outra companheira participaram da criação do movimento no Nordeste. Quando me mudei para este assentamento, reencontrei novas companheiras já engajadas no MMTR e fui me aproximando das atividades. Em 2006, fui eleita para a direção regional e, a partir daí, assumi várias tarefas ao longo dos anos, representação, coordenação, secretaria executiva. Foram mais de dez anos dedicados a fortalecer o movimento em Sergipe e no Nordeste. Vivi, dentro do movimento, um período importante da política brasileira, os primeiros governos Lula, a construção de políticas públicas que transformaram a vida das mulheres rurais, como a documentação da trabalhadora, a titularidade da terra e os programas sociais. Também vivemos o golpe com a presidenta Dilma, primeira presidenta do Brasil. Retrocessos, desgoverno e uma pandemia, mas o movimento nunca deixou de lutar. Hoje estamos nos reorganizando e voltando a ocupar espaços de incidência. Uma das maiores transformações promovidas pelo movimento é o acesso das mulheres ao espaço público, viajar, participar de formações, conhecer outras realidades, romper com padrões de isolamento e dependência. Isso amplia horizontes e fortalece a autonomia.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Transformação na vida das mulheres</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">As mulheres tem uma coisa que eu sempre falo no movimento, que uma das coisas mais difíceis para as mulheres é sair do espaço privado, do espaço da casa, do roçado, e ocupar o espaço público. E também, essa é a coisa mais difícil para as mulheres deixarem os seus afazeres, deixarem tudo para sair de casa, para ir para a luta, para ir conhecer outras mulheres, para ir conhecer outras experiências. Mas também, eu acho que é o maior avanço das mulheres. Então, é muito comum as mulheres dizer assim, hoje eu viajo, hoje eu sou dona da minha vida, hoje eu sou dona do meu nariz, eu já fui para Brasília, para a Marcha das Margaridas, eu já fui para Recife, não sei para onde. Então, acho que é muito forte isso. E isso não é uma coisa pequena, isso é uma coisa muito importante, porque você vai ver que na sociedade vão ter mulheres que têm até mais recurso financeiro, mas que não têm essa liberdade, ou que nunca saíram do seu lugar.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologias ancestrais</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Nós, as trabalhadoras e os trabalhadores, sempre desenvolvemos tecnologias. Tudo que hoje faz parte da nossa própria sobrevivência, dos nossos modos de vida, é uma tecnologia, pensando que na tecnologia é um modo de fazer, de transmitir, que tem vários conhecimentos, que tem um passo a passo, mas quando se trata da tecnologia da comunicação, essa não foi pensada por nós, nem foi pensada para nós, mas que ela se torna muito presente e muito necessária na nossa vida, porque várias coisas que a gente precisa acessar hoje na sociedade passam pela internet, passam pela comunicação, e aí precisamos nos apropriar dessa tecnologia. Desde as tecnologias da produção, de produzir o alimento, de plantar, o modo como plantar, que é um modo pensado a partir dessa realidade local aqui, e a gente foi experimentando de como plantar na nossa terra, as tecnologias do preparo do alimento, no nosso caso é de base agroecológica, as tecnologias que a gente usa dos saberes para garantir a nossa saúde, e desde as várias tecnologias que a gente também acaba acessando que são as tecnologias desenvolvidas pela própria sociedade, pelo próprio mercado. Pensar em tecnologia desses dois âmbitos, que são as tecnologias ancestrais e que são as tecnologias já produzidas pela sociedade como um todo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A gente tem um processo de implantação de uma agrofloresta. Tem o nosso roçado que produzimos de tudo um pouco. Além das culturas de subsistência que são milho, feijão, macaxeira. A macaxeira, praticamente, a gente tem quase todo ano aqui, tem diversas frutas, parte dessas frutas que são nossas, a gente faz polpas e já consegue vender na alimentação escolar, junto com outros companheiros e outras companheiras da Associação. Vendemos as polpas no PNAE (Programa Nacional de Alimentação Escolar). E também vendemos no PAA (Programa de Aquisição de Alimentos), macaxeira, inhame e coco.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p><strong>Mantemos viva a esperança de um futuro mais justo para nós, mulheres trabalhadoras rurais.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "15",
    title: "Sou agricultora e cuido do meu quintal",
    name: "Ducarmo",
    description: "Maria do Carmo da Cruz Andrade, 49 anos, moradora do povoado São Bento, Salgado (SE). Agricultora, guerreira e cuidadora, nunca deixou de cuidar do seu quintal.",
    slug: "ducarmo",
    regionId: "SAL",
    mediaUrls: ["/images/stories/ducarmo.webp", "/images/stories/ducarmo-2.webp"],
    content: `
  <p>Vamos conhecer a história de Ducarmo, nascida e criada na comunidade e teve sua mãe como inspiração de vida. Casada e tem um único filho de 17 anos.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Meu nome é Maria do Carmo da Cruz Andrade, tenho 49 anos e moro no povoado São Bento, estrada Riacho Seco, no município de Salgado, Sergipe. Nasci aqui mesmo no povoado e sou filha de uma mulher guerreira, que ficou viúva aos 30 anos e me criou sozinha. Vivo aqui desde que nasci, sempre na roça, embora já tenha trabalhado fora da agricultura em alguns períodos da minha vida. Mesmo quando trabalhei fora, nunca deixei meu quintal.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Eu continuo lutando</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Depois de um tempo meu marido, que também é agricultor começou a ter problemas de saúde sérios. Ele ficou agressivo, impaciente, e não dormia mais à noite. Ele foi diagnosticado com esquizofrenia bipolar, uma doença difícil, que o tornou dependente de mim. Hoje ele vive em tratamento e não pode ficar sozinho. Por isso eu não viajo muito e, quando preciso sair, tenho que ir com ele ou deixar alguém de confiança. Essa situação afetou meu filho e eu. Meu filho começou a ter insônia, medo, se escondia dentro de casa quando o pai chegava alterado nas crises. Ele precisou passar por psicólogo e psiquiatra, e graças a Deus hoje está bem melhor. Já dorme só, no quarto dele, apaga a luz, coisas que antes ele não conseguia fazer. Por conta de tanto estresse e preocupação desenvolvi diabetes mellitus. E eu continuo lutando, porque Deus é Deus, e ele nunca desampara ninguém.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Meu quintal</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sou agricultora e cuido do meu quintal produtivo, onde planto couve, cebolinha, coentro e um pouquinho de cada verdurinha. A semente eu sempre guardo para replantar. Meu quintal também tem fruteiras: bananeira e mangueira. Mesmo quando trabalhei fora, nunca deixei meu quintal. Fui agente de saúde da minha comunidade por contrato e tenho muito orgulho do trabalho que realizei. E mesmo trabalhando em outra atividade nunca deixei cuidar do meu quintal, que sempre foi parte de mim. Não tenho horário para trabalhar, não. Toda hora é hora.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Dia a dia</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na minha casa, por eu ser mãe de menino, eu costumo dizer que meu filho tem que estar preparado, não é porque ele vai ajudar nas tarefas de casa que ele vai deixar de ser homem. Por isso, até hoje, as divisões de tarefas em minha casa são divididas. Não só com meu filho, mas o marido também. E assim seguimos. A água aqui é da iguá, a antiga Deso. Percebi que as coisas mudaram um pouco com relação a chuvas e o plantio. Antes plantávamos mais cedo, hoje fico esperando o tempo da chuva. Mas a gente continua na fé, plantando conforme Deus permite.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Antepassadas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Aprendi muito com minha mãe, principalmente sobre remédios caseiros. Tenho sempre no quintal um pé de guaraná, que é base para uma receita que aprendi com ela: o setidô. Quando alguém está com dor de barriga ou mal-estar, a gente ferve cinco folhinhas e toma o chá. É tiro e queda.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Participação</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Conheci o MMTR-Sergipe através das companheiras Aparecida, Izaldira e Rosa, que faziam reuniões aqui no povoado, no colégio e no centro comunitário. Elas me convidaram e, com o tempo, voltei a participar do grupo e do movimento. Passei alguns anos afastada, coisas do dia a dia, e hoje voltei a participar, até participo do grupo do movimento. Tenho sonho de participar da Marcha das Margaridas, e tenho fé que ainda vou. Além do movimento, também participo do grupo de senhoras da igreja, aqui mesmo na comunidade. Fui secretária da associação do São Bento e hoje faço parte do Sindicato dos Trabalhadores Rurais de Salgado, no conselho fiscal.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologia</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">As tecnologias me ajudam muito, principalmente no acesso ao conhecimento. No dia a dia, uso bastante o WhatsApp. Em casa temos três celulares, todos digitais, um computador e internet Wi-Fi. Costumo acessar o WhatsApp, Facebook, YouTube, aplicativos de banco, do governo e sites da escola do meu filho. Gosto de ouvir, assistir e ler as mensagens, todas as formas de usar eu gosto.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Antes morava com minha mãe, depois que casei passei o primeiro ano morando com minha mãe. Depois fui morar no povoado Taboa, no assentamento São José, aqui mesmo em Salgado, morei um ano lá, depois voltei para o Riacho Seco. Minha mãe me deu um pedaço de terra e foi onde construí minha casa. O que me motiva a continuar no meu território é a minha família e o sossego do meu lugar. Aqui tenho amigos, vizinhos, família.</p>

  <p><strong>A comunidade inteira é como se fosse uma grande família para mim.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "16",
    title: "Eu vim pra cá ainda pequena",
    name: "Josielma",
    description: "Josielma Ferreira, 37 anos, filha de assentados e moradora do Assentamento Vitória da União, Santa Luzia do Itanhy (SE). Agricultora e mãe de três filhos.",
    slug: "josielma",
    regionId: "ARA",
    mediaUrls: ["/images/stories/josielma.webp", "/images/stories/josielma-2.webp"],
    content: `
  <p>Josielma Ferreira, 37 anos, filha de assentados e moradora do Assentamento Vitória da União, município de Santa Luzia do Itanhy (SE), agricultora e mãe de três filhos. Que considera que são as bênçãos que Deus lhe deu. Também se considera uma pessoa legal e guerreira.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu vim pra cá ainda pequena. Quando cheguei, aqui era cheio de barracos. A gente morava em uns barracos mesmo, dormia em cama de vara. Era tudo muito simples, mas era o que a gente tinha.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Lembro que quando cheguei aqui (Vitória da União) tinha muita árvore, muita fruta. Era diferente do que é hoje. A comunidade cresceu muito, agora está cheia de casas. Muita coisa mudou com o tempo, para melhor, de certa forma, porque ficou mais desenvolvido para algumas coisas, tem mais gente, mais movimento. Mas também teve coisa que piorou. Hoje o que mais pesa é a falta de trabalho, de renda. Não tem oportunidade para todo mundo, quero trabalhar, mas não consigo. Isso é o que mais me preocupa hoje.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu moro na roça, num sítio lá em cima, onde tenho minha casa. Trabalho na roça, e faço o que aparecer. Se tiver serviço, eu faço. Trabalho do que achar, o que tiver para fazer, tô fazendo. Quando aparece um dia para ganhar, eu vou também, para ganhar o meu dia. Assim a gente vai levando a vida. Às vezes também faço meu trabalho como manicure. Gosto de morar aqui, é um lugar bom de se viver.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Jornada diária</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na roça, planto algumas sementes e guardo outras. As sementes vêm do que planto e colho. Quando dá para guardar, guardo para o plantio do ano seguinte.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Uso da Água</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A água que uso vem do poço, é encanada, uso para beber, tomar banho e limpar a casa. Tem a água que reaproveito para aguar as plantas, os pés de cana, e o que tem na plantação ao redor da casa.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Adaptações</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">O tempo está mais seco, o tempo do plantio mudou, percebi a diferença e tento me adaptar, reaproveitando a água e cuidando do que dá para cuidar. Planto e muitas vezes apodrece, como a mandioca, ou morre seco. Também crio galinhas no quintal. O cuidar das plantas aprendi com meus pais e avós, como dicas de saúde com as ervas naturais, erva Cidreira, capim santo, boldo, chá de sete dor e outros.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Comunidade</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na comunidade sempre participo das atividades coletivas, associação, grupo da igreja e do movimento de mulher. Cheguei no movimento ainda criança, acompanhando minha mãe, e outras mulheres que sempre me convidam, e eu vou, gosto de participar, assim também na associação. Participar do movimento mudou a minha forma de ver as coisas. Conhecer lugares, conhecer novas coisas, como cultivar, como plantar, sobre as tecnologias para mulher agricultora.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Faço quebra-queixo para vender. Vendo na comunidade e fora. É uma cocada feita com coco, limão e açúcar. E gostaria de poder vender minha produção no aplicativo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Acesso a internet</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Na minha casa tem três celulares digitais, não tenho wi-fi, o uso da internet é através dos dados moveis, na maioria das vezes é ruim, mas é o que tem. Meus filhos usam mais, eu mesmo não uso para muitas coisas, uso whatsApp, gosto de ouvir áudios, ver vídeos e mensagens. Facebook, youtube. Tenho email, mas só para algumas coisas. Tem também Gov.br e o aplicativo da caixa.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão de tarefas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Em casa divido as tarefas com meus filhos. Eles lavam os pratos e ajudam nas coisas. Às vezes eu nem quero mandar, mas tenho que mandar, né? Porque a casa dá trabalho, e todo mundo tem que ajudar um pouquinho. Para quem é dona de casa, o trabalho nunca para. Trabalho o dia inteiro, e mesmo de noite ainda estou tocando alguma coisa, cuidando, arrumando, pensando no que fazer.</p>

  <p><strong>Minha vida é aqui. Minhas raízes estão aqui. Cresci, aprendi, crio meus filhos e continuo lutando nesse lugar.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "17",
    title: "Eu me considero uma pessoa especial",
    name: "Marta",
    description: "Marta Feitosa dos Santos, 68 anos, moradora da comunidade São Bento de Baixo, Salgado (SE). Artesã, escultora e apaixonada por plantas.",
    slug: "marta",
    regionId: "SAL",
    mediaUrls: ["/images/stories/marta.webp", "/images/stories/marta-2.webp"],
    content: `
  <p>Vamos conhecer a história de Marta, artesã, escultora quando jovem e apaixonada por plantas.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu sou Marta Feitosa dos Santos, tenho 68 anos, moro na comunidade São Bento de Baixo, município de Salgado, Sergipe. Eu me considero uma pessoa especial, boa, educada e comunicativa. Eu sei me expressar onde chego. Não tenho inimigos. Gosto de tratar bem todo mundo. Estudei até a oitava série, então completei o ensino fundamental. O ensino médio eu não cheguei a começar.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Movimento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Entrei no MMTR através de Izaldira. Foi ela quem me chamou para participar, e eu aceitei. Sempre que posso participo, até já teve dois eventos aqui no meu terreiro (quintal). Eu gostei muito. As vezes também participo em outras comunidades, até tenho a carteirinha de sócia guardada em casa. No movimento tenho minhas amigas também, que fiz e ainda faço. E também participo da associação de moradores.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Internet</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A internet me ajuda bastante. Através dela eu consigo falar com a família, divulgar os produtos e resolver muitas coisas sem precisar sair de casa. Antes, a gente tinha que ir pessoalmente para tudo. Hoje, com o celular, ficou bem mais fácil. Eu não sei mexer muito, mas quando não sei, peço ajuda a Andresa (nora). O que uso muito são WhatsApp e o Facebook. Gosto muito do Face, ainda mais porque aqui tenho Wi-Fi. Tenho um celular digital, e na casa são dois aparelhos. A internet é via Wi-Fi e eu uso só no celular. Eu costumo acessar a internet falando e escrevendo, mas prefiro falar, porque é mais rápido.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Terra, produção e saberes artesanais</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Nossa propriedade tem sete tarefas de terra, a roça atrás de casa. Quando cheguei para morar aqui, há 41 anos, era tudo diferente: havia muito mais fruteiras, cajueiro, mangueira, jaqueira. Com o tempo, muitas se perderam, mas ainda temos algumas. Nós plantamos mandioca, milho e outras culturas. As sementes são, em grande parte, nossas, às vezes compramos milho, mas a mandioca é plantada da própria manaíba, e dela fazemos a farinha. Eu trabalho com artesanato, especialmente bordado em ponto cruz. Já trabalhei com cerâmica, aprendi com a mãe de um rapaz que namorei quando jovem, que era escultora. Eu achava lindo o trabalho dela. Comecei lixando, queimando e polindo as peças, até aprender a fazer sozinha. Depois aprendi o bordado com uma cunhada minha, que me ensinou tudo. Hoje faço toalhas e peças bordadas. Vendo e recebo até pelo PIX. O pessoal da comunidade compra também, toalhas, o que eu faço eles compram.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Jornada diária</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu trabalho o dia todo. Você sabe, mulher nunca para. O homem vai para roça, volta, toma banho e descansa. A mulher não, ainda tem casa, comida, tudo para cuidar.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p><strong>O que me motiva a continuar morando aqui é o amor que tenho por este lugar. Moro aqui há 41 anos e não tenho vontade de ir para cidade. Gosto da paz, do silêncio, de acordar com os passarinhos e as galinhas cantando. Antigamente era bem mais quieto, mas mesmo assim ainda prefiro aqui. Quando vou para cidade, não aguento o barulho. Aqui é meu lugar.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "18",
    title: "A educação transforma a vida das pessoas, assim como transformou a minha vida",
    name: "Izaldira",
    description: "Izaldira Celestino, 55 anos, professora, agricultora e liderança na comunidade São Bento, Salgado (SE). Uma das fundadoras do MMTR-SE e protagonista da campanha 'Nenhuma Trabalhadora Rural Sem Documento'.",
    slug: "izaldira",
    regionId: "SAL",
    mediaUrls: ["/images/stories/izaldira.webp", "/images/stories/izaldira-2.webp"],
    content: `
  <p>Vamos conhecer Izaldira Celestino, uma professora agricultora e liderança em sua comunidade São Bento, na cidade de Salgado, SE. Ela é uma das fundadoras do MMTR-SE, participou ativamente da Campanha "Nenhuma Trabalhadora Rural Sem Documento" realizada pelo MMTR-NE nos anos 90 e que desde 2023 virou uma política pública.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sou professora, sou mãe de um filho de 24 anos que é nutricionista. Sou casada há 30 anos. Há 55 anos, convivo aqui na minha comunidade. Além de ser professora, sou coordenadora da associação comunitária aqui do povoado de São Bento. Participo da organização da Igreja Católica da comunidade. Moro na minha comunidade, escolhi viver aqui, independente da moradia. A luta pela igualdade e a sobrevivência da minha comunidade é muito mais importante. Também sou agricultora, sou filha de agricultor, sou filha de agricultora, sou uma das seis filhas, minha mãe também é agricultora, onde fez questão de colocar suas filhas para estudar, na qual também não tinha nenhuma formação educacional. Eu fui uma das minhas irmãs que me formei na Universidade Federal de Sergipe, e assim como agricultora e filha de analfabeta, me orgulho hoje ter a educação que transforma a vida das pessoas, assim como transformou a minha vida, transformou a vida do meu filho também.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Infância</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Não tinha muito acesso às coisas, especialmente a questão da educação, até porque na comunidade em que a gente morava, a gente não tinha muita opção para estudar. A gente tinha que sair da comunidade e estudar na cidade. Tinha que ir a pé para estudar, e isso dificultava muito a nossa forma de aprendizado. Uma outra coisa também era a questão de partilhar os nossos brinquedos e as nossas formas de brincar. Trabalhávamos bastante também, a nossa vida era durante o dia a gente trabalhava, na parte da manhã a gente estudava ou trabalhava, e à tarde a gente trabalhava. Ou trabalhava de manhã ou trabalhava tarde, a gente sempre tinha algumas opções de horário, mas era muito complicado para a gente estudar. Mas minha mãe nunca deixou que a gente deixasse de frequentar a escola, mesmo com as dificuldades financeiras, ela queria que as suas filhas frequentassem a escola. Meu tio sempre dizia que filho de pobre não estuda, só trabalha, e minha mãe sempre dizia minhas filhas vão ter a oportunidade que eu não tive na minha vida. E assim a gente foi estudando, foi estudando, e aí minhas irmãs também conseguiram estudar, todas conseguiram estudar. Eu admiro muito.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">MMTR</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Moro aqui nessa comunidade, onde há luta e organização pela igualdade das mulheres trabalhadoras rurais. Para mim é um símbolo importante, a luta das mulheres, na qual é uma bandeira que eu escolhi, e para mim enquanto mulher. Desde 1997, escolhi estar dentro das organizações sociais, especialmente do MMTR, onde a gente começou a trabalhar, foi através da apresentação da minha companheira Inês e minha amiga Cléia, elas eram do Centro Dom José Brandão de Castro-CDJBC, elas vieram fazer uma visita na nossa comunidade, e aí perguntou se a gente não queria fazer reunião com as mulheres. Começamos fazendo as rodas de conversas, e hoje, há mais de 30 anos, não me arrependo de hipótese nenhuma de ter entrado na luta pelas mulheres, tenho participado de outras atividades, de algumas marchas, de algumas lutas, e não me arrependo, porque eu sei que o MMTR também tem transformado a minha vida, a minha forma de pensar, a minha maneira de agir.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Campanha Documentação</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Começamos a discutir a Campanha Nenhuma Trabalhadora Rural Sem Documento, e a gente foi percebendo que isso não era só um problema das nossas mulheres, que tinha na nossa comunidade, que por incrível que pareça, todas elas tinham título de eleitor, mas não tinham um registro e não tinham outro documento, e aí isso foi marcante pra nós também, as nossas companheiras contribuíram bastante para que a campanha Nenhuma Trabalhadora Rural Sem Documento fosse alavancada, mesmo porque não foi só as mulheres daqui, houve contribuição também de outras comunidades também daqui do município, e de outros município como de Lagarto. E assim, a partir daí, a gente foi vendo que as mulheres, elas não eram vistas somente para cuidar da casa, dos filhos, mas elas também começaram a perceber que elas também precisavam cuidar da comunidade. O MMTR também tem contribuído bastante nessa questão da autonomia das mulheres. Hoje, olhando pra juventude, que já passaram pelas mães, que tá chegando hoje, é bem diferente, e eu atribuo isso à luta pela soberania das mulheres mesmo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologia da comunicação</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Com o avanço da tecnologia, a gente foi observando que houve muitas mudanças na vida das mulheres, no comportamento mesmo da comunidade, porque a gente tinha muita dificuldade na questão da comunicação, dentro da organização social, dentro do município, dentro da comunidade. Com o avanço da tecnologia, a gente foi percebendo que não existe mais diferença entre o campo e a cidade. Para se ter acesso a comunicação, eu preciso estar na cidade? Não. A tecnologia chegou até o campo, e isso melhorou bastante a vida das mulheres, a vida das pessoas da comunidade. E outra, veio a questão não só do celular, e outros meios de comunicação, os aplicativos mesmo, tem melhorado bastante a vida e o relacionamento entre as pessoas, a comunicação entre as pessoas.</p>

  <p><strong>Mas, com as oportunidades que é nos oferecida, a gente vai vendo que a gente pode nos comunicar, e vivenciar a luta, e vivenciar também a situação de outras mulheres que passam pelos mesmos problemas que a gente passa também na nossa comunidade, no nosso grupo.</strong></p>
  `},
];

  export async function seedStories(prisma) {

    for (const story of storiesData) {
      let createdData = {
          id: story.id,
          title: story.title,
          name: story.name,
          description: story.description,
          slug: story.slug,
          content: story.content,
          region: {
            connect: { id: story.regionId }
          },
          media: {
            create: story.mediaUrls.map(url => ({
              media: {
                create: {
                  id: uuidv4(),
                  media_type: MediaType.IMAGE,
                  url: url,
                }
              }
            })),
          },
        }
        let updatedData = {
          slug: story.slug,
          title: story.title,
          name: story.name,
          description: story.description,
          content: story.content,
          region: { connect: { id: story.regionId } },
        }
      await prisma.story.upsert({
        where: { id: story.id },
        update: updatedData,
        create: createdData,
      });
    }
    const allStories = await prisma.story.findMany();
    console.log('Story model fields:', prisma._dmmf?.modelMap?.Story?.fields.map(f => f.name));
    return allStories;
  }
