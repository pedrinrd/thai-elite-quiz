# Thai Elite — Reformulação de Carrosséis, Seção de Bônus Exclusivos, Animações de Scroll e Correção de Deploy

Este plano detalha a evolução visual e estrutural da landing page **Thai Elite**, substituindo o antigo mockup e o bloco misto por duas vitrines em carrossel independentes (Treinos em Vídeo 9:16 estilo Reels e Prova Social de Alunos), adicionando a seção nativa dos **5 Bônus Exclusivos** fiel à referência visual enviada, intensificando as animações de scroll e solucionando o erro `vite: command not found` para o deploy.

## User Review & Critical Decisions

> [!IMPORTANT]
> As decisões abaixo refletem exatamente as escolhas confirmadas para a nova estrutura da página:

- **Decisão Confirmada 1 — Substituição do Mockup pelo Carrossel de Treinos**: O mockup de smartphone será removido e dará lugar a uma vitrine dedicada e dinâmica com os vídeos reais de treino.
- **Decisão Confirmada 2 — Formato Reels 9:16 para Vídeos e Seção Separada para Depoimentos**: Os vídeos de treino e os depoimentos deixam de dividir abas na mesma caixa e passam a ter duas seções independentes, cada uma com seu próprio carrossel automático e animado.
- **Decisão Confirmada 3 — Seção Nativa dos 5 Bônus Exclusivos (Fiel à 3ª Print)**: Logo abaixo dos carrosséis (e antes dos cards de preço), será implementada a seção de Bônus Exclusivos em Bento Grid com os 5 bônus detalhados e a faixa inferior de ancoragem de valor (`R$ 179,00` riscado — inclusos no Pacote Pro).
- **Decisão Confirmada 4 — Correção do Deploy (`vite: command not found`)**: Sincronização completa das dependências e validação do comando de build para eliminar o código de saída 127 durante a publicação.

---

## 1. Overview & Core Concept

- **O Que Entrega**: Uma experiência de vendas mais fluida, cinematográfica e persuasiva, onde o visitante assiste aos vídeos reais de treino deslizando automaticamente em formato vertical 9:16, confere provas sociais reais em um segundo carrossel dedicado e visualiza o valor tangível dos 5 bônus antes de escolher seu plano.
- **Público-Alvo**: Praticantes, atletas e instrutores de Muay Thai que buscam organização imediata de treinos em vídeo e materiais práticos pelo celular.
- **Valor Principal**: Aumentar a percepção de valor do **Pacote Pro (R$ 27,90 / Upgrade R$ 18,90)** por meio da demonstração visual contínua dos treinos e da apresentação clara dos R$ 179,00 em bônus inclusos.

---

## 2. User Experience & Visual Design

### Fluxo Visual da Página (Nova Sequência de Seções)

1. **Seção 1 — Hero + VSL Principal**:
   - Faixa superior `THAI ELITE | TREINAMENTO DIGITAL`, headline de impacto com reveal animado, player vertical 9:16 centralizado com controles acessíveis e CTA principal com rolagem suave.
2. **Seção 2 — Benefícios Essenciais + Carrossel Animado de Treinos (Formato Reels 9:16)**:
   - Os 3 pilares rápidos (*Treinos em Vídeo*, *Combinações Prontas*, *Acesso pelo Celular*) com entrada escalonada no scroll.
   - **Novo Carrossel Exclusivo de Treinos em Vídeo**: Múltiplos cards verticais 9:16 deslizando automaticamente em pista contínua/paginada suave, exibindo os vídeos reais de treinos e técnicas com tags de categoria, título da técnica, botão para ativar som/pausar e controles manuais de avanço.
3. **Seção 3 — Carrossel Exclusivo de Depoimentos & Prova Social**:
   - Seção dedicada exclusivamente aos relatos e capturas reais de alunos no WhatsApp e Instagram, deslizando automaticamente com cards de avaliação 5 estrelas, foto do print real e citação destacada.
4. **Seção 4 — Bônus Exclusivos (Fiel à 3ª Print)**:
   - Cabeçalho em destaque: `BÔNUS EXCLUSIVOS • CONTEÚDO EXTRA PARA MAXIMIZAR SEUS TREINOS`.
   - **Bento Grid de 5 Cards Nativos Animados**:
     - **Bônus 01 (Card Largo em Destaque)**: *20 Combinações de Ataque Profissionais* — Vídeos em alta qualidade, Passo a passo detalhado, Aplicação prática no treino, botão `ASSISTIR AGORA`.
     - **Bônus 02**: *50 Treinos Físicos para Muay Thai* — Treinos de força, resistência e condicionamento, Programas de curta e longa duração, Melhore seu desempenho no tatame e na vida.
     - **Bônus 03**: *50 Técnicas de Defesa e Contra-Ataque* — Defesas eficientes e precisas, Contra-ataques rápidos e eficazes, Aumente seu poder de reação.
     - **Bônus 04 (Borda Vermelha em Destaque)**: *Guia de Fundamentos do Muay Thai* — Postura, movimentação e guarda, Base sólida para evoluir, Ideal para iniciantes e intermediários.
     - **Bônus 05**: *Guia de Recuperação Muscular* — Previna lesões, Volte mais rápido aos treinos, Cuide do seu corpo.
   - **Banner Inferior de Ancoragem**: Caixa tracejada vermelha exibindo o ícone de presente, `VALOR TOTAL DOS BÔNUS: R$ 179,00` (riscado em vermelho) e `INCLUSOS NO PACOTE PRO: 5 bônus exclusivos + biblioteca completa de treinos e materiais adicionais`.
5. **Seção 5 — Oferta (Pacote Básico R$ 10,00 vs. Pacote Pro R$ 27,90)**:
   - Cards comparativos com acionamento do Pop-up de Upgrade (R$ 18,90) ao clicar no Básico e redirecionamento oficial Zuptos.
6. **Seção 6 — Garantia de 7 Dias + FAQ + CTA Final**.

### Identidade Visual & Animações de Scroll

- **Paleta de Alto Contraste**: Fundo principal `#090909`, superfícies `#111111` e `#181818`, vermelho de ação `#E50914` (hover `#C40812`), detalhes premium em dourado `#D4AF37` e textos secundários `#A1A1AA`.
- **Tipografia Esportiva**: Títulos em `Barlow Condensed` (Bold/Black, caixa alta) e corpo/controles em `Inter`.
- **Animações de Scroll Intensificadas (`motion/react`)**:
  - **Scroll-Triggered Reveals**: Cada seção, título e card utiliza gatilhos `whileInView` com transição combinada de opacidade (`0 → 1`), deslocamento vertical (`y: 35 → 0`) e escala sutil (`0.95 → 1`).
  - **Stagger Progressivo nas Grades**: Os 3 cards de benefícios, os 5 cards da seção de Bônus Exclusivos e os cards de preço surgem em cascata sequencial conforme o usuário rola a página.
  - **Carrosséis com Movimento Contínuo e Interativo**: Transição elástica suave entre slides, pausa automática ao posicionar o cursor ou tocar no card, e resposta imediata às setas laterais.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Separar Vídeos e Depoimentos em Duas Seções Independentes**
  - *Abordagem Escolhida*: Duas vitrines consecutivas e autônomas em vez de abas ocultas.
  - *Por quê*: Quando os depoimentos ficam escondidos atrás de uma aba, a maioria dos visitantes mobile nunca clica para vê-los. Exibir primeiro o carrossel vertical 9:16 de treinos e logo abaixo o carrossel de depoimentos garante que 100% dos usuários vejam tanto o produto em ação quanto a prova social durante a rolagem.
- **Decisão 2: Construir os 5 Bônus em Código Nativo (Bento Grid) em vez de Imagem Estática Única**
  - *Abordagem Escolhida*: Reproduzir fielmente o layout de 5 cards + barra de valor R$ 179,00 diretamente em HTML/Tailwind com animações individuais no scroll e responsividade mobile nativa.
  - *Por quê*: Uma imagem larga única fica com texto ilegível em telas de celular (360px–430px). Em código nativo, o grid adapta-se perfeitamente em 2 colunas/3 colunas no desktop e empilha com leitura cristalina e animações impactantes no smartphone.
- **Decisão 3: Solução Definitiva para o Erro de Build (`vite: command not found`)**
  - *Abordagem Escolhida*: Reinstalar e validar a árvore `node_modules/.bin/vite` e garantir que o script de build e os pacotes estejam íntegros antes da compilação final.
  - *Por quê*: O erro `BUILD_UTILS_SPAWN_127` ocorre quando o binário local do Vite não está presente ou acessível no ambiente de empacotamento.

---

## 4. Technical Architecture & Data Strategy

### Diagrama de Arquitetura e Fluxo de Componentes

```
┌─────────────────────────────────────────────────────────────────────────┐
│                             App (Thai Elite)                            │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
      ┌─────────────────────────────┼─────────────────────────────┐
      ▼                             ▼                             ▼
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│    HeroSection    │     │  BenefitsSection  │     │  WorkoutsCarousel │
│  (VSL 9:16 + CTA) │     │ (3 Cards c/ Scroll│     │ (Carrossel 9:16   │
│                   │     │  Stagger Reveal)  │     │  Automático Reels)│
└───────────────────┘     └───────────────────┘     └─────────┬─────────┘
                                                              │
      ┌─────────────────────────────┬─────────────────────────┘
      ▼                             ▼                             ▼
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│TestimonialsSection│     │   BonusSection    │     │   OfferSection    │
│ (Carrossel Auto   │     │ (Bento Grid 5     │     │ (Básico R$ 10 vs  │
│  de Prova Social) │     │  Bônus + R$ 179)  │     │  Pro R$ 27,90)    │
└───────────────────┘     └───────────────────┘     └─────────┬─────────┘
                                                              │
                                    ┌─────────────────────────┴─────────┐
                                    ▼                                   ▼
                          ┌───────────────────┐               ┌───────────────────┐
                          │   UpgradeModal    │               │GuaranteeFaqSection│
                          │ (Pop-up R$ 18,90) │               │ (7 Dias + 4 FAQs) │
                          └───────────────────┘               └───────────────────┘
```

### Mapeamento de Estado e Interatividade

- **Carrossel de Treinos (`WorkoutsCarousel`)**:
  - Renderiza os vídeos reais de treino enviados (`Tecnica_29`, `Treino_13`, `Treino_32`, `Treino_503`, `Combinação_14`, entre outros da biblioteca) em proporção `9:16`.
  - Auto-play silencioso (`muted`, `loop`, `playsInline`) com avanço automático de slides, botão individual para alternar áudio/pausa e navegação por setas/indicadores.
- **Carrossel de Depoimentos (`TestimonialsCarousel`)**:
  - Desliza automaticamente pelos depoimentos verificados com transição suave, permitindo pausar no hover/toque ou navegar manualmente.
- **Bento Grid de Bônus (`BonusSection`)**:
  - Todos os botões dos cards (`ASSISTIR AGORA` / `ACESSAR BÔNUS`) executam rolagem suave até a seção de escolha do plano (`#oferta`), mantendo o funil de conversão coeso.
