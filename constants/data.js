const expressions = [
  { term: "Estar com a cabeça nas nuvens", meaning: "Estar distraído, desatento ou sonhando acordado.", example: "Ele não ouviu nada, estava com a cabeça nas nuvens." },
  { term: "Chover no molhado", meaning: "Falar ou fazer algo que é óbvio ou repetitivo, que não muda nada.", example: "Explicar isso de novo é chover no molhado." },
  { term: "Custar os olhos da cara", meaning: "Ser extremamente caro.", example: "Aquele celular novo custou os olhos da cara." },
  { term: "Tirar de letra", meaning: "Fazer algo com extrema facilidade.", example: "Ele estudou muito e tirou a prova de letra." },
  { term: "Trollar", meaning: "(Gíria da internet) Provocar ou enganar alguém por diversão.", example: "O amigo dele o 'trollou' fingindo que tinha esquecido seu aniversário." },
  { term: "Cringe", meaning: "(Gíria da internet) Algo que causa vergonha alheia ou constrangimento.", example: "A dança que ele fez na festa foi muito cringe." },
  { term: "Biscoiteiro(a)", meaning: "(Gíria da internet) Alguém que faz postagens para chamar a atenção e ganhar 'biscoitos' (curtidas/elogios).", example: "Ele postou aquela foto só para ganhar biscoito." },
  { term: "Ficar de boa", meaning: "Estar calmo, relaxado, sem problemas.", example: "Não se preocupe, estou de boa." },
  { term: "Meter o pé na jaca", meaning: "Exagerar, cometer excessos (especialmente em comida, bebida ou festa).", example: "No fim de semana, ele meteu o pé na jaca e comeu três fatias de bolo." },
  { term: "Pagar o pato", meaning: "Levar a culpa por algo que não fez ou ser o único a sofrer as consequências.", example: "O time todo jogou mal, mas só o goleiro pagou o pato pela derrota." },
  { term: "Engolir sapo", meaning: "Ter que aceitar ou ouvir algo desagradável sem poder reclamar.", example: "Tive que engolir sapo na reunião para não arrumar briga." },
  { term: "Ficar pistola", meaning: "(Gíria) Ficar muito bravo, irritado.", example: "Ele ficou pistola porque o computador travou no meio do trabalho." },
  { term: "Dar B.O.", meaning: "(Gíria) Dar problema, dar errado.", example: "A impressora parou de funcionar, vai dar B.O. com o chefe." },
  { term: "Mandar a real", meaning: "(Gíria) Falar a verdade, ser direto e sincero.", example: "Vou mandar a real para ele: a ideia não é boa." },
  { term: "Sem tempo, irmão", meaning: "(Gíria) Expressão usada para dizer que não tem paciência ou tempo para algo.", example: "Ele veio com desculpas, mas eu 'tô sem tempo, irmão." },
  { term: "Crush", meaning: "(Gíria) Pessoa por quem se tem uma atração ou interesse romântico.", example: "Meu crush me mandou uma mensagem hoje!" },
  { term: "Shipar", meaning: "(Gíria da internet) Torcer para que duas pessoas formem um casal.", example: "Eu 'shipo' muito aqueles dois personagens da série." },
  { term: "Flopar", meaning: "(Gíria da internet) Fracassar, não ter o sucesso esperado.", example: "A festa que ele organizou 'flopou', quase ninguém foi." },
  { term: "Lacrar", meaning: "(Gíria da internet) Fazer algo de forma impressionante ou definitiva, geralmente em debates ou discussões online.", example: "Ela lacrou na apresentação e todos ficaram impressionados." },
  { term: "Vazar", meaning: "(Gíria) Ir embora, sair de um lugar.", example: "Vamos vazar daqui antes que comece a chover." },
  { term: "Chutar o balde", meaning: "Desistir de algo, perder o controle, abandonar uma situação ou reagir com raiva" , example: "Trabalhei tanto o ano inteiro, que no fim do ano eu chutei o balde e não respondi mais e-mails." },
  { term: "Ficar de cara", meaning: "Ficar surpreso ou chocado com algo.", example: "Quando ele soube da notícia, ficou de cara." },
  { term: "Pisar na bola", meaning: "Cometer um erro ou falha, especialmente em uma situação importante.", example: "Ele pisou na bola ao esquecer o aniversário dela." },
  { term: "Dar um perdido", meaning: "Evitar alguém ou desaparecer sem avisar.", example: "Ele me deu um perdido na festa ontem." },
  { term: "Ficar na mão", meaning: "Ser abandonado ou deixado sem ajuda em uma situação difícil.", example: "Ele ficou na mão quando o carro quebrou no meio da estrada." },
  { term: "Fazer tempestade em copo d'água", meaning: "Exagerar a importância de um problema pequeno.", example: "Ela fez tempestade em copo d'água por causa de um atraso de cinco minutos." },
  { term: "Dar um jeitinho", meaning: "Encontrar uma solução criativa ou improvisada para um problema.", example: "Mesmo com poucos recursos, ele deu um jeitinho de consertar o carro." },
  { term: "Quebrar o gelo", meaning: "Fazer algo para aliviar a tensão ou iniciar uma conversa em uma situação desconfortável.", example: "Ele contou uma piada para quebrar o gelo na reunião." },
  { term: "Ir de Arrasta", meaning: "(Gíria) Algo acabou, morreu ou deu muito errado", example: "Depois daquele escândalo, a carreira dele foi de arrasta." },
  { term: "Puxar o saco", meaning: "Elogiar ou bajular alguém de forma exagerada para obter favores.", example: "Ele sempre puxa o saco do chefe para conseguir promoções." },
  { term: "Encher linguiça", meaning: "Falar ou fazer algo desnecessário apenas para preencher tempo ou espaço.", example: "O palestrante ficou enchendo linguiça por horas sem dizer nada importante." },
  { term: "Ficar de molho", meaning: "Descansar e se recuperar, geralmente após uma doença ou lesão.", example: "Depois da cirurgia, ele ficou de molho por duas semanas." },
  { term: "Dar pano para manga", meaning: "Gerar muita conversa, discussão ou controvérsia sobre um assunto.", example: "A decisão do juiz deu pano para manga na comunidade." },
  { term: "Ficar na seca", meaning: "(Gíria) Estar sem algo que se deseja, especialmente em relação a relacionamentos ou sexo.", example: "Depois do término, ele ficou na seca por um bom tempo." },
  { term: "Pagar mico", meaning: "Passar vergonha ou fazer algo embaraçoso em público.", example: "Ela pagou mico ao esquecer o nome do colega durante a apresentação." },
  { term: "Pisar em ovos", meaning: "Agir com muito cuidado para evitar problemas ou ofender alguém.", example: "Ele estava pisando em ovos durante a reunião com o chefe." },
  { term: "Ficar de olho", meaning: "Observar atentamente algo ou alguém.", example: "Vou ficar de olho nas promoções da loja." },
  { term: "Dar um tempo", meaning: "Fazer uma pausa ou intervalo em uma atividade ou relacionamento.", example: "Eles decidiram dar um tempo no relacionamento para pensar." },
  { term: "Ficar na boa", meaning: "Estar em paz, sem preocupações ou conflitos.", example: "Depois de resolver os problemas, ele está ficando na boa." },
  { term: "Queimar a largada", meaning: "Agir precipitadamente ou começar algo antes do tempo adequado.", example: "Ele queimou a largada ao anunciar o projeto antes de ter tudo pronto." },
  { term: "Dar um gás", meaning: "Aumentar o esforço ou a intensidade em uma atividade.", example: "Ele deu um gás nos estudos para passar no vestibular." },
  { term: "Não adianta chorar pelo leite derramado", meaning: "Não faz sentido lamentar algo que já aconteceu e não pode ser mudado.", example: "Você perdeu o prazo, não adianta chorar pelo leite derramado." },
  { term: "Quer moleza? Então senta no pudim", meaning: "É uma maneira de dizer que a pessoa deve lidar com as dificuldades da vida, pois não haverá atalhos nem 'moleza'.", example: "Se você quer entrar nessa competição, quer moleza? Então senta no pudim." },
  { term: "Deu ruim", meaning: "(Gíria) Algo deu errado ou não saiu como planejado.", example: "Tentei consertar o carro, mas deu ruim e agora está pior." },
  { term: "Ficar de bobeira", meaning: "Estar sem fazer nada, sem ocupação ou distração.", example: "No domingo, gosto de ficar de bobeira em casa." },
  { term: "Dar um rolê", meaning: "(Gíria) Sair para passear ou se divertir.", example: "Vamos dar um rolê no shopping amanhã?" },
  { term: "Ficar na pista", meaning: "(Gíria) Estar solteiro e disponível para relacionamentos.", example: "Depois do término, ele está ficando na pista." },
  { term: "Pagar pau", meaning: "(Gíria) Admirar ou elogiar alguém de forma exagerada.", example: "Ele paga pau para o jogador de futebol famoso." },
  { term: "Dar um salve", meaning: "(Gíria) Cumprimentar ou mandar um recado para alguém.", example: "Vou dar um salve para meus amigos quando chegar lá." },
  { term: "Chorar as pitangas", meaning: "(Gíria) Reclamar ou lamentar-se muito sobre algo.", example: "Ela ficou chorando as pitangas depois que perdeu o emprego." },
  { term: "Fazer vista grossa", meaning: "Ignorar algo intencionalmente.", example: "O professor fez vista grossa para os alunos que chegaram atrasados." },
  { term: "Dar pitaco",  meaning: "(Gíria) Opinar ou dar conselhos sobre algo, muitas vezes sem ser solicitado.", example: "Ele sempre dá pitaco nas decisões dos outros." },
  { term: "Dar piti", meaning: "(Gíria) Ter uma crise de raiva ou frustração, geralmente de forma exagerada.", example: "Ela deu piti quando soube que não ia ao show." },
  { term: "Ter o rei na barriga", meaning: "Agir de forma arrogante ou se achar superior aos outros.", example: "Desde que ficou famoso, ele tem o rei na barriga." },
  { term: "Quem morre de véspera é peru" , meaning: "Expressão usada para dizer que não se deve se preocupar ou antecipar problemas que ainda não aconteceram.", example: "Não fique ansioso com a prova, quem morre de véspera é peru." },
  { term: "Chorar a morte da bezerra", meaning: "(Gíria) Reclamar ou lamentar-se excessivamente sobre algo que já passou ou não tem mais solução.", example: "Ele fica chorando a morte da bezerra por causa do erro que cometeu no trabalho." },
  { term: "Cair na real", meaning: "Perceber a verdade sobre uma situação, aceitar a realidade.", example: "Depois de muito tempo, ele finalmente caiu na real sobre o relacionamento." },
  { term: "Segurar vela", meaning: "Estar presente em um encontro ou situação onde duas pessoas estão interessadas uma na outra, mas sem participar ativamente.", example: "Eu não queria segurar vela no encontro deles, então fui embora mais cedo." },
  { term: "Dar nó em pingo d'água", meaning: "Confundir alguém com explicações complicadas ou detalhes desnecessários.", example: "Ele deu nó em pingo d'água ao tentar explicar a situação para o chefe." },
  { term: "Não dar ponto sem nó", meaning: "Não tomar decisões ou ações sem uma razão ou plano por trás.", example: "Ela nunca age impulsivamente, não dá ponto sem nó." },

  
];

const motivation = [
  "Você é capaz de coisas incríveis. Respeite o seu tempo.",
  "Cada pequeno progresso é um grande progresso.",
  "Está tudo bem não estar bem o tempo todo. Seja gentil com você.",
  "Suas percepções únicas do mundo são uma força.",
  "Respire fundo. Você consegue lidar com isso.",
  "O sonho é que leva a gente para a frente. Se a gente for seguir a razão, fica aquietado, acomodado. (Ariano Suassuna)",
  "Não se compare com os outros. A sua jornada é única.",
  "O fracasso é apenas a oportunidade de recomeçar com mais inteligência. (Henry Ford)",
  "Um passo de cada vez. Você não precisa construir a escada inteira, apenas dar o primeiro passo.",
  "Tudo bem pedir ajuda. Isso é um sinal de força, não de fraqueza.",
  "Descanse. Você não precisa ser produtivo o tempo todo para ter valor.",
  "Feito é melhor que perfeito. Apenas comece.",
  "Seja paciente consigo mesmo. O que é para ser seu encontrará uma maneira de chegar até você.",
  "As dificuldades preparam pessoas comuns para destinos extraordinários.",
  "A vida é 10% o que acontece e 90% como reagimos. – Charles R. Swindoll",
  "Coragem não é ausência de medo, é decidir que algo é mais importante. – Ambrose Redmoon",
  "Não espere por oportunidades, crie-as. – George Bernard Shaw",
  "O sucesso é soma de pequenos esforços diários. – Robert Collier",
  "Acredite em você e todo o resto virá. – Elayne Boosler",
  "Tudo que você sempre quis está do outro lado do medo. – George Addair",
  "Você é mais forte do que imagina",
  "Faça o que pode, com o que tem. – Theodore Roosevelt",
  "Grandes coisas nunca vêm de zonas de conforto. – Roy T. Bennett",
  "Persistência é o caminho do êxito. – Charles Chaplin",
  "A única maneira de fazer um excelente trabalho é amar o que você faz. – Steve Jobs",
  "O futuro pertence àqueles que acreditam na beleza de seus sonhos. – Eleanor Roosevelt",
  "A jornada de mil milhas começa com um único passo. – Lao Tzu",
  "Acredite que você pode, assim você já está no meio do caminho. – Theodore Roosevelt",
  "O único lugar onde o sucesso vem antes do trabalho é no dicionário. – Vidal Sassoon",
  "Não importa o quão devagar você vá, desde que você não pare. – Confúcio",
  "A vida é sobre criar impacto, não uma renda. – Kevin Kruse",
  "Seja a mudança que você quer ver no mundo. – Mahatma Gandhi",
  "O melhor ainda está por vir. – Anônimo",
  "Você é suficiente exatamente como você é. – Meghan Markle",
  "Acredite no poder dos seus sonhos. – Eleanor Roosevelt",
  "O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta. – Winston Churchill",
  "Você deveria pensar em sua energia como se fosse algo caro, como se fosse um artigo de luxo. Nem todo mundo pode ter. Aquilo com que você gasta sua energia pode ser motivo de arruinar seu dia. - Taylor Swift",
  "Se expressarmos gratidão pelo que temos, teremos mais pelo que expressar gratidão.",
  "Só há felicidade se não exigirmos nada do amanhã e aceitarmos do hoje, com gratidão, o que nos trouxer. A hora mágica chega sempre. - Hermann Hesse",
  "A gratidão é a memória do coração. - Lao Tsé",
  "A gratidão transforma o que temos em suficiente. - Melody Beattie",
  "A gratidão é a chave para a felicidade. - Anônimo",
  "A gratidão abre a porta para o poder, a sabedoria e a criatividade do universo. - Deepak Chopra",
  "A gratidão é o antídoto para o ressentimento e a inveja. - Anônimo",
  "A gratidão é a base de uma vida plena e feliz. - Anônimo",
  "A gratidão é a arte de pintar a vida com cores vibrantes. - Anônimo",
  "Lute com determinação, abrace a vida com paixão, perca com classe e vença com ousadia, porque o mundo pertence a quem se atreve e a vida é muito para ser insignificante. - Augusto Branco",
  "Nós somos como o clima: feitos de dias de chuva e de sol!",
  "A vitalidade é demonstrada não apenas pela persistência, mas pela capacidade de começar de novo. - F. Scott Fitzgerald",
  " A vida não é sobre esperar a tempestade passar, mas sim aprender a dançar na chuva. - Vivian Greene",
  "Só se pode alcançar um grande êxito quando nos mantemos fiéis a nós mesmos. - Friedrich Nietzsche",
  "Quando tudo parecer impossível, é sinal de que está precisando de uns bons dias de descanso para aliviar a pressão e liberar a sua mente. Depois, verá que os problemas nem eram tão grandes assim.",
  "Não se torture quando as coisas não ocorrerem como você planejou. Os planos nos ajudam a traçar o caminho, mas é normal que tenhamos que mudá-los depois!",
  "A força não provém da capacidade física. Provém de uma vontade indomável. - Mahatma Gandhi",
  "Comece fazendo o que é necessário, depois o que é possível, e de repente você estará fazendo o impossível. - São Francisco de Assis",
  "Não há a necessidade de caminhar rápido. Apenas siga caminhando.",
  "Se aquela meta antiga já não te faz mais feliz, elimine-a sem dó!",
  "Dias complicados fazem parte. O bom é que passam e depois aparecem dias bons.",
  "A vida é como uma montanha: tem altos e baixos, exige caminhada e tem paisagens para se observar durante todo o caminho.",
  "Respeite seu corpo e trate com carinho a sua mente. Eles são seus maiores aliados na jornada da vida.",
];

const bible = [
 "Posso todas as coisas naquele que me fortalece. (Filipenses 4:13)",
  "O Senhor é o meu pastor; nada me faltará. (Salmos 23:1)",
  "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo. (Isaías 41:10)",
  "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. (Mateus 11:28)",
  "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize. (João 14:27)",
  "Perto está o Senhor dos que têm o coração quebrantado e salva os contritos de espírito. (Salmos 34:18)",
  "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós. (1 Pedro 5:7)",
  "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia. (Salmos 46:1)",
  "O choro pode durar uma noite, mas a alegria vem pela manhã. (Salmos 30:5b)",
  "Porque para Deus nada é impossível. (Lucas 1:37)",
  "Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, o Pai das misericórdias e o Deus de toda a consolação. (2 Coríntios 1:3)",
  "Esforçai-vos, e ele fortalecerá o vosso coração, vós todos que esperais no Senhor. (Salmos 31:24)",
  "O Senhor é bom, um refúgio em tempos de angústia. Ele protege os que nele confiam. (Naum 1:7)",
  "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão. (Isaías 40:31)",
  "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. (Provérbios 3:5)",
  "O Senhor é a minha luz e a minha salvação; a quem temerei? (Salmos 27:1)",
  "Entrega o teu caminho ao Senhor; confia nele, e ele o fará. (Salmos 37:5)",
  "Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz, e não de mal, para vos dar um futuro e uma esperança. (Jeremias 29:11)",
  "Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes. (Jeremias 33:3)",
  "O Senhor é a minha força e o meu cântico; ele se tornou a minha salvação. (Salmos 118:14)",
  "Porque Deus não nos deu espírito de temor, mas de poder, amor e moderação. – 2 Timóteo 1:7",
  "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus. – Isaías 41:10",
  "Bem-aventurados os que têm fome e sede de justiça, porque serão saciados. – Mateus 5:6",
  "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus. Finalmente, irmãos, tudo o que for verdadeiro, tudo o que for nobre, tudo o que for correto, tudo o que for puro, tudo o que for amável, tudo o que for de boa fama, se houver algo de excelente ou digno de louvor, pensem nessas coisas. Filipenses 4:6-8",
  "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês. 1 Pedro 5:7",
  "Portanto, não se preocupem, dizendo: 'Que vamos comer?' ou 'Que vamos beber?' ou 'Que vamos vestir?' Pois os pagãos é que correm atrás dessas coisas; mas o Pai celestial sabe que vocês precisam delas. Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas serão acrescentadas a vocês. Portanto, não se preocupem com o amanhã, pois o amanhã trará as suas próprias preocupações. Basta a cada dia o seu próprio mal. Mateus 6:31-34",
  "Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês. Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração, e vocês encontrarão descanso para as suas almas. Pois o meu jugo é suave e o meu fardo é leve. Mateus 11:28-30"
];

const challenges = {
  
  understanding: [
    {
      title: "Diga 'Olá' de Forma Especial",
      objective: "Iniciar uma conversa com alguém conhecido.",
      steps: ["Escolha uma pessoa confortável (amigo, familiar).", "Quando a vir, diga 'Olá!' e acrescente algo sobre o dia, como: 'Olá! Como você está hoje?' ou 'Olá! Gostei da sua camisa!'.", "Observe a reação da pessoa e, se puder, continue a conversa com mais uma frase ou pergunta."],
      extra: "Pratique isso na frente do espelho ou com alguém de confiança antes de tentar."
    },
    {
      title: "Elogio Rápido",
      objective: "Praticar dar um feedback positivo a alguém.",
      steps: ["Escolha algo simples que você goste em alguém (um acessório, um cabelo, uma atitude).", "Aproxime-se e diga o elogio de forma direta. Ex: 'Oi, só queria dizer que seu tênis é muito legal.'", "Você não precisa esperar uma grande reação. Apenas diga e continue seu dia."],
      extra: "Pode ser feito com um colega, um atendente de loja ou um amigo."
    },
    {
      title: "O 'Bom Dia' Cronometrado",
      objective: "Praticar a saudação básica em um ambiente de passagem.",
      steps: ["Escolha um lugar onde as pessoas passam (ex: corredor da escola, entrada do trabalho).", "Defina um cronômetro para 2 minutos.", "Tente dizer 'Bom dia' ou 'Boa tarde' para 3 pessoas diferentes antes que o tempo acabe.", "Um simples aceno de cabeça como resposta já conta como sucesso."],
      extra: "Fone de ouvido (sem música) pode ajudar a se sentir menos exposto no início."
    },
    {
      title: "Perguntando as Horas",
      objective: "Iniciar uma interação de baixa pressão com um estranho.",
      steps: ["Aproxime-se de alguém que pareça acessível (ex: um atendente, um segurança, ou alguém esperando).", "Faça contato visual breve e pergunte: 'Com licença, você sabe que horas são?'", "Agradeça com 'Obrigado(a)!' e siga seu caminho."],
      extra: "Tente fazer isso mesmo que você tenha um relógio ou celular. O objetivo é a interação."
    },
    {
      title: "O Comentário Ambiental",
      objective: "Iniciar uma conversa baseada no ambiente compartilhado.",
      steps: ["Enquanto espera em uma fila ou em um elevador, encontre algo neutro para comentar.", "Ex: 'Nossa, está bem cheio hoje, né?' ou 'Que chuva lá fora!'", "Veja se a pessoa responde. Se sim, você pode fazer mais um comentário ou apenas sorrir."],
      extra: "Isso funciona bem porque o tópico é compartilhado e não pessoal."
    },
    {
      title: "O 'Obrigado' Específico",
      objective: "Demonstrar gratidão de forma mais conectada.",
      steps: ["Quando alguém fizer algo por você (ex: um atendente de café, um colega que segurou a porta).", "Em vez de apenas 'obrigado', adicione o motivo.", "Ex: 'Obrigado por esperar!' ou 'Obrigado, você foi muito rápido.'"],
      extra: "Ser específico torna o agradecimento mais genuíno."
    },
    {
      title: "Pedir 'Com Licença'",
      objective: "Navegar em espaços físicos de forma educada.",
      steps: ["Quando precisar passar por alguém em um local apertado.", "Faça um leve contato visual e diga 'Com licença' com uma voz clara.", "Espere a pessoa dar espaço antes de passar."],
      extra: "Tente não apenas passar 'raspando' sem dizer nada. A pausa para a resposta é a parte principal."
    },
    {
      title: "Segurando a Porta",
      objective: "Praticar um pequeno ato de gentileza situacional.",
      steps: ["Ao passar por uma porta, olhe rapidamente para trás.", "Se houver alguém a alguns passos de distância, segure a porta aberta para ela.", "Diga 'Pode passar' ou apenas sorria."],
      extra: "Não precisa esperar se a pessoa estiver muito longe."
    },
    {
      title: "Apresentação Simples",
      objective: "Apresentar-se em um novo contexto social.",
      steps: ["Em uma nova aula, grupo ou festa, encontre alguém que também pareça estar sozinho.", "Aproxime-se e diga: 'Oi, eu sou o [Seu Nome]. Eu sou novo aqui.'", "Pode adicionar uma pergunta simples: 'Você já participa há muito tempo?'"],
      extra: "Muitas vezes, a outra pessoa está tão nervosa quanto você."
    },
    {
      title: "Pedindo uma Pequena Informação",
      objective: "Praticar pedir ajuda de forma controlada.",
      steps: ["Em um supermercado, loja ou biblioteca.", "Aproxime-se de um funcionário ou de outro cliente.", "Pergunte algo simples: 'Com licença, você sabe onde fica o [produto]?'", "Agradeça pela informação."],
      extra: "O objetivo é formular uma pergunta clara e processar a resposta."
    },
    
    {
      title: "O Elogio de Habilidade",
      objective: "Elogiar uma ação ou habilidade, em vez de aparência.",
      steps: ["Observe alguém fazendo algo bem (ex: um colega fazendo uma apresentação, um amigo cozinhando).", "Depois, diga: 'Nossa, você é muito bom em [habilidade].' ou 'Gostei muito de como você [ação].'", "Isso abre espaço para a pessoa falar sobre algo que ela gosta de fazer."],
      extra: "É um elogio que geralmente gera mais conversa do que um elogio sobre roupas."
    },
    {
      title: "Perguntando Sobre o Fim de Semana",
      objective: "Iniciar uma conversa social comum no início da semana.",
      steps: ["Na segunda ou terça-feira, encontre um colega ou conhecido.", "Pergunte: 'E aí, tudo bem? Fez algo legal no fim de semana?'", "Esteja preparado para ouvir a resposta por pelo menos 30 segundos."],
      extra: "Tenha uma resposta de uma frase pronta caso perguntem o mesmo para você."
    },
    {
      title: "Oferecendo Ajuda Simples",
      objective: "Identificar oportunidades de ser prestativo.",
      steps: ["Observe alguém com dificuldades (ex: carregando muitas coisas, tentando alcançar algo no alto).", "Aproxime-se e ofereça: 'Quer uma ajuda com isso?'", "Esteja preparado para um 'sim' ou um 'não, obrigado(a)'."],
      extra: "O ato de oferecer é o sucesso do desafio, independentemente da resposta."
    },
    {
      title: "Perguntando o Nome (De Novo)",
      objective: "Lidar com a situação comum de esquecer o nome de alguém.",
      steps: ["Encontre alguém cujo nome você esqueceu, mas com quem interage.", "Diga de forma direta e educada: 'Oi! Nós já conversamos, mas eu esqueci seu nome. Pode me lembrar?'", "Preste atenção e tente usar o nome da pessoa uma vez logo em seguida."],
      extra: "É muito menos estranho do que fingir que sabe o nome por meses."
    },
    {
      title: "O Tchau Planejado",
      objective: "Sair de uma interação social curta de forma educada.",
      steps: ["Após uma breve interação (como as deste bloco).", "Use uma frase de saída clara. Ex: 'Bom, eu preciso ir. Foi bom te ver!' ou 'Até mais, tenha um bom dia!'", "Não precisa esperar por uma pausa longa. Um sorriso e a frase são suficientes."],
      extra: "Ter uma 'frase de saída' pronta reduz a ansiedade de como terminar."
    },
    {
      title: "Interesse Rápido",
      objective: "Mostrar interesse por um item pessoal de alguém.",
      steps: ["Observe se alguém está com um item interessante (um livro, uma camiseta de banda, um chaveiro).", "Faça um comentário ou pergunta: 'Que legal esse chaveiro! É de [personagem]?'", "Se a pessoa parecer aberta, ouça a resposta. Se não, apenas sorria e siga."],
      extra: "Focar em um objeto é mais fácil do que fazer uma pergunta pessoal."
    },
    {
      title: "Compartilhando uma Observação Positiva",
      objective: "Criar um momento positivo compartilhado.",
      steps: ["Se algo bom ou engraçado acontecer (ex: um cachorro fofo passar, o sol sair depois da chuva).", "Olhe para a pessoa mais próxima e faça um breve comentário: 'Que fofo aquele cachorro!'", "Compartilhar um pequeno momento positivo cria uma conexão rápida."],
      extra: "Não force. Espere por uma oportunidade natural."
    },
    {
      title: "Pedindo uma Recomendação",
      objective: "Pedir a opinião de alguém de forma casual.",
      steps: ["Em uma cafeteria, restaurante ou livraria.", "Pergunte a um funcionário ou a alguém na fila: 'O que você recomenda daqui?' ou 'Qual é o mais popular?'", "Isso mostra que você valoriza a opinião da pessoa."],
      extra: "Você não é obrigado a seguir a recomendação, apenas agradeça."
    },
    {
      title: "O Aceno de Cabeça",
      objective: "Reconhecer a presença de alguém sem precisar falar.",
      steps: ["Ao passar por um conhecido em um corredor ou na rua.", "Faça contato visual breve e dê um leve aceno de cabeça para cima, talvez com um meio-sorriso.", "É um reconhecimento que 'eu vi você' sem a pressão de uma conversa."],
      extra: "Funciona muito bem quando você está com pressa ou o ambiente é barulhento."
    },
    {
      title: "Respondendo a um Elogio",
      objective: "Praticar receber um feedback positivo.",
      steps: ["Quando alguém lhe fizer um elogio (ex: 'Gostei da sua blusa').", "Resista ao impulso de diminuir o elogio (ex: 'Ah, é velha').", "Faça contato visual breve e diga apenas: 'Obrigado(a)!' ou 'Que bom que você gostou!'"],
      extra: "Aceitar um elogio de forma simples é uma habilidade social importante."
    }
  ],
  communication: [
    
    {
      title: "Contato Visual Curto",
      objective: "Praticar o contato visual de forma confortável.",
      steps: ["Durante uma conversa, tente olhar nos olhos da pessoa por 2-3 segundos.", "Depois, desvie o olhar para o nariz ou a boca dela por alguns segundos.", "Repita o processo algumas vezes durante a conversa."],
      extra: "Lembre-se: não precisa ser o tempo todo. O objetivo é mostrar que você está prestando atenção."
    },
    {
      title: "Ouvir e Repetir (Parafrasear)",
      objective: "Demonstrar escuta ativa em uma conversa.",
      steps: ["Enquanto alguém estiver falando algo, preste atenção em um ponto principal.", "Quando a pessoa pausar, diga algo como: 'Então, se eu entendi bem, você está dizendo que... [repita o ponto com suas palavras]?'", "Isso mostra que você estava ouvindo e valida o sentimento da outra pessoa."],
      extra: "Funciona muito bem quando um amigo está desabafando sobre um problema."
    },
    {
      title: "Os Encorajadores",
      objective: "Usar pequenas palavras para mostrar que você está ouvindo.",
      steps: ["Enquanto alguém conta uma história.", "Use sons e palavras curtas para encorajar a pessoa a continuar.", "Ex: 'Aham...', 'Sei...', 'Nossa!', 'E aí?'", "Combine isso com um leve aceno de cabeça."],
      extra: "Isso preenche o silêncio sem interromper o fluxo de pensamento da outra pessoa."
    },
    {
      title: "A Regra dos 3 Segundos",
      objective: "Evitar interromper e garantir que o outro terminou de falar.",
      steps: ["Quando você achar que a outra pessoa terminou de falar.", "Conte mentalmente 'um, dois, três' antes de começar a sua frase.", "Muitas vezes, a pessoa está apenas fazendo uma pausa para pensar, não parou de falar."],
      extra: "É mais difícil do que parece, especialmente se você estiver animado com o tópico."
    },
    {
      title: "A Pergunta Aberta",
      objective: "Fazer perguntas que não podem ser respondidas com 'sim' ou 'não'.",
      steps: ["Em vez de perguntar 'Você gostou do filme?', pergunte 'O que você achou do filme?'.", "Em vez de 'Seu dia foi bom?', pergunte 'Como foi o seu dia?'.", "Use 'Como', 'Por que', 'O que', 'Quando', 'Quem'."],
      extra: "Perguntas abertas convidam a outra pessoa a compartilhar mais."
    },
    {
      title: "Espelhamento Sutil",
      objective: "Criar 'rapport' (conexão) através da linguagem corporal.",
      steps: ["Durante uma conversa agradável.", "Se a pessoa se inclinar para frente, espere alguns segundos e se incline também.", "Se ela cruzar as pernas, considere fazer o mesmo.", "Seja muito sutil. Não é para ser uma imitação óbvia."],
      extra: "Isso é algo que as pessoas fazem naturalmente quando estão conectadas."
    },
    {
      title: "A Pergunta de Seguimento",
      objective: "Mostrar interesse genuíno no que foi dito.",
      steps: ["Alguém menciona algo. Ex: 'Eu fui visitar meus pais no fim de semana.'", "Em vez de mudar de assunto, faça uma pergunta sobre isso.", "Ex: 'Legal! Como eles estão?' ou 'Vocês fizeram algo especial?'"],
      extra: "A maioria das conversas morre por falta de perguntas de seguimento."
    },
    {
      title: "Validação de Sentimentos",
      objective: "Reconhecer a emoção do outro, mesmo que você não concorde.",
      steps: ["Alguém está chateado. Ex: 'Estou com raiva porque meu projeto foi cancelado.'", "Valide o sentimento: 'Nossa, isso parece muito frustrante.' ou 'Eu entendo por que você está com raiva.'", "Não tente 'consertar' o problema. Apenas reconheça a emoção."],
      extra: "As pessoas muitas vezes só querem se sentir ouvidas, não que seus problemas sejam resolvidos."
    },
    {
      title: "O Nome da Pessoa",
      objective: "Usar o nome da pessoa para criar conexão.",
      steps: ["Durante uma conversa, encontre um momento natural para usar o nome da pessoa.", "Ex: 'Isso é uma boa ideia, Maria.' ou 'Maria, o que você acha disso?'", "Use com moderação. Uma ou duas vezes em uma conversa é o ideal."],
      extra: "Ouvir o próprio nome geralmente faz as pessoas prestarem mais atenção."
    },
    {
      title: "Resumo de Despedida",
      objective: "Encerrar uma conversa de forma clara e positiva.",
      steps: ["Ao final de uma conversa mais longa (ex: planejar algo, discutir um problema).", "Faça um breve resumo: 'Ok, então combinado, nos encontramos às 10h.' ou 'Foi bom conversar sobre isso, [Nome].'", "Isso confirma o que foi dito e dá um final claro."],
      extra: "Ajuda a evitar finais de conversa estranhos e arrastados."
    },
    
    {
      title: "O Tópico Ponte",
      objective: "Mudar de assunto de forma suave.",
      steps: ["Ouça algo na fala da outra pessoa que se conecte com o que você quer dizer.", "Ex: Ela fala sobre 'férias na praia'. Você espera ela terminar e diz: 'Falando em praia, isso me lembrou de um filme que vi...'", "Use a conexão para fazer a 'ponte'."],
      extra: "É menos abrupto do que simplesmente mudar de assunto do nada."
    },
    {
      title: "Compartilhamento Relevante",
      objective: "Contribuir para a conversa compartilhando algo sobre si mesmo.",
      steps: ["A pessoa compartilha uma experiência. Ex: 'Eu estou aprendendo a tocar violão.'", "Responda com algo relevante seu: 'Que legal! Eu tentei aprender piano uma vez, mas achei os acordes difíceis.'", "Depois, devolva a palavra: 'Como está sendo para você?'"],
      extra: "Cuidado para não 'roubar' o tópico e falar só sobre você. É um compartilhamento, não uma tomada de controle."
    },
    {
      title: "Balanço de Fala",
      objective: "Monitorar o quanto você está falando vs. ouvindo.",
      steps: ["Em uma conversa 1-a-1, tente manter um balanço de 50/50.", "Se você perceber que falou por muito tempo (mais de 1-2 minutos sem parar).", "Faça uma pausa e jogue para o outro: 'Mas e você, o que pensa sobre isso?' ou 'Desculpe, falei demais. O que você ia dizer?'"],
      extra: "Isso é especialmente importante com pessoas mais quietas."
    },
    {
      title: "Pedindo Esclarecimento",
      objective: "Não ter medo de perguntar quando não entender algo.",
      steps: ["Se alguém usar uma gíria, um termo técnico ou uma referência que você não conhece.", "Diga de forma neutra: 'Desculpe, o que significa [termo]?' ou 'Pode me explicar essa parte de novo?'", "É melhor perguntar do que fingir que entendeu."],
      extra: "A maioria das pessoas gosta de explicar coisas que sabem."
    },
      {
      title: "Praticando o Tom de Voz",
      objective: "Perceber como o tom de voz muda o significado da frase.",
      steps: ["Escolha uma frase simples, como 'O que você está fazendo aqui?'.", "Pratique dizê-la em voz alta com diferentes emoções.", "1. Com raiva. 2. Com surpresa genuína. 3. Com curiosidade. 4. Com medo.", "Note como sua entonação, volume e velocidade mudam."],
      extra: "Pode gravar sua voz no celular para ouvir a diferença."
    },
    {
      title: "O Silêncio Confortável",
      objective: "Aprender a não preencher todo silêncio em uma conversa.",
      steps: ["Quando uma pausa natural ocorrer em uma conversa com alguém confortável (amigo, família).", "Resista ao impulso de preenchê-la imediatamente.", "Apenas mantenha uma expressão neutra e relaxada. Deixe a outra pessoa falar, se ela quiser."],
      extra: "Silêncio não é sinônimo de constrangimento, pode ser um sinal de conforto."
    },
    {
      title: "Iniciando com uma Pergunta de Opinião",
      objective: "Começar uma conversa sobre um tópico neutro.",
      steps: ["Escolha um tópico leve e de interesse geral (ex: um filme novo, uma série popular, uma notícia).", "Pergunte a um colega: 'Você viu [nome do filme]? O que achou?'", "Esteja preparado para ouvir a opinião, mesmo que diferente da sua."],
      extra: "Evite tópicos muito polêmicos (política, religião) para este desafio."
    },
    {
      title: "Linguagem Corporal Aberta",
      objective: "Mostrar receptividade através da postura.",
      steps: ["Durante uma conversa, faça um 'check-in' da sua postura.", "Tente manter os braços descruzados e as mãos visíveis.", "Vire seu corpo e pés na direção da pessoa com quem está falando."],
      extra: "Braços cruzados podem sinalizar que você está fechado ou na defensiva, mesmo sem querer."
    },
    {
      title: "Lidando com Interrupções (O Sinal)",
      objective: "Sinalizar que você ainda não terminou de falar.",
      steps: ["Se alguém começar a falar enquanto você está no meio de uma frase.", "Levante levemente a mão (como um sinal de 'pare' gentil) ou o dedo indicador.", "Diga: 'Só um segundo, deixa eu concluir meu pensamento.'", "Termine sua frase e então passe a palavra."],
      extra: "Faça com um tom de voz calmo, não agressivo."
    }
  ],
  understanding: [
    
    {
      title: "Detetive de Emoções (Filmes)",
      objective: "Praticar a identificação de emoções em expressões faciais e tom de voz.",
      steps: ["Assista a uma cena curta de um filme ou série (sem legendas, se possível).", "Pause em um close-up de um personagem.", "Tente nomear a emoção que ele está sentindo (Raiva? Tristeza? Surpresa? Medo?).", "Pense: 'O que no rosto ou no corpo dele me fez pensar isso?' (Sobrancelhas? Boca? Postura?)"],
      extra: "Animações (como as da Pixar) são ótimas para isso, pois as emoções são mais exageradas e claras."
    },
    {
      title: "Detetive de Emoções (Música)",
      objective: "Identificar a emoção transmitida pela música e voz.",
      steps: ["Escolha uma música que você não conhece (de preferência instrumental ou em um idioma que você não entende).", "Feche os olhos e ouça.", "Quais emoções a música evoca? (Alegria, tensão, melancolia, heroísmo?).", "Quais instrumentos ou qual tom de voz contribuem para isso?"],
      extra: "Tente adivinhar sobre o que é a música antes de ler a letra."
    },
    {
      title: "Tom vs. Palavras",
      objective: "Identificar quando o tom de voz não combina com as palavras (sarcasmo).",
      steps: ["Preste atenção quando alguém disser algo como 'Ótimo...' ou 'Que maravilha...' com um tom de voz desanimado ou irritado.", "Identifique a discrepância.", "Pense: 'As palavras são positivas, mas o tom é negativo. A emoção real é a do tom.'"],
      extra: "Assista a entrevistas ou 'sitcoms' (séries de comédia) para praticar, pois o sarcasmo é muito usado."
    },
    {
      title: "Leitura de Fotos",
      objective: "Interpretar emoções e contextos em imagens estáticas.",
      steps: ["Abra um site de notícias ou uma rede social com fotos de pessoas.", "Olhe para uma foto e tente descrever a cena.", "O que a pessoa está sentindo? O que pode ter acontecido antes da foto? O que ela está olhando?", "Tente criar uma pequena história para a imagem."],
      extra: "Procure por fotos de fotojornalismo, que são ricas em emoção."
    },
    {
      title: "O Ponto de Vista do Vilão",
      objective: "Praticar a 'Teoria da Mente' (entender a perspectiva do outro).",
      steps: ["Pense no seu filme ou livro favorito.", "Escolha o 'vilão' ou antagonista.", "Tente explicar as ações dele a partir do ponto de vista DELE.", "Por que *ele* acha que está certo? Quais são suas motivações? (Ele se sente traído? Injustiçado? Quer proteger algo?)"],
      extra: "Isso ajuda a entender que as pessoas agem com base em suas próprias lógicas e sentimentos."
    },
    {
      title: "Observador de Café",
      objective: "Praticar a observação de interações sociais em um ambiente público.",
      steps: ["Sente-se em um local público (parque, praça de alimentação, café).", "Observe as interações à distância (sem ouvir a conversa).", "Tente adivinhar a relação entre as pessoas (Amigos? Casal? Colegas de trabalho? Primeiro encontro?).", "O que na linguagem corporal delas lhe deu essa pista?"],
      extra: "Leve um livro ou fones de ouvido para parecer ocupado e não ser invasivo."
    },
    {
      title: "Lendo 'Entre as Linhas'",
      objective: "Identificar o que não está sendo dito explicitamente.",
      steps: ["Alguém diz: 'Você vai de novo para aquela festa?' (O que pode significar: 'Você vai me deixar sozinho?' ou 'Você não acha que está saindo demais?').", "Alguém diz: 'Meu dia foi... normal.' (O tom pode indicar que foi ruim, mas ela não quer falar sobre isso).", "Pense: 'Qual é a *pergunta* ou *sentimento* por trás da frase?'"],
      extra: "Isso é uma habilidade avançada. Comece apenas tentando identificar, sem agir sobre isso."
    },
    {
      title: "Decifrando Gírias e Expressões",
      objective: "Entender o significado de expressões idiomáticas.",
      steps: ["Quando ouvir uma expressão que não faz sentido literal (ex: 'chutar o balde', 'viajar na maionese').", "Não finja que entendeu. Pergunte: 'O que significa essa expressão?'", "Alternativamente, anote e pesquise no Google mais tarde."],
      extra: "Cada grupo social (família, amigos, trabalho, internet) tem suas próprias gírias."
    },
    {
      title: "Previsão de Reação",
      objective: "Praticar a empatia antecipando sentimentos.",
      steps: ["Antes de dar uma notícia a alguém (boa ou ruim).", "Pause e pense: 'Como [Nome da Pessoa] provavelmente vai se sentir ao ouvir isso?'", "'Ela ficará feliz? Ansiosa? Chateada?'", "Baseie sua previsão no que você sabe sobre a pessoa."],
      extra: "Isso ajuda a escolher as palavras certas para dar a notícia."
    },
    {
      title: "O Mapeamento da Emoção Própria",
      objective: "Conectar suas próprias emoções a gatilhos físicos e situacionais.",
      steps: ["Quando sentir uma emoção forte (raiva, ansiedade, alegria).", "Pare e se pergunte: 'O que eu estou sentindo no meu corpo?' (Coração acelerado? Mãos suando? Tensão nos ombros?).", "O que aconteceu *exatamente* antes de eu me sentir assim?", "Nomeie a emoção: 'Estou me sentindo frustrado.'"],
      extra: "Entender suas próprias emoções é o primeiro passo para entender as dos outros."
    },
    
    {
      title: "Lendo o 'Clima' da Sala",
      objective: "Avaliar a atmosfera emocional de um grupo.",
      steps: ["Ao entrar em uma sala onde pessoas já estão (ex: sala de aula, reunião de família).", "Fique quieto por um minuto e observe.", "O clima está tenso? Relaxado? Animado? Sério?", "O que lhe dá essa pista? (As pessoas estão falando baixo? Rindo alto? Em silêncio total?)" ],
      extra: "Isso ajuda a decidir como você deve se comportar ao se juntar ao grupo."
    },
    {
      title: "Sinais de Tédio",
      objective: "Identificar quando alguém não está engajado na conversa.",
      steps: ["Durante uma conversa, observe sinais de desinteresse no ouvinte.", "Sinais comuns: olhar muito para o relógio ou celular, balançar os pés rapidamente, bocejar, respostas curtas ('aham', 'sim'), corpo virado para longe de você.", "Se identificar isso, considere mudar de assunto ou encerrar a conversa."],
      extra: "Não leve para o lado pessoal; o tópico pode não ser interessante para a pessoa."
    },
    {
      title: "Sinais de Interesse",
      objective: "Identificar quando alguém está engajado na conversa.",
      steps: ["Observe os sinais positivos no ouvinte.", "Sinais comuns: inclinar-se para frente, contato visual mais constante, acenar com a cabeça, fazer perguntas de seguimento, sorrir.", "Se identificar isso, continue no tópico."],
      extra: "É o oposto do desafio 'Sinais de Tédio'."
    },
    {
      title: "Analisando 'Debates' de Filme",
      objective: "Entender os dois lados de um argumento.",
      steps: ["Assista uma cena de discussão ou debate em um filme/série (ex: um drama de tribunal, uma briga de família).", "Escreva o argumento principal da Pessoa A.", "Escreva o argumento principal da Pessoa B.", "Quem 'venceu' a discussão? Por quê? O argumento de quem era mais baseado em emoção e qual era mais baseado em lógica?"],
      extra: "Tente encontrar um ponto em que os dois lados tenham um pouco de razão."
    },
    {
      title: "O Contexto Importa",
      objective: "Entender como o mesmo comportamento muda de significado.",
      steps: ["Pense em um comportamento, por exemplo, 'falar alto'.", "Quando 'falar alto' é apropriado? (Num show, num jogo de futebol, para avisar de um perigo).", "Quando 'falar alto' é inapropriado? (Numa biblioteca, num hospital, durante uma aula).", "O comportamento em si não é 'bom' ou 'ruim'; o contexto decide."],
      extra: "Faça o mesmo para 'abraçar' ou 'fazer piadas'."
    },
    {
      title: "Identificando Hierarquias",
      objective: "Observar como as pessoas interagem em um grupo com líder.",
      steps: ["Observe um grupo (ex: colegas de trabalho com um gerente, um grupo de amigos com um líder 'natural').", "Para quem as pessoas olham mais quando falam?", "Quem tende a interromper os outros? Quem é interrompido?", "Quem toma a decisão final?"],
      extra: "Isso é apenas observação, não julgamento. Ajuda a entender a dinâmica do grupo."
    },
    {
      title: "Piadas e Humor",
      objective: "Analisar por que algo é considerado engraçado.",
      steps: ["Quando ouvir uma piada ou ver uma cena de comédia.", "Pergunte-se: 'Onde está o humor?'", "É uma surpresa? Um exagero? Uma quebra de expectativa? Sarcasmo? Um jogo de palavras?", "Tentar entender a *estrutura* da piada ajuda a reconhecer o humor."],
      extra: "Não se preocupe se você não achar graça. O objetivo é analisar a intenção."
    },
    {
      title: "O Pedido Embutido",
      objective: "Reconhecer quando uma reclamação é um pedido de ajuda.",
      steps: ["Alguém diz: 'Nossa, estou com tanto trabalho, não sei como vou terminar isso hoje.'", "A reclamação pode ser um pedido embutido: 'Você pode me ajudar?' ou 'Você pode me dar um conselho?'", "Você pode testar isso perguntando: 'Quer uma ajuda com alguma parte?'"],
      extra: "Às vezes, é só um desabafo. Pratique diferenciar."
    },
    {
      title: "Identificando Emoções Mistas",
      objective: "Reconhecer que pessoas podem sentir duas coisas ao mesmo tempo.",
      steps: ["Pense em situações complexas.", "Ex: Se mudar para uma cidade nova. (Emoções: Animado com o novo, mas triste por deixar amigos).", "Ex: Ser promovido. (Emoções: Feliz pelo reconhecimento, mas ansioso com a nova responsabilidade).", "Tente nomear as duas emoções."],
      extra: "As emoções raramente são 100% puras."
    },
    {
      title: "O Efeito de Audiência",
      objective: "Notar como as pessoas mudam de comportamento dependendo de quem está olhando.",
      steps: ["Observe um colega falando com um amigo.", "Depois, observe o *mesmo* colega falando com um professor ou chefe.", "O que mudou? (Tom de voz? Postura? Escolha de palavras? Nível de formalidade?)", "As pessoas se adaptam ao público."],
      extra: "Isso é uma parte normal da interação social, chamada 'troca de código' (code-switching)."
    }
  ],
    group: [
    
    {
      title: "O Ponto de Concordância",
      objective: "Participar de uma conversa em grupo de forma positiva.",
      steps: ["Em uma conversa com 3 ou mais pessoas, ouça os diferentes pontos de vista.", "Identifique uma opinião ou fato dito por alguém com o qual você concorde.", "Espere uma pausa e diga: 'Eu concordo com o que [Nome da Pessoa] disse sobre...'", "Se quiser, pode adicionar o porquê concorda."],
      extra: "É uma forma de participar sem precisar iniciar um tópico novo ou discordar de alguém."
    },
    {
      title: "O Ouvinte do Círculo",
      objective: "Mapear quem está falando e quem não está em um grupo.",
      steps: ["Em uma conversa em grupo, seu objetivo não é falar, apenas observar.", "Note: Quem fala mais? Quem fala menos?", "Quem interrompe? Quem é interrompido?", "Quem parece querer falar, mas não encontra espaço?"],
      extra: "Isso lhe dá um 'mapa' da dinâmica do grupo."
    },
    {
      title: "Entrando no Grupo (A Pausa)",
      objective: "Praticar como se juntar a uma conversa já em andamento.",
      steps: ["Aproxime-se do grupo e fique na borda externa, ouvindo.", "Não interrompa. Espere por uma pausa natural na conversa (ex: alguém termina uma história, há uma risada).", "Nessa pausa, faça contato visual com a pessoa mais próxima e dê um sorriso, ou faça um comentário sobre o tópico.", "Ex: 'Oi pessoal, vocês estão falando sobre [tópico]?'"],
      extra: "O mais importante é ouvir primeiro, antes de tentar entrar."
    },
    {
      title: "A Saída Educada",
      objective: "Sair de uma conversa em grupo sem parecer rude.",
      steps: ["Espere por uma pequena pausa na conversa.", "Faça um sinal visual (ex: olhar para o relógio, começar a se virar).", "Diga: 'Pessoal, eu preciso ir, mas foi bom conversar com vocês.' ou 'Com licença, eu preciso resolver uma coisa. Até mais!'", "Não precisa de uma desculpa longa."],
      extra: "Sair no meio da fala de alguém é o que deve ser evitado."
    },
    {
      title: "Incluindo o Excluído",
      objective: "Trazer alguém que está quieto para a conversa.",
      steps: ["Observe o 'Ouvinte do Círculo' que está quieto.", "Se você souber algo sobre essa pessoa, faça uma pergunta direta e gentil.", "Ex: '[Nome do Quieto], você entende desse assunto, o que você acha?' ou 'E você, [Nome], você também foi naquele evento, não foi?'"],
      extra: "Isso é um gesto social muito valorizado."
    },
    {
      title: "A Pergunta ao Grupo",
      objective: "Contribuir fazendo uma pergunta relevante para todos.",
      steps: ["Em vez de afirmar sua opinião, transforme-a em uma pergunta.", "Ex: Em vez de 'Eu acho que o projeto Y é melhor', pergunte 'O que vocês acham das vantagens do projeto Y comparado ao X?'", "Isso convida à discussão em vez de ao debate."],
      extra: "Funciona bem em discussões de trabalho ou escola."
    },
    {
      title: "Distribuindo o Contato Visual",
      objective: "Fazer todos no grupo se sentirem incluídos quando você fala.",
      steps: ["Quando for sua vez de falar em um grupo pequeno (3-5 pessoas).", "Enquanto fala, mova seu contato visual lentamente de pessoa para pessoa.", "Não se fixe apenas na pessoa que lhe fez a pergunta ou no 'líder'."]
      ,
      extra: "Isso mantém todo o grupo engajado com você."
    },
    {
      title: "O Reconhecimento",
      objective: "Dar crédito a uma ideia de outra pessoa.",
      steps: ["Durante um brainstorming ou discussão.", "Se alguém deu uma boa ideia que foi ignorada, traga-a de volta.", "Ex: 'Gostei do que a [Nome] disse antes sobre... Acho que deveríamos explorar isso.'"],
      extra: "Isso mostra que você está prestando atenção em todos, não só em si mesmo."
    },
    {
      title: "Pedindo a Vez (Não-verbal)",
      objective: "Sinalizar que você gostaria de falar em uma conversa rápida.",
      steps: ["Em uma discussão animada, pode ser difícil encontrar uma pausa.", "Incline-se levemente para frente e faça um breve contato visual com o falante atual.", "Às vezes, abrir levemente a boca ou inspirar (como se fosse falar) sinaliza sua intenção.", "Seja paciente e espere o momento."],
      extra: "É uma dança sutil. Não tente 'atropelar' os outros."
    },
    {
      title: "Mantendo o Foco",
      objective: "Ajudar o grupo a não se desviar do tópico principal.",
      steps: ["Se a conversa se desviou muito (ex: uma reunião de trabalho que vira conversa sobre futebol).", "Espere uma pausa e diga gentilmente: 'Pessoal, só para voltarmos ao tópico, estávamos discutindo [tópico original]...'", "Faça isso de forma prestativa, não como uma bronca."],
      extra: "Isso é muito útil em grupos focados em uma tarefa."
    },
    
    {
      title: "O Papel de Anfitrião",
      objective: "Fazer duas pessoas que não se conhecem se sentirem confortáveis.",
      steps: ["Se você está com a Pessoa A e a Pessoa B chega (e A e B não se conhecem).", "Faça a introdução: 'A, este é o B. O B trabalha comigo.' 'B, esta é a A, ela é minha amiga da faculdade.'", "Adicione um 'ponto em comum' se houver: 'Vocês dois gostam de [hobby].'"],
      extra: "Conectar pessoas é uma habilidade social de alto nível."
    },
    {
      title: "Brainstorm: A Regra do 'Sim, e...'",
      objective: "Construir sobre as ideias dos outros em vez de derrubá-las.",
      steps: ["Em uma sessão de brainstorming.", "Quando alguém der uma ideia (mesmo que pareça ruim).", "Responda com 'Sim, e...' e adicione algo a ela.", "Ex: 'Vamos fazer um cartaz.' -> 'Sim, e podemos fazer um cartaz digital para postar online.'", "Evite o 'Sim, mas...'"],
      extra: "Essa é a regra de ouro do improviso. Ela gera criatividade e evita conflitos."
    },
    {
      title: "Navegando em Conversas Paralelas",
      objective: "Lidar quando um grupo se divide em conversas menores.",
      steps: ["É normal que um grupo de 6+ pessoas se divida.", "Concentre-se na mini-conversa em que você está (2-3 pessoas).", "Se quiser mudar de grupo, use a 'Saída Educada' e a 'Entrada no Grupo'."],
      extra: "Não tente falar 'por cima' da outra conversa para unir o grupo."
    },
    {
      title: "Pedindo a Opinião do Quieto",
      objective: "Pedir especificamente a opinião de alguém que ainda não falou.",
      steps: ["Numa reunião de decisão.", "Perceba quem ainda não opinou.", "Pergunte diretamente: '[Nome], qual é a sua perspectiva sobre isso?' ou 'Queria ouvir o que o [Nome] pensa.'"],
      extra: "Muitas vezes, as pessoas quietas têm as observações mais ponderadas."
    },
    {
      title: "Aceitando a Decisão do Grupo",
      objective: "Praticar o desapego da sua própria ideia.",
      steps: ["Você propõe a Ideia A. O grupo discute e decide pela Ideia B.", "Em vez de ficar chateado ou argumentar mais, aceite a decisão.", "Diga: 'Ok, vamos em frente com a Ideia B então.'"],
      extra: "Saber 'perder' uma ideia é crucial para o trabalho em equipe."
    },
    {
      title: "Resumindo o Consenso",
      objective: "Ajudar o grupo a perceber que chegou a uma conclusão.",
      steps: ["Após uma longa discussão, se você perceber que todos estão concordando.", "Verbalize isso: 'Então, parece que todos concordamos que [conclusão]?'", "Isso solidifica a decisão e permite que o grupo avance."],
      extra: "Funciona como um 'ponto final' na discussão."
    },
    {
      title: "Lidando com o 'Monopolizador'",
      objective: "Interromper educadamente alguém que está falando sem parar.",
      steps: ["Espere a pessoa fazer uma pausa para respirar (não precisa ser uma pausa longa).", "Interrompa firmemente, mas educadamente: 'Desculpe te interromper, [Nome], mas eu queria adicionar algo sobre [ponto anterior]...' ou 'Só para garantir que outros possam falar, [Nome], o que [Outro Nome] acha disso?'"],
      extra: "Isso é difícil, mas muitas vezes necessário para a saúde do grupo."
    },
    {
      title: "A 'Pequena Contribuição'",
      objective: "Participar de um grupo mesmo sem dominar o assunto.",
      steps: ["Se o grupo está discutindo algo que você não conhece (ex: um esporte, um assunto técnico).", "Ouça atentamente.", "Faça uma pergunta de esclarecimento. Ex: 'Desculpe, o que é [termo]?'", "Sua contribuição é mostrar interesse e aprender."],
      extra: "É melhor do que ficar em silêncio ou fingir que entende."
    },
    {
      title: "O Elogio em Público",
      objective: "Reforçar positivamente um membro do grupo.",
      steps: ["Se um membro do grupo fez um bom trabalho.", "Encontre um momento para dizer na frente dos outros:", "'Eu queria agradecer à [Nome] pelo ótimo trabalho que ela fez no [projeto].'", "Isso eleva o moral do grupo."],
      extra: "Faça isso de forma genuína e específica."
    },
    {
      title: "Compartilhando o 'Palco'",
      objective: "Redirecionar a atenção para outra pessoa.",
      steps: ["Se você está recebendo muito crédito por um trabalho que foi em equipe.", "Redirecione: 'Obrigado, mas eu não conseguiria sem a ajuda do [Nome], que fez toda a parte [X].'", "Isso mostra humildade e espírito de equipe."],
      extra: "Evita que você se torne o 'centro das atenções' o tempo todo."
    }
  ],
  conflict: [
    
    {
      title: "A Frase do 'Eu'",
      objective: "Expressar um descontentamento sem culpar o outro.",
      steps: ["Quando algo o incomodar, construa uma frase começando com 'Eu' em vez de 'Você'.", "Formato: 'Eu me sinto [emoção] quando [ação específica acontece], porque [impacto em você].'", "Exemplo ruim: 'Você sempre me interrompe!'", "Exemplo bom: 'Eu me sinto frustrado quando sou interrompido, porque sinto que minha ideia não foi ouvida.'"],
      extra: "Pratique montando essas frases mentalmente antes de precisar usá-las."
    },
    {
      title: "O 'Não' Educado (Sem Desculpas)",
      objective: "Recusar um pedido de forma clara e respeitosa.",
      steps: ["Alguém lhe pede algo que você não pode ou não quer fazer.", "Seja claro e firme, mas educado. 'Obrigado por pensar em mim, mas eu não vou poder fazer isso.'", "Resista à vontade de inventar uma longa desculpa.", "Você pode oferecer uma alternativa: 'Não posso fazer X, mas posso fazer Y.'"],
      extra: "'Eu não vou conseguir' é uma frase completa e suficiente."
    },
    {
      title: "Pedindo Tempo (A Pausa)",
      objective: "Evitar reagir de cabeça quente a um conflito.",
      steps: ["Se você sentir que está ficando com raiva ou sobrecarregado em uma discussão.", "Diga: 'Eu preciso de um minuto para pensar sobre isso.' ou 'Podemos fazer uma pausa e voltar a falar disso em 10 minutos?'", "Afaste-se fisicamente da situação, respire fundo."],
      extra: "Tomar decisões ou discutir com raiva raramente termina bem."
    },
    {
      title: "Concordar em Discordar",
      objective: "Encerrar uma discussão que não levará a lugar nenhum.",
      steps: ["Quando você e outra pessoa claramente não vão mudar de opinião (ex: gosto musical, comida favorita, política).", "Diga: 'Olha, eu vejo o seu ponto, mas eu penso diferente. Acho que vamos ter que concordar em discordar.'", "Mude de assunto para algo mais leve."],
      extra: "Nem toda discordância precisa ser 'vencida'."
    },
    {
      title: "Foco no Problema, Não na Pessoa",
      objective: "Evitar ataques pessoais durante uma discordância.",
      steps: ["Em uma discussão, monitore sua linguagem.", "Ruim (Pessoa): 'Você é muito desorganizado!'", "Bom (Problema): 'A forma como os arquivos estão organizados está me confundindo.'", "Ruim: 'Você nunca me ouve!'", "Bom: 'Eu sinto que meu ponto de vista não foi considerado nesta decisão.'"],
      extra: "Use as 'Frases do Eu' para ajudar nisso."
    },
    {
      title: "O Pedido de Desculpas Genuíno",
      objective: "Assumir responsabilidade por um erro.",
      steps: ["Se você errou, peça desculpas de forma completa.", "1. Diga 'Desculpe por... [ação específica]'.", "2. Reconheça o impacto: 'Eu sei que isso te [emoção].'", "3. (Opcional) O que você fará diferente: 'Da próxima vez, eu vou...'", "Não adicione 'mas...': 'Desculpe, mas você também...' anula o pedido."],
      extra: "Um pedido de desculpas rápido e sincero resolve 90% dos pequenos conflitos."
    },
    {
      title: "Validando o Sentimento (Mesmo Discordando)",
      objective: "Mostrar que você entende a emoção do outro, mesmo sem concordar com a causa.",
      steps: ["Alguém está bravo com você por um motivo que você acha injusto.", "Antes de se defender, valide: 'Eu entendo que você está frustrado com [situação].' ou 'Faz sentido você se sentir assim, dado o que você pensou que aconteceu.'", "Depois de validar, você pode explicar seu lado: 'Do meu ponto de vista...'"],
      extra: "As pessoas ficam muito mais calmas quando se sentem compreendidas."
    },
    {
      title: "Reformulando Acusações",
      objective: "Transformar uma generalização (sempre/nunca) em um fato específico.",
      steps: ["Alguém diz: 'Você *sempre* se atrasa!'", "Responda calmamente pedindo especificidade: 'Você está chateado porque eu me atrasei hoje?'", "Alguém diz: 'Você *nunca* me ajuda!'", "Responda: 'Sobre qual tarefa específica você gostaria de ajuda agora?'"],
      extra: "Isso desarma a hipérbole e foca no problema real."
    },
    {
      title: "A Proposta de Solução",
      objective: "Mover a conversa da reclamação para a ação.",
      steps: ["Em vez de apenas apontar o problema, sugira uma solução ou um meio-termo.", "Ex: 'Eu me sinto sobrecarregado com [tarefa]. Que tal se eu fizer a Parte A e você a Parte B?'", "Ex: 'Eu não gosto de [Plano A]. Podemos tentar o [Plano B]?'"],
      extra: "Seja proativo em encontrar um 'ganha-ganha'."
    },
    {
      title: "Ignorando a 'Isca'",
      objective: "Reconhecer e não engajar em provocações.",
      steps: ["Alguém faz um comentário passivo-agressivo ou uma provocação para iniciar uma briga.", "Reconheça a 'isca' (o comentário).", "Escolha conscientemente não 'morder'.", "Você pode ignorar o comentário e mudar de assunto, ou responder apenas à parte literal da frase, ignorando o tom."],
      extra: "Leva-se dois para brigar. Se você não engajar, o conflito morre."
    },
    
    {
      title: "O 'Sanduíche' de Feedback",
      objective: "Dar uma crítica construtiva de forma que seja mais fácil de ouvir.",
      steps: ["1. Pão (Elogio): Comece com algo que você genuinamente aprecia. 'Eu gosto muito de como você é detalhista nos seus relatórios.'", "2. Recheio (Crítica): Dê o feedback de forma específica. 'Notei que o último relatório chegou um dia depois do prazo.'", "3. Pão (Positivo): Termine com uma nota de apoio ou futuro. 'Sei que podemos ajustar isso para o próximo.'"],
      extra: "Use com moderação. Para algumas pessoas, pode parecer manipulativo se usado sempre."
    },
    {
      title: "Aceitando um 'Não'",
      objective: "Reagir de forma madura quando seu pedido é recusado.",
      steps: ["Você pede algo. A pessoa diz 'não'.", "Resista ao impulso de insistir, perguntar 'por quê?' repetidamente, ou ficar chateado.", "Responda de forma neutra: 'Ok, tudo bem. Obrigado por me avisar.'", "O 'não' dela é tão válido quanto o seu."],
      extra: "Respeitar os limites dos outros constrói confiança."
    },
    {
      title: "Definindo um Limite Claro",
      objective: "Comunicar uma regra pessoal de forma assertiva.",
      steps: ["Quando alguém cruzar uma linha (ex: gritar com você, fazer uma piada ofensiva).", "Espere um momento calmo (se possível) ou diga na hora, com firmeza.", "'Por favor, não fale comigo nesse tom.'", "'Eu não me sinto confortável com esse tipo de piada.'", "Não precisa ser agressivo, apenas firme."],
      extra: "O objetivo não é punir o outro, é proteger seu espaço."
    },
    {
      title: "Reconhecendo o Próprio Erro",
      objective: "Ser o primeiro a admitir um erro em uma discussão.",
      steps: ["No meio de uma discussão, se você perceber que estava errado sobre um fato.", "Interrompa a si mesmo e corrija.", "'Espera, você tem razão. Eu me enganei sobre [o fato].'", "Isso mostra confiança e desarma o oponente."],
      extra: "Estar 'certo' é menos importante do que resolver o problema."
    },
    {
      title: "A Técnica do Espelho Quebrado",
      objective: "Lidar com críticas vagas ou insultos.",
      steps: ["Alguém diz: 'Você é um péssimo [função].'", "Responda concordando parcialmente ou refletindo a percepção.", "Ex: 'Pode parecer que eu sou um péssimo [função] para você.' ou 'Entendo que você me veja assim nesse momento.'", "Isso tira o 'poder' do insulto, pois você não o nega nem o aceita totalmente."],
      extra: "É uma técnica avançada de desescalada."
    },
    {
      title: "Perguntando 'O Que Você Precisa?'",
      objective: "Mudar o foco do conflito para a necessidade não atendida.",
      steps: ["Quando alguém está muito irritado ou reclamando.", "Pergunte calmamente: 'O que você precisa agora para que isso melhore?' ou 'Qual seria o resultado ideal para você nesta situação?'", "Isso força a pessoa a sair do modo de ataque e entrar no modo de solução."],
      extra: "Esteja preparado para ouvir o pedido."
    },
    {
      title: "Expressando uma Necessidade (Não uma Queixa)",
      objective: "Pedir o que você precisa em vez de reclamar do que não tem.",
      steps: ["Queixa: 'Você nunca passa tempo comigo.'", "Necessidade: 'Eu me sinto sozinho. Podemos marcar um dia esta semana para fazermos algo juntos?'", "Queixa: 'Essa casa está uma bagunça!'", "Necessidade: 'Eu me sinto sobrecarregado com a limpeza. Você pode me ajudar com [tarefa específica]?'"],
      extra: "É mais provável que uma necessidade seja atendida do que uma queixa."
    },
    {
      title: "Negociando uma Tarefa",
      objective: "Chegar a um meio-termo em uma responsabilidade compartilhada.",
      steps: ["Há uma tarefa que ninguém quer fazer.", "1. Reconheça o problema: 'Nenhum de nós quer [tarefa].'", "2. Proponha uma troca: 'Se você fizer [tarefa], eu faço [outra tarefa].'", "3. Proponha uma divisão: 'Que tal se fizermos juntos em 10 minutos?'"],
      extra: "Transforma um conflito 'eu vs. você' em 'nós vs. o problema'."
    },
    {
      title: "Aceitando um Pedido de Desculpas",
      objective: "Encerrar o conflito após o outro se desculpar.",
      steps: ["A pessoa pede desculpas.", "Se você estiver pronto para seguir em frente, aceite de forma clara.", "Diga: 'Obrigado por se desculpar.' ou 'Está tudo bem. Vamos em frente.'", "Não diga 'tudo bem' se não estiver. Nesse caso, diga 'Eu agradeço o pedido. Eu preciso de um tempo.'"],
      extra: "Guardar rancor depois de um pedido aceito é prejudicial."
    },
    {
      title: "Pedindo Ajuda a um Mediador",
      objective: "Reconhecer quando um conflito não pode ser resolvido a dois.",
      steps: ["Se uma discussão está em um ciclo e não vai a lugar nenhum.", "Sugira: 'Acho que não estamos conseguindo nos entender. Podemos pedir para [pessoa neutra - gerente, professor, amigo em comum] nos ajudar a conversar?'", "Isso mostra maturidade em querer resolver o problema."],
      extra: "O mediador não 'escolhe um lado', ele ajuda a comunicação."
    }
  ],
};
 

const regulations = [
  { title: "Respiração Quadrada", description: "Ajuda a focar e acalmar o sistema nervoso.", steps: ["1. Inspire lentamente contando até 4.", "2. Segure o ar nos pulmões contando até 4.", "3. Expire lentamente contando até 4.", "4. Mantenha os pulmões vazios contando até 4.", "5. Repita por 2-3 minutos."] },
  { title: "Técnica 5-4-3-2-1 (Aterramento)", description: "Traz sua atenção para o presente durante uma crise.", steps: ["Observe ao seu redor e nomeie:", "5 coisas que você pode VER.", "4 coisas que você pode TOCAR.", "3 coisas que você pode OUVIR.", "2 coisas que você pode CHEIRAR.", "1. coisa que você pode PROVAR."] },
  { title: "Aperto e Soltura", description: "Libera a tensão física.", steps: ["1. Feche as mãos e aperte-as com força por 5 segundos.", "2. Solte as mãos e sinta a tensão indo embora.", "3. Faça o mesmo com os ombros (encolha-os em direção às orelhas).", "4. Aperte por 5 segundos e solte.", "5. Repita com outros grupos musculares (pés, pernas, rosto)."] },
  { title: "Escaneamento Corporal", description: "Aumenta a consciência corporal e relaxa.", steps: ["1. Deite-se ou sente-se confortavelmente.", "2. Feche os olhos e foque sua atenção nos dedos do pé esquerdo.", "3. Note qualquer sensação (calor, frio, formigamento) sem julgar.", "4. Mova lentamente sua atenção para a sola do pé, calcanhar, tornozelo, subindo pela perna.", "5. Faça isso por todo o corpo, parte por parte, até o topo da cabeça."] },
  { title: "Foco em um Objeto", description: "Uma forma simples de meditação focada para ancorar no presente.", steps: ["1. Pegue um objeto pequeno (uma chave, uma caneta, uma pedra).", "2. Olhe para ele como se fosse a primeira vez que o vê.", "3. Note a cor, a textura, a temperatura, o peso nas suas mãos.", "4. Gire-o e observe como a luz bate nele.", "5. Tente manter sua atenção 100% no objeto por 1 minuto."] },
  { title: "Mudança de Temperatura", description: "Usa o choque térmico para 'resetar' o sistema nervoso.", steps: ["1. Durante um momento de ansiedade intensa ou raiva.", "2. Vá ao banheiro e jogue água fria no rosto, focando na área abaixo dos olhos e nas têmporas.", "3. (Alternativa) Segure um cubo de gelo na mão com força até começar a doer.", "4. A sensação física intensa ajuda a quebrar o ciclo mental."]},
  { title: "Contagem Regressiva Lenta", description: "Desvia o foco de pensamentos ansiosos para uma tarefa neutra.", steps: ["1. Feche os olhos (se for seguro).", "2. Comece a contar de 100 para trás, lentamente.", "3. Ex: 'Cem... (respire)... noventa e nove... (respire)...'", "4. Se você se perder ou um pensamento interromper, apenas reinicie do último número que se lembra.", "5. O objetivo não é chegar ao zero, mas focar no processo de contagem."] },
  { title: "Respiração 4-7-8", description: "Técnica de respiração focada em relaxamento e indução do sono.", steps: ["1. Expire todo o ar pela boca fazendo um som de 'sopro'.", "2. Feche a boca e inspire pelo nariz contando mentalmente até 4.", "3. Prenda a respiração contando mentalmente até 7.", "4. Expire completamente pela boca, fazendo um som de 'sopro', contando mentalmente até 8.", "5. Repita o ciclo 3 a 4 vezes."]},
  { title: "Visualização Positiva", description: "Usa a imaginação para criar um estado mental calmo e seguro.", steps: ["1. Feche os olhos e respire profundamente algumas vezes.", "2. Imagine um lugar onde você se sente completamente seguro e relaxado (praia, floresta, quarto confortável).", "3. Visualize os detalhes desse lugar: cores, sons, cheiros, sensações táteis.", "4. Permaneça nessa visualização por 2-3 minutos, respirando lentamente.", "5. Quando estiver pronto, abra os olhos lentamente, trazendo a sensação de calma com você."] },

  
  
  
  { title: "Abraço de Urso (Auto-abraço)", description: "Fornece pressão profunda (propriocepção) para acalmar.", steps: ["1. Cruzes os braços sobre o peito.", "2. Aperte-se firmemente, como se estivesse dando um abraço forte.", "3. Mantenha por 10-15 segundos, respirando fundo.", "4. Solte lentamente e repita se necessário."] },
  { title: "Pressão nas Paredes", description: "Usa grandes grupos musculares para 'aterrar' o corpo.", steps: ["1. Fique de pé a cerca de um braço de distância de uma parede.", "2. Coloque as palmas das mãos na parede na altura dos ombros.", "3. Incline-se para a frente e empurre a parede com força, como se quisesse movê-la.", "4. Mantenha a pressão por 10 segundos.", "5. Relaxe e repita 3-5 vezes."] },
  { title: "Amassar Massinha", description: "Foco sensorial tátil e de força nas mãos.", steps: ["1. Pegue um pedaço de massinha de modelar, slime ou 'putty'.", "2. Amasse, estique, enrole e aperte o material.", "3. Concentre-se na textura e na resistência da massinha.", "4. Tente fazer formas diferentes por 2-3 minutos."] },
  { title: "Puxar Banda Elástica", description: "Oferece resistência e 'trabalho pesado' para os braços.", steps: ["1. Segure uma banda de resistência (theraband) com as duas mãos.", "2. Mantenha os braços esticados à sua frente.", "3. Puxe a banda, abrindo os braços para os lados.", "4. Sinta a tensão nos ombros e braços.", "5. Volte lentamente e repita 10 vezes."] },
  { title: "Peso nos Ombros", description: "Usa peso para 'aterrar' o sistema nervoso.", steps: ["1. Coloque um cobertor pesado, uma almofada de peso ou até um saco de arroz nos ombros.", "2. Sente-se ereto e sinta o peso pressionando você para baixo.", "3. Permaneça com o peso por 3-5 minutos, respirando normalmente.", "4. (Alternativa) Use um colete de peso se disponível."] },
  { title: "Sentar nas Mãos", description: "Forma discreta de obter pressão profunda.", steps: ["1. Sente-se em uma cadeira com os pés no chão.", "2. Coloque as palmas das mãos sob as coxas.", "3. Pressione as coxas para baixo contra as mãos.", "4. Sinta a pressão profunda nas palmas das mãos.", "5. Mantenha por 30 segundos."] },
  { title: "Massagem com Pressão (Bola)", description: "Auto-massagem para liberar tensão muscular.", steps: ["1. Pegue uma bola de tênis ou de massagem.", "2. Coloque-a entre suas costas e uma parede.", "3. Mova o corpo para rolar a bola sobre áreas tensas (ombros, costas).", "4. (Alternativa) Role a bola sob os pés descalços."] },
  { title: "Pular no Lugar", description: "Input de impacto controlado para as articulações.", steps: ["1. Fique de pé com os pés juntos.", "2. Pule no lugar por 30 segundos.", "3. Tente pular de forma rítmica e controlada.", "4. Pare e sinta a sensação no corpo."] },
  { title: "Carregar Objetos Pesados", description: "'Trabalho pesado' que organiza o sistema nervoso.", steps: ["1. Encontre algo seguro para carregar (livros, garrafas de água, uma mochila).", "2. Carregue o objeto de um lado para o outro de uma sala.", "3. Concentre-se no esforço dos músculos.", "4. Faça isso por 1-2 minutos."] },
  { title: "Espreguiçar Total", description: "Contração e relaxamento de todo o corpo.", steps: ["1. Fique de pé ou deitado.", "2. Estique os braços acima da cabeça o máximo que puder.", "3. Estique as pernas e aponte os dedos dos pés.", "4. Tensione todos os músculos do corpo por 5 segundos (como se estivesse acordando).", "5. Solte tudo de uma vez e relaxe."] },

  
  { title: "Caixa de Texturas", description: "Exploração tátil focada para acalmar.", steps: ["1. Tenha uma caixa com objetos de diferentes texturas (algodão, lixa, veludo, metal frio).", "2. Feche os olhos e pegue um objeto.", "3. Explore-o com os dedos, focando apenas na sensação.", "4. Descreva a textura mentalmente (áspero, macio, frio, fofo).", "5. Troque de objeto após 30 segundos."] },
  { title: "Esfregar as Mãos", description: "Gera calor e foco sensorial nas palmas.", steps: ["1. Esfregue as palmas das mãos vigorosamente.", "2. Continue até sentir as mãos quentes.", "3. Pare e coloque as palmas quentes sobre os olhos fechados.", "4. Sinta o calor e a escuridão por alguns segundos."] },
  { title: "Água Corrente", description: "Foco sensorial na temperatura e movimento da água.", steps: ["1. Vá a uma pia.", "2. Abra a torneira (água morna ou fria, conforme preferir).", "3. Coloque as mãos sob a água corrente.", "4. Foque apenas na sensação da água batendo na pele.", "5. Tente sentir cada gota individualmente."] },
  { title: "Traçar Letras na Pele", description: "Combina toque leve com foco cognitivo.", steps: ["1. Use o dedo indicador.", "2. 'Escreva' lentamente letras do alfabeto na palma da outra mão.", "3. Tente adivinhar qual letra você está desenhando.", "4. (Alternativa) Faça o mesmo no antebraço."] },
  { title: "Brincar com Grãos", description: "Sensorial tátil seco e contido.", steps: ["1. Tenha uma tigela com arroz cru, feijão ou areia cinética.", "2. Mergulhe as mãos nos grãos.", "3. Deixe-os escorrer por entre os dedos.", "4. Sinta o som e a textura de milhares de pequenos pontos tocando sua pele."] },
  { title: "Toque de Pena", description: "Foco em sensações táteis muito leves.", steps: ["1. Pegue algo muito macio (ponta de uma pena, pincel de maquiagem, bola de algodão).", "2. Passe-o lentamente sobre a pele do braço ou do rosto.", "3. Foque na sensação de leveza e no arrepio que pode causar.", "4. Faça isso de forma lenta e deliberada."] },
  { title: "Vestir Roupas Confortáveis", description: "Mudar o input tátil de irritante para calmante.", steps: ["1. Se estiver se sentindo sobrecarregado, perceba se sua roupa está 'pinicando' ou apertada.", "2. Tire um momento para trocar de roupa.", "3. Coloque sua peça de roupa mais confortável (um moletom macio, calças largas).", "4. Sinta a diferença imediata na sua pele."] },

  
  { title: "Balanço Lento (Stimming)", description: "Movimento rítmico e previsível para auto-regulação.", steps: ["1. Sente-se confortavelmente em uma cadeira ou no chão.", "2. Balance o tronco lentamente para frente e para trás.", "3. Encontre um ritmo que pareça calmante.", "4. Feche os olhos se se sentir confortável.", "5. Continue por 1-2 minutos."] },
  { title: "Girar na Cadeira", description: "Input vestibular controlado para 'resetar'.", steps: ["1. Sente-se em uma cadeira de escritório que gire.", "2. Use os pés para girar lentamente em uma direção.", "3. Gire 3-4 vezes.", "4. Pare, coloque os pés no chão e espere a tontura passar.", "5. Gire 3-4 vezes na outra direção."] },
  { title: "Posição do Super-Homem", description: "Trabalho postural e vestibular no chão.", steps: ["1. Deite-se de barriga para baixo no chão.", "2. Estique os braços para a frente.", "3. Ao mesmo tempo, levante os braços, a cabeça/peito e as pernas do chão.", "4. Mantenha por 3-5 segundos, como se estivesse voando.", "5. Relaxe e repita 5 vezes."] },
  { title: "Andar na Ponta dos Pés", description: "Muda o centro de gravidade e aumenta a consciência corporal.", steps: ["1. Fique em pé e levante os calcanhares, ficando na ponta dos pés.", "2. Tente andar pela sala mantendo o equilíbrio.", "3. Foque em manter os tornozelos firmes.", "4. Faça isso por 1 minuto."] },
  { title: "Equilíbrio em Um Pé Só", description: "Foco intenso no equilíbrio e no 'core'.", steps: ["1. Fique de pé e fixe o olhar em um ponto na parede.", "2. Levante um pé do chão, dobrando o joelho.", "3. Tente manter o equilíbrio por 15 segundos.", "4. Sinta os pequenos músculos do seu pé e perna trabalhando.", "5. Troque de perna."] },
  { title: "Rolar no Chão", description: "Pressão profunda e input vestibular combinados.", steps: ["1. Deite-se no chão (carpete ou tapete).", "2. Mantenha o corpo reto como um 'lápis'.", "3. Role de um lado da sala para o outro.", "4. Tente rolar em linha reta.", "5. (Alternativa) Deite em um cobertor e peça para alguém enrolá-lo como um 'sushi'."] },
  { title: "Balançar na Rede (ou Cadeira)", description: "Movimento vestibular passivo e rítmico.", steps: ["1. Sente-se em uma cadeira de balanço ou deite em uma rede.", "2. Balance-se em um ritmo lento e constante.", "3. Não precisa balançar rápido ou alto.", "4. Foque no movimento suave de vai-e-vem.", "5. Faça por 3-5 minutos."] },

  
  { title: "Fone com Ruído Branco", description: "Bloqueia sons imprevisíveis e sobrecarregantes.", steps: ["1. Coloque fones de ouvido (preferencialmente que cubram a orelha).", "2. Coloque para tocar um som constante: ruído branco, rosa ou som de chuva.", "3. Ajuste o volume para que seja confortável, não alto.", "4. Use isso como um 'escudo auditivo' em ambientes barulhentos."] },
  { title: "Escuta Focada (Distante/Perto)", description: "Treina o cérebro a 'filtrar' sons.", steps: ["1. Feche os olhos e fique em silêncio.", "2. Tente identificar o som mais distante que você pode ouvir (um carro, um avião).", "3. Mantenha o foco nesse som por 30 segundos.", "4. Agora, mude o foco para o som mais próximo (sua respiração, o computador).", "5. Alterne o foco entre o som mais distante e o mais próximo."] },
  { title: "Estalar os Dedos Ritmado", description: "Cria um som previsível e rítmico (stimming auditivo).", steps: ["1. Comece a estalar os dedos de uma mão.", "2. Tente manter um ritmo perfeitamente constante.", "3. Tente alternar as mãos: Direita, Esquerda, Direita, Esquerda.", "4. Foque 100% em manter o ritmo por 1 minuto."] },
  { title: "Cantarolar (Humming)", description: "Usa a vibração vocal para auto-acalmar.", steps: ["1. Feche a boca e relaxe a mandíbula.", "2. Inspire pelo nariz.", "3. Ao expirar, faça um som de 'hmmmmmm' (cantarole).", "4. Tente sentir a vibração no peito, garganta e rosto.", "5. Repita por 5-10 respirações."] },
  { title: "Silêncio Planejado", description: "Usa abafadores para dar uma pausa completa ao sistema auditivo.", steps: ["1. Em um momento de sobrecarga, peça licença.", "2. Vá para um lugar quieto (banheiro, quarto).", "3. Coloque abafadores de ruído ou protetores auriculares.", "4. Sente-se em silêncio absoluto por 3-5 minutos.", "5. Foque na ausência de som."] },
  { title: "Música de Frequência", description: "Usa batidas binaurais ou frequências graves para acalmar.", steps: ["1. Coloque fones de ouvido.", "2. Procure por 'binaural beats for calm' ou 'low frequency music'.", "3. Ouça em volume baixo.", "4. Apenas sente-se e deixe o som 'lavar' o cérebro, sem tentar analisá-lo.", "5. Faça isso por 5 minutos."] },
  { title: "Bater Leve (Tapping)", description: "Cria um som suave e tátil.", steps: ["1. Use as pontas dos dedos.", "2. Bata levemente em uma superfície (mesa, coxa).", "3. Crie um ritmo: 'tá-tá-tum... tá-tá-tum...'", "4. Foque no som e na sensação nas pontas dos dedos."] },

  
  { title: "Encontrar 5 Coisas da Mesma Cor", description: "Organiza o input visual caótico em uma tarefa.", steps: ["1. Olhe ao seu redor.", "2. Escolha uma cor (ex: azul).", "3. Encontre e nomeie mentalmente 5 coisas azuis no ambiente.", "4. (Ex: 'A caneta é azul. O livro é azul. O logo na tela é azul...')", "5. Repita com outra cor se necessário."] },
  { title: "Acompanhar o Pêndulo", description: "Usa o movimento ocular suave para acalmar.", steps: ["1. Pegue um objeto em um cordão (um colar, um fone de ouvido).", "2. Segure-o e balance-o lentamente para frente e para trás, como um pêndulo.", "3. Mantenha a cabeça parada.", "4. Acompanhe o objeto apenas com os olhos.", "5. Faça isso por 30 segundos."] },
  { title: "Olhar pela Janela (Foco Distante)", description: "Relaxa os músculos dos olhos e muda a perspectiva.", steps: ["1. Pare o que está fazendo e vá até uma janela.", "2. Foque no objeto mais distante que você pode ver (prédio, nuvem, árvore).", "3. Mantenha o olhar nesse objeto por 1 minuto.", "4. Deixe seus olhos relaxarem, sem forçar o foco."] },
  { title: "Foco no Dedo (Perto/Longe)", description: "Exercício de foco visual que 'puxa' a atenção.", steps: ["1. Estique o braço e levante o dedo indicador.", "2. Foque 100% no seu dedo por 5 segundos.", "3. Mude o foco para algo distante atrás do seu dedo (ex: parede) por 5 segundos.", "4. Traga o foco de volta para o dedo.", "5. Repita 5 vezes."] },
  { title: "Observar a Chama (ou LED)", description: "Foco visual em um único ponto de luz.", steps: ["1. Acenda uma vela (com segurança) ou olhe para uma pequena luz (ex: LED do monitor).", "2. Apenas observe a luz sem analisá-la.", "3. Se for uma vela, observe o movimento da chama.", "4. Mantenha o olhar fixo por 1 minuto."] },
  { title: "Desenhar Formas no Ar", description: "Combina movimento visual e motor.", steps: ["1. Use o dedo indicador como um lápis.", "2. Desenhe formas grandes no ar à sua frente (círculo, quadrado, triângulo).", "3. Acompanhe a ponta do seu dedo com os olhos.", "4. Tente 'ver' a forma que você desenhou no ar."] },
  { title: "Imagens de Fratal", description: "Focar em padrões complexos e repetitivos pode ser calmante.", steps: ["1. Procure no seu celular ou computador por 'imagem de fratal' (fractal image).", "2. Abra a imagem em tela cheia.", "3. Deixe seus olhos vagarem pelo padrão.", "4. Siga as linhas e repetições com os olhos por 1-2 minutos."] },

  // === Cognitivo/Lógico (Foco no Pensamento) ===
  { title: "Categorias", description: "Usa a parte lógica do cérebro para desviar da emoção.", steps: ["1. Escolha uma categoria (ex: Animais, Frutas, Países).", "2. Tente listar mentalmente 10 a 15 itens dessa categoria.", "3. Tente fazer isso em ordem alfabética se for fácil (Anta, Baleia, Cão...).", "4. Se travar, apenas mude de categoria."] },
  { title: "Soletrar de Trás para Frente", description: "Tarefa cognitiva que exige foco intenso.", steps: ["1. Pense em uma palavra de 5 ou 6 letras (ex: 'CADEIRA').", "2. Soletre-a mentalmente de trás para frente (A-R-I-E-D-A-C).", "3. Tente com seu próprio nome.", "4. A dificuldade da tarefa ajuda a 'quebrar' o ciclo de ansiedade."] },
  { title: "Descrever um Processo", description: "Foca na memória e em sequências lógicas.", steps: ["1. Pense em uma tarefa simples (ex: fazer café, escovar os dentes).", "2. Descreva mentalmente cada passo, em detalhes.", "3. (Ex: 'Primeiro, pego a caneca no armário. Segundo, coloco o pó. Terceiro, esquento a água...')", "4. Seja o mais detalhado e literal possível."] },
  { title: "O Jogo do 'E Se?' Positivo", description: "Combate pensamentos catastróficos com cenários neutros ou positivos.", steps: ["1. Se sua mente está em 'E se tudo der errado?'.", "2. Force-se a perguntar o oposto: 'E se tudo der certo?'.", "3. Pergunte algo neutro: 'E se eu comer macarrão hoje?'.", "4. O objetivo é mostrar que 'E se?' é apenas um pensamento, não um fato."] },
  { title: "Quebra-Cabeça Mental", description: "Usa a visualização espacial e lógica.", steps: ["1. Imagine um objeto simples (ex: um cubo).", "2. Imagine que ele se quebra em 4 pedaços.", "3. Tente 'remontar' o cubo na sua mente.", "4. (Alternativa) Imagine seu quarto e tente listar todos os objetos na parede direita."] },
  { title: "Recitar Fatos (Hiperfoco)", description: "Usa um interesse especial (hiperfoco) como ferramenta calmante.", steps: ["1. Pense no seu tópico de interesse (dinossauros, programação, música).", "2. Comece a listar fatos sobre esse tópico mentalmente.", "3. (Ex: 'O T-Rex viveu no Cretáceo. O Python é uma linguagem interpretada.')", "4. Engajar-se com um tópico seguro e conhecido é reconfortante."] },
  { title: "Contar de 7 em 7 (Subtração)", description: "Tarefa matemática que exige concentração.", steps: ["1. Comece em 100.", "2. Subtraia 7 mentalmente: 100, 93, 86, 79...", "3. Tente chegar o mais perto de zero possível.", "4. Se 7 for muito difícil, subtraia de 3 em 3."] },

  
  { title: "Checagem do Coração", description: "Foca na percepção do batimento cardíaco.", steps: ["1. Sente-se quieto.", "2. Coloque a mão sobre o peito ou no pulso.", "3. Tente sentir seu batimento cardíaco.", "4. Apenas note a velocidade (rápido, lento) sem julgar.", "5. Tente respirar fundo e veja se o ritmo muda."] },
  { title: "Onde Sinto Isso?", description: "Nomear a localização física da emoção.", steps: ["1. Pergunte-se: 'O que estou sentindo?' (ex: 'Ansiedade').", "2. Pergunte-se: 'Onde no meu corpo eu sinto isso?'.", "3. (Ex: 'É um aperto no peito', 'Um nó no estômago', 'Meus ombros estão tensos').", "4. Apenas nomear a sensação física ajuda a distanciá-la da emoção."] },
  { title: "Varredura da Tensão", description: "Variação do escaneamento corporal, focada em tensão.", steps: ["1. Feche os olhos.", "2. Foque na sua mandíbula. Está apertada? Tente relaxá-la.", "3. Foque nos seus ombros. Estão altos? Tente baixá-los.", "4. Foque nas suas mãos. Estão fechadas? Tente abri-las.", "5. Faça essa checagem rápida (mandíbula, ombros, mãos)."] },
  { title: "Sentir a Gravidade", description: "Aumenta a percepção do peso e do 'chão'.", steps: ["1. Sente-se ou deite-se.", "2. Foque sua atenção nos pontos onde seu corpo toca a cadeira ou o chão.", "3. Sinta o peso dos seus pés no chão.", "4. Sinta o peso das suas pernas na cadeira.", "5. Imagine a gravidade 'puxando' você gentilmente para baixo, segurando você."] },
  { title: "Gole de Água Lento", description: "Foco interoceptivo no ato de engolir.", steps: ["1. Pegue um copo de água (de preferência fria ou morna).", "2. Tome um gole pequeno, mas não engula ainda.", "3. Sinta a temperatura da água na boca.", "4. Engula lentamente e sinta a água descendo pela garganta até o estômago.", "5. Repita 3 vezes."] },
  { title: "Checagem de Necessidades Básicas", description: "Verifica se a desregulação é física.", steps: ["1. Pare e pergunte-se: 'Eu comi nas últimas 3 horas?'.", "2. 'Eu bebi água na última hora?'.", "3. 'Eu dormi o suficiente noite passada?'.", "4. 'Eu preciso ir ao banheiro?'.", "5. Às vezes, a 'ansiedade' é na verdade fome ou sede."] },

  
  { title: "Respiração do Sopro (Bolhas)", description: "Foca em uma expiração longa e controlada.", steps: ["1. Imagine que você está segurando um soprador de bolhas de sabão.", "2. Inspire pelo nariz.", "3. Expire pela boca o mais lentamente possível, como se quisesse fazer uma bolha gigante sem estourar.", "4. Foque em tornar a expiração 2x mais longa que a inspiração.", "5. Repita 5 vezes."] },
  { title: "Respiração da Abelha (Bhramari)", description: "Usa vibração sonora para acalmar.", steps: ["1. Sente-se confortavelmente.", "2. Feche os olhos e tape os ouvidos com os dedos (opcional).", "3. Inspire profundamente pelo nariz.", "4. Ao expirar pela boca, mantenha os lábios fechados e faça um som de 'zumbido' (como uma abelha).", "5. Sinta a vibração no rosto e no peito.", "6. Repita 5-6 vezes."] },
  { title: "Respiração de Narina Alternada", description: "Técnica de yoga para equilibrar o sistema nervoso.", steps: ["1. Sente-se ereto.", "2. Use o polegar direito para fechar a narina direita.", "3. Inspire lentamente pela narina esquerda.", "4. Use o dedo anelar direito para fechar a narina esquerda.", "5. Solte o polegar e expire pela narina direita.", "6. Inspire pela narina direita, feche-a com o polegar, e expire pela esquerda."] },
  { title: "Respiração 'Cheirar a Flor'", description: "Metáfora simples para respiração profunda.", steps: ["1. Imagine que está segurando uma flor bonita.", "2. Inspire profundamente pelo nariz, como se estivesse cheirando a flor.", "3. Imagine que está segurando uma vela de aniversário.", "4. Expire lentamente pela boca, como se estivesse soprando a vela.", "5. Repita: 'Cheire a flor, sopre a vela'."] },
  { title: "Suspiro Consciente", description: "Usa o suspiro natural do corpo para liberar tensão.", steps: ["1. Inspire normalmente pelo nariz.", "2. Inspire um pouco mais de ar ('inspiração dupla').", "3. Solte todo o ar pela boca com um suspiro longo e audível ('Haaaaa').", "4. Não precisa ser forçado, deixe o som sair.", "5. O corpo faz isso naturalmente; aqui, fazemos de propósito para aliviar a tensão."] },

  
  { title: "Cheirar Algo Forte", description: "Usa um cheiro intenso para 'ancorar' no presente.", steps: ["1. Tenha por perto um óleo essencial (hortelã, lavanda) ou algo com cheiro forte (grãos de café, casca de limão).", "2. Quando se sentir 'aéreo' ou ansioso, abra o recipiente.", "3. Cheire profundamente 2-3 vezes.", "4. O cheiro forte 'corta' os pensamentos e traz você de volta ao corpo."] },
  { title: "Gosto Intenso (Azedo/Amargo)", description: "Usa o paladar para um 'choque' sensorial.", steps: ["1. Tenha à mão uma bala azeda, um pedaço de limão ou gengibre cristalizado.", "2. Quando sentir uma crise de ansiedade ou dissociação vindo.", "3. Coloque o item na boca.", "4. Foque 100% na sensação intensa do gosto azedo ou amargo.", "5. Isso ajuda a 'aterrar' rapidamente."] },
  { title: "Morder (Sensorial Oral)", description: "Input proprioceptivo forte para a mandíbula.", steps: ["1. Use um mordedor, colar sensorial ou até um pedaço de borracha seguro (não-tóxico).", "2. Morda o objeto com os molares (dentes de trás).", "3. Mantenha a pressão por 5-10 segundos e solte.", "4. (Alternativa) Mascar um chiclete de sabor forte."] },
  { title: "Foco no Sabor (Mindful Eating)", description: "Versão mini da técnica 5-4-3-2-1, focada no paladar.", steps: ["1. Pegue uma única coisa pequena (uma uva passa, um pedaço de chocolate, uma castanha).", "2. Olhe para ela, sinta a textura.", "3. Coloque na boca, mas não mastigue.", "4. Note o sabor inicial. Role-a na língua.", "5. Mastigue muito lentamente, notando como o sabor muda.", "6. Foque nisso até engolir."] }
];


export {
  expressions as mockExpressions,
  motivation as mockMotivation,
  bible as mockBible,
  challenges as mockChallenges,
  regulations as mockRegulations
};