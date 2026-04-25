# Agora Quickstart — Cognition Hack SP

Guia rápido para equipes que querem sair do zero e colocar **Agora ConvoAI + Agora RTC** para funcionar dentro da janela curta do hackathon.

> **English summary:** Start with `agent-samples` or choose one official quickstart stack, then install Agora CLI, Agora Skills, and Agora MCP so your assistant can build against the latest docs faster.

Todas as referências abaixo são oficiais da Agora e foram escolhidas para reduzir o tempo entre "tivemos a ideia" e "a demo já está rodando".

---

## 1. Comece pelo `agent-samples`

Repositório: [https://github.com/AgoraIO-Conversational-AI/agent-samples](https://github.com/AgoraIO-Conversational-AI/agent-samples)

**Quando usar:** se vocês querem explorar exemplos prontos de voice agents, fluxos com avatar e estruturas de prompt que já economizam bastante tempo de descoberta.

```bash
git clone https://github.com/AgoraIO-Conversational-AI/agent-samples.git
cd agent-samples
```

Se o objetivo for "quero algo visualmente marcante e funcional rápido", este costuma ser o melhor ponto de partida.

---

## 2. Escolha um quickstart completo

### Opção A — Python quickstart

Repositório: [https://github.com/AgoraIO-Community/agent-quickstart-python](https://github.com/AgoraIO-Community/agent-quickstart-python)

**Quando usar:** para times que querem backend em Python com FastAPI e um cliente web já conectado ao fluxo de voz.

O quickstart inclui:

- backend em Python para token/auth e lifecycle do agent
- cliente web pronto para testar no browser
- defaults gerenciados pela Agora para acelerar o setup local

```bash
git clone https://github.com/AgoraIO-Community/agent-quickstart-python.git
cd agent-quickstart-python
bun install
cd server-python
cp .env.example .env.local
# editar .env.local com APP_ID e APP_CERTIFICATE
cd ..
bun run dev
```

Serviços esperados:

- frontend em `http://localhost:3000`
- backend em `http://localhost:8000`

### Opção B — Next.js quickstart

Repositório: [https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs](https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs)

**Quando usar:** para times que querem uma experiência de voz no browser com Next.js, App Router e setup mais enxuto em um único projeto.

O quickstart inclui:

- cliente de voz no browser com Next.js
- áudio em tempo real via RTC e eventos de transcript/estado
- rotas server-side para token, invite e stop

```bash
git clone https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs.git
cd agent-quickstart-nextjs
pnpm install
cp env.local.example .env.local
# definir NEXT_PUBLIC_AGORA_APP_ID e NEXT_AGORA_APP_CERTIFICATE
pnpm dev
```

Na base quickstart, os defaults de STT, LLM e TTS já vêm gerenciados pela Agora, então você não precisa conectar chaves extras só para provar o fluxo principal.

### Como escolher rápido

- Escolha **Python** se o time quer mais controle no backend logo no primeiro minuto.
- Escolha **Next.js** se o time quer iterar rápido na interface do browser.
- Escolha **agent-samples** se o time quer partir de um exemplo pronto e adaptar a ideia.

---

## 3. Agora CLI

Pacote npm: [https://www.npmjs.com/package/agoraio-cli](https://www.npmjs.com/package/agoraio-cli)

```bash
npm install -g agoraio-cli
```

**Para que serve:** agiliza operações recorrentes no terminal, como setup, validação de credenciais e fluxos de trabalho comuns com a stack da Agora.

---

## 4. Agent Skills

Catálogo: [https://skills.sh/agoraio/skills/agora](https://skills.sh/agoraio/skills/agora)

```bash
npx skills add https://github.com/agoraio/skills --skill agora
```

**Para que serve:** adiciona contexto especializado ao seu assistant para gerar código, scaffolds e integrações com muito menos tentativa e erro.

Skills úteis para o hack:

- `convoai-demo-scaffold`
- `rtc-demo-scaffold`
- `fullstack-demo-scaffold`
- `agora-sdk-reference`
- `demo-env-generator`

---

## 5. Agora Docs MCP

Documentação: [https://docs.agora.io/en/conversational-ai/get-started/mcp](https://docs.agora.io/en/conversational-ai/get-started/mcp)

Endpoint MCP:

```text
https://mcp.agora.io
```

**Para que serve:** leva a documentação da Agora para dentro do Cursor, Claude Code, Codex ou outro client MCP, para que o assistant consulte APIs e guias atualizados em tempo real.

Observação importante: a própria documentação da Agora informa que o MCP já vem incluído quando você instala as **Agora Skills**. Se você preferir instalar separadamente, use o endpoint acima.

---

## 6. Ordem recomendada para começar

1. Criar uma conta ou projeto no [Agora Console](https://console.agora.io) e obter `APP_ID` + `APP_CERTIFICATE`.
2. Escolher entre `agent-samples`, `agent-quickstart-python` ou `agent-quickstart-nextjs`.
3. Instalar o [Agora CLI](https://www.npmjs.com/package/agoraio-cli).
4. Instalar as [Agora Skills](https://skills.sh/agoraio/skills/agora).
5. Garantir que o [Agora MCP](https://docs.agora.io/en/conversational-ai/get-started/mcp) esteja disponível no seu assistant.
6. Configurar `.env` ou `.env.local` com as credenciais da Agora.
7. Rodar localmente e validar áudio, invite do agent e resposta conversacional antes de expandir o escopo.

Se vocês tiverem pouco tempo, priorizem primeiro uma demo funcional com áudio em tempo real e agent respondendo. O resto pode virar polimento.

---

## Suporte durante o evento

- **Contato principal:** Yan Belot — [yannick.belot@agora.io](mailto:yannick.belot@agora.io)
- **Discord do evento:** [https://discord.gg/QwFFZ7BW](https://discord.gg/QwFFZ7BW)

Ao entrar no Discord, você recebe a role **São Paulo Hackathon**. Só depois disso os canais da Agora para participantes ficam visíveis.

Documentação geral da Agora: [https://docs.agora.io/en](https://docs.agora.io/en)

---

## Premiação Agora

Use Agora no seu projeto e concorra a:

- 1º lugar: 10.000 minutos de ConvoAI
- 2º lugar: 7.500 minutos
- 3º lugar: 5.000 minutos
- 4º lugar: 2.000 minutos
- 5º lugar: 2.000 minutos

Boa sorte e que a primeira demo suba rápido.
