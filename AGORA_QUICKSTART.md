# Agora Quickstart — Cognition Hack SP

Ferramentas recomendadas para builders que querem concorrer à **trilha Agora** (até 10.000 minutos ConvoAI em prêmios).

Todas as ferramentas abaixo são oficiais da Agora e foram selecionadas para acelerar o desenvolvimento de projetos com voz/vídeo em tempo real dentro da janela apertada de 4h do hack.

---

## 1. Agent Skills — scaffolds prontos para Windsurf/Devin/Claude

Instalação:

```bash
npx skills add https://github.com/agoraio/skills --skill agora
```

Catálogo completo: https://skills.sh/agoraio/skills/agora

**Para que serve:** Skills são "blocos de conhecimento" que o agent (Devin, Windsurf Cascade, Claude Code) carrega para gerar código funcional em minutos ao invés de horas. Você pede "crie um voice agent que responde sobre X" e o agent, com o skill carregado, devolve frontend + backend + token auth prontos.

**Principais skills da Agora:**

- `convoai-demo-scaffold` — voice agent ConvoAI completo (frontend + backend + token auth)
- `rtc-demo-scaffold` — video/voice calling (Web JS, React, iOS, Android)
- `fullstack-demo-scaffold` — demo enterprise com ConvoAI + RTC + Custom LLM + recording
- `agora-sdk-reference` — documentação consultável pelo agent
- `demo-env-generator` — `.env` + token server prontos

---

## 2. Agora CLI — tooling de linha de comando

Instalação:

```bash
npm install -g agoraio-cli
```

Pacote npm: https://www.npmjs.com/package/agoraio-cli

**Para que serve:** Operações comuns do Agora sem sair do terminal — gerar tokens, criar agents ConvoAI, testar credenciais, scaffold de projetos. Em um hack de 4h, isso economiza minutos preciosos de toda sessão.

---

## 3. Agent Samples — repositório de exemplos

Repo: https://github.com/AgoraIO-Conversational-AI/agent-samples

**Para que serve:** Exemplos prontos de voice agents, incluindo **prompt pronto para voice agent com avatar** (muito relevante se você quiser construir algo visualmente memorável para o julgamento).

Clonar e começar:

```bash
git clone https://github.com/AgoraIO-Conversational-AI/agent-samples.git
cd agent-samples
# seguir README de cada sample
```

---

## Setup rápido recomendado (ordem)

1. Criar conta trial: https://console.agora.io (pega `APP_ID` + `APP_CERTIFICATE` + `Customer Key/Secret`)
2. Instalar Agora CLI (passo 2 acima)
3. Carregar skills no seu agent/IDE (passo 1 acima)
4. Se for voice agent → clonar agent-samples (passo 3 acima) e iniciar a partir de um sample
5. Conectar OpenAI/Anthropic key (LLM) + ElevenLabs key (TTS) no `.env`
6. Rodar

Com skill carregado, o agent do Windsurf/Devin consegue montar o projeto inteiro com uma instrução em linguagem natural. Use isso a seu favor.

---

## Suporte durante o evento

- **Discord do evento** → equipe Agora US atende builders durante todo o evento
- **On-site** → Yannick (Yan) Belot (jurado Agora) — acione via Discord se precisar de algo físico (credenciais, conta travada, upgrade de limites)

Documentação completa: https://docs.agora.io/en

---

## Premiação trilha Agora

Use Agora ConvoAI no seu projeto e concorra a:

- 1º lugar: 10.000 minutos de ConvoAI
- 2º lugar: 7.500 minutos
- 3º lugar: 5.000 minutos
- 4º lugar: 2.000 minutos
- 5º lugar: 2.000 minutos

Boa sorte e que seu voice agent fale claro.
