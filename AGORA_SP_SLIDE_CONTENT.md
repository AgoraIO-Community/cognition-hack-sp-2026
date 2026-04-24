# Agora x Cognition Hack SP 2026

## Slide 1 — Título

**Cognition Hack SP 2026**  
Construindo experiências com IA conversacional em tempo real com a Agora

**Subtítulo sugerido:**  
ConvoAI + RTC como base obrigatória para demos rápidas, claras e memoráveis

---

## Slide 2 — O que vocês precisam entregar

- Construir uma solução funcional em 4 horas
- Todo projeto elegível deve usar **Agora ConvoAI + Agora RTC**
- O foco é demo real: áudio, agent e experiência funcionando
- Tema aberto, desde que a proposta tenha valor e uso claro de IA conversacional em tempo real

**Speaker note:**  
Reforçar que o objetivo não é complexidade máxima, e sim uma demo convincente com fluxo principal funcionando.

---

## Slide 3 — Caminho mais rápido para começar

- **Comece por `agent-samples`**
- Se quiser uma base mais guiada, escolha um quickstart oficial
- Use o `README.md` do repo como visão geral
- Use `AGORA_QUICKSTART.md` como checklist de setup

Links:

- [agent-samples](https://github.com/AgoraIO-Conversational-AI/agent-samples)
- [`AGORA_QUICKSTART.md`](./AGORA_QUICKSTART.md)

---

## Slide 4 — Escolha sua stack

**Opção 1: Python quickstart**

- [agent-quickstart-python](https://github.com/AgoraIO-Community/agent-quickstart-python)
- FastAPI no backend + cliente web
- Bom para times que querem mais controle server-side

**Opção 2: Next.js quickstart**

- [agent-quickstart-nextjs](https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs)
- Experiência de voz no browser com Next.js
- Bom para times que querem iterar rápido em UI e fluxo

---

## Slide 5 — Ferramentas que economizam tempo

**Agora CLI**

```bash
npm install -g agoraio-cli
```

**Agora Skills**

```bash
npx skills add https://github.com/agoraio/skills --skill agora
```

- Use CLI para acelerar setup e operações recorrentes
- Use Skills para dar contexto real da Agora ao seu assistant

---

## Slide 6 — Agora Docs MCP

- Documentação: [Agora MCP](https://docs.agora.io/en/conversational-ai/get-started/mcp)
- Endpoint: `https://mcp.agora.io`
- Leva a documentação da Agora para dentro do Cursor, Claude Code, Codex e outros clients MCP
- Segundo a documentação oficial, o MCP já pode vir junto com a instalação das Agora Skills

**Speaker note:**  
Isso reduz alucinação e acelera código correto durante o hackathon.

---

## Slide 7 — Checklist mínimo de setup

1. Criar projeto no [Agora Console](https://console.agora.io)
2. Copiar `APP_ID` e `APP_CERTIFICATE`
3. Escolher `agent-samples`, Python quickstart ou Next.js quickstart
4. Instalar CLI, Skills e garantir MCP disponível
5. Configurar `.env` ou `.env.local`
6. Validar áudio em tempo real e resposta do agent antes de expandir escopo

---

## Slide 8 — Como submeter

- Fazer fork deste repositório
- Criar `submissions/nome-do-time/`
- Incluir código, `README.md`, setup e demo ou screenshots
- Abrir Pull Request até **2026-04-25, 15:00 BRT**
- Informar no `README.md` se o time usou Windsurf, Devin ou ambos

---

## Slide 9 — Como a banca avalia

- **Qualidade técnica** — 33,33%
- **Apresentação visual** — 33,33%
- **Impacto e originalidade** — 33,34%
- **Bônus** de até +1,00 por execução que vá além do mínimo

Link:

- [`hackathon-rating-rubric.md`](./hackathon-rating-rubric.md)

---

## Slide 10 — Suporte e contato

- **Contato principal:** Yan Belot — [yannick.belot@agora.io](mailto:yannick.belot@agora.io)
- **Discord do evento:** [https://discord.gg/QwFFZ7BW](https://discord.gg/QwFFZ7BW)
- Ao entrar no Discord, a role **São Paulo Hackathon** libera os canais da Agora para participantes

**Fechamento sugerido:**  
Comecem com o menor fluxo possível funcionando. Depois disso, polimento e originalidade rendem mais.
