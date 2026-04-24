# Hackathon Cognition São Paulo [2026-04-25]

Competição intensa de desenvolvimento com imersão prática em ferramentas de IA para código, organizada pela Cognition em São Paulo. Engenheiros de software e times de produto competem construindo projetos com agentes de IA autônomos em 4 horas. A Agora é sponsor oficial e todos os projetos elegíveis devem demonstrar **Agora Conversational AI** e **Agora RTC** em funcionamento.

> **English summary:** Build a project in 4 hours using **Agora Conversational AI + Agora RTC**. Submit through a Pull Request by **2026-04-25, 15:00 BRT**. Start with [`AGORA_QUICKSTART.md`](./AGORA_QUICKSTART.md) for the fastest path.

## 🎯 Tema

O hackathon é aberto em tema, desde que o projeto entregue uma experiência convincente com IA conversacional em tempo real. O objetivo não é apenas usar APIs isoladas, mas mostrar uma solução funcional em que a experiência de voz, a interação em tempo real e a proposta do produto façam sentido juntos.

---

## 🔧 Requisitos e regras

### Tecnologias obrigatórias

Todos os projetos submetidos devem integrar as tecnologias abaixo:

| Tecnologia                            | O que significa na prática                                                                                                                           | Documentação                                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Agora Conversational AI (ConvoAI)** | O projeto precisa incluir um agent ou fluxo conversacional com IA usando a stack de Conversational AI da Agora.                                      | [Docs](https://docs.agora.io/en/conversational-ai/overview/product-overview)                 |
| **Agora RTC**                         | A experiência deve usar a camada de comunicação em tempo real da Agora para áudio, voz, streaming ou outra interação síncrona relevante para a demo. | [RTC Web SDK Quickstart](https://docs.agora.io/en/video-calling/get-started/get-started-sdk) |

### Acesso ao Discord do evento

- Entre pelo convite oficial: [https://discord.gg/QwFFZ7BW](https://discord.gg/QwFFZ7BW)
- Esse convite concede a role **São Paulo Hackathon**, necessária para visualizar os canais da Agora.
- **Mesmo quem já está no Discord deve usar esse link e aceitar o convite** para garantir acesso ao canal do evento.

### Regras

- Submeta o projeto em uma pasta própria dentro de `submissions/`.
- Inclua código-fonte, instruções de setup e uma descrição clara do projeto no `README.md` da equipe.
- A demo deve mostrar **ConvoAI + RTC** de forma funcional, mesmo que o escopo seja pequeno.
- Não comite segredos. Use `.env.example` quando necessário.
- O Pull Request precisa ser aberto até **2026-04-25, 15:00 BRT**.
- Informe no `README.md` da equipe se o projeto foi construído com **Windsurf**, **Devin** ou ambos.

### Oportunidades de bônus

Vocês podem ganhar crédito extra se forem além do requisito mínimo:

- Uso relevante de recursos adicionais da Agora além de ConvoAI + RTC.
- Integração bem executada com trilhas parceiras, como **Oracle OCI**, quando fizer sentido para o produto.
- Demo especialmente clara, polida e memorável.

---

## 📚 Recursos e starter code

### Comece por aqui

> 🛠️ Leia primeiro [`AGORA_QUICKSTART.md`](./AGORA_QUICKSTART.md) para seguir o caminho mais rápido com samples, quickstarts, CLI, Agent Skills e Agora MCP.

### Repositórios oficiais

| Repositório                                                                                         | Quando usar                                                                                                                  |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [**Agent Samples**](https://github.com/AgoraIO-Conversational-AI/agent-samples)                     | Coleção de exemplos prontos de voice agents, incluindo um prompt base para experiências com avatar e demos mais memoráveis.  |
| [**agent-quickstart-python**](https://github.com/AgoraIO-Community/agent-quickstart-python)         | Quickstart full-stack com backend em FastAPI e cliente web, bom para times que querem começar rápido com Python no servidor. |
| [**agent-quickstart-nextjs**](https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs) | Quickstart oficial em Next.js para uma experiência de voz no browser com setup enxuto e defaults gerenciados pela Agora.     |
| [**Agora AI UI Kit**](https://github.com/AgoraIO-Community/agora-ai-uikit)                          | Biblioteca de componentes React para acelerar interfaces de voz, agents e experiências em tempo real.                        |
| [**Agora Realtime AI API**](https://github.com/AgoraIO/agora-realtime-ai-api)                       | Implementação e referência para integrações server-side com os recursos de IA em tempo real da Agora.                        |

### Documentação e ferramentas

- [Agora Conversational AI (ConvoAI)](https://docs.agora.io/en/conversational-ai/overview/product-overview)
- [Agora RTC Web SDK Quickstart](https://docs.agora.io/en/video-calling/get-started/get-started-sdk)
- [Agora MCP](https://docs.agora.io/en/conversational-ai/get-started/mcp) — use `https://mcp.agora.io` para levar a documentação da Agora para dentro do seu assistant/IDE.
- [Agora Console](https://console.agora.io)
- [Agora CLI (`agoraio-cli`)](https://www.npmjs.com/package/agoraio-cli)
- [Agora Skills Catalog](https://skills.sh/agoraio/skills/agora)
- [Windsurf (Cognition)](https://windsurf.com)
- [Devin (Cognition)](https://devin.ai)
- [Oracle Cloud Infrastructure](https://cloud.oracle.com)

---

## 📌 Como submeter

### 1. Faça um fork deste repositório

Para submeter seu projeto no Cognition Hack São Paulo:

1. Faça um **fork** deste repositório para a sua conta do GitHub.
2. Crie a pasta da sua equipe dentro de `submissions/`, usando um nome curto em lowercase e com hífens.
3. Adicione os arquivos do projeto:
   - `README.md` — nome do time, membros, descrição do projeto, ferramentas usadas, setup, dependências e limitações.
   - `src/` — código-fonte do projeto.
   - `demo.mp4` ou screenshots em `docs/` — recomendado.
   - `.env.example` — quando o projeto depender de variáveis de ambiente.
4. Commit e push para o seu fork.
5. Abra um Pull Request para a branch `main` deste repositório até **2026-04-25, 15:00 BRT**.

**Somente participantes presenciais com Pull Request aberto até 15:00 BRT estarão elegíveis para premiação.**

### 2. Clone seu fork

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/cognition-hack-sp-2026.git
cd cognition-hack-sp-2026
```

Se você só quiser explorar os materiais antes de começar a submeter, também pode clonar o repositório principal:

```bash
git clone https://github.com/AgoraIO-Community/cognition-hack-sp-2026.git
cd cognition-hack-sp-2026
```

### 3. Estruture a pasta do time

Cada equipe deve organizar sua entrega dentro de uma única pasta em `submissions/`. Exemplo:

```text
submissions/
└── team-awesome/
    ├── README.md
    ├── src/
    ├── demo.mp4
    └── docs/
```

O `README.md` da equipe deve incluir:

- Nome do time e integrantes.
- Descrição curta do projeto.
- Ferramentas usadas: **Windsurf**, **Devin** ou ambos.
- Instruções de setup e execução.
- Dependências externas e variáveis de ambiente.
- Limitações, trade-offs ou próximos passos.

### 4. Envie o Pull Request

No PR, inclua pelo menos:

- Nome do time
- Nome do projeto
- Resumo curto do que foi construído
- Instruções para rodar ou avaliar a demo
- Observações importantes para a banca, se houver

---

## 🏆 Critérios de avaliação

Os projetos serão avaliados com os seguintes pesos:

- **Qualidade técnica do projeto** (33,33%) — solidez da implementação, uso correto das ferramentas, código funcional e livre de bugs.
- **Apresentação visual do projeto** (33,33%) — polimento da interface, experiência do usuário e clareza visual da demo.
- **Impacto e originalidade da ideia** (33,34%) — criatividade, relevância do problema e potencial de impacto real.

Veja a rubrica completa em [`hackathon-rating-rubric.md`](./hackathon-rating-rubric.md).

### Banca avaliadora

- **Guilherme Duarte de Barros** — Coordenador das Engenharias & TI e Computação, Universidade Anhembi Morumbi
- **Filipe Cezar dos Santos** — Community Manager, Oracle
- **Matheus Pagani** — Founder e CEO, Venture Miner
- **Edquel B. Prado Farias** — Professor, Universidade Anhembi Morumbi
- **Vera Forbeck** — Professora, Universidade Anhembi Morumbi
- **Gustavo Sant'ana** — Artificial Intelligence Engineer, Oracle
- **Yannick (Yan) Belot** — Head of Sales and Partnerships, Agora
- **Luiz Real** — Lead Software Engineer, Fundunesp

---

## ❓ Precisa de ajuda?

Contato principal da Agora durante o evento:

- **Yan Belot** — [yannick.belot@agora.io](mailto:yannick.belot@agora.io)
- **Discord do evento:** [https://discord.gg/QwFFZ7BW](https://discord.gg/QwFFZ7BW)

Ao entrar no Discord, você recebe a role **São Paulo Hackathon**. Só depois disso os canais da Agora para participantes ficam visíveis.

Boa sorte e bom hack.
