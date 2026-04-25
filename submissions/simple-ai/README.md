# Simple AI

> **Cognition Hack São Paulo · 2026-04-25**
> Conversational full-stack web app builder for non-tech SMB owners.

---

## Time

| Membro | Email | LinkedIn |
|---|---|---|
| Lucas Herreiro de Oliveira | lucasplays2000@gmail.com | https://www.linkedin.com/in/lucasoliveiradevai |
| Lucas Luciano Souza Martins de Oliveira | luskoliveira@protonmail.com | https://www.linkedin.com/in/lucas-oliveira-498560246/ |

---

## O projeto em uma frase

**Simple AI** transforma uma conversa por voz com um dono de pequeno negócio (padeiro, dentista, mecânico, manicure) em um site web completo, deployado e funcional, sem que o usuário precise escrever uma única linha de código nem entender termos como "backend", "banco de dados" ou "deploy".

## O problema

Pequenos empresários no Brasil dependem de tecnologia, mas a barreira de entrada é gigante: contratar dev, aprender plataformas no-code, decifrar termos técnicos. Resultado: ficam dependentes de WhatsApp + caderno de papel.

## Nossa solução

Um pipeline de **3 agentes em sequência**, ativados por voz em PT-BR:

1. **Agente 01 — Discovery (intake)** · Claude Opus 4.7 + Agora ConvoAI + RTC. Conduz uma entrevista guiada com regras do *The Mom Test*, *SPIN Selling* e *Never Split the Difference*. Coleta `business_type`, `brand_name`, `primary_cta`, `target_audience` e `scope` em ~5 turnos, sem usar uma única palavra técnica.
2. **Agente 02 — Builder** · Claude Opus 4.7. Recebe a spec do Agente 01, gera o site (HTML/CSS responsivo) e materializa em arquivo, expondo via `/sites/{job_id}/index.html`.
3. **Agente 03 — OCI Operator** · Claude Opus 4.7 + Oracle Cloud Infrastructure SDK. Provisiona Autonomous Database, lista compute instances, gerencia Object Storage. Reusable por qualquer outro agente Claude (módulo `agents/oci_agent.py` exporta `OCI_TOOLS` + `execute_oci_tool` + classe `Agente03`).

A interface visual ("lousa") preenche cards interativos em tempo real conforme a conversa avança — o usuário vê o que foi entendido, sem nunca olhar JSON.

## Ferramentas usadas

- **Windsurf** — IDE com agente AI durante todo o desenvolvimento
- **Devin (Cognition)** — sessões autônomas de codificação para componentes específicos
- **Agora ConvoAI + RTC** — voz em tempo real PT-BR (mandatório do hackathon)
- **Anthropic Claude Opus 4.7** — cérebro dos 3 agentes (intake, builder, OCI operator)
- **Oracle Cloud Infrastructure** — track OCI para Agente 03 (provisionamento)
- **MiniMax TTS + Deepgram STT** — pipeline de voz via `agora-agent-server-sdk`

## Stack técnica

```
Frontend:  React 19 + Vite + Tailwind utilities + Agora RTC SDK
Backend:   FastAPI + agora-agent-server-sdk + Anthropic SDK + OCI Python SDK
Voice:     Agora ConvoAI (managed) → Deepgram STT → Claude Opus 4.7 → MiniMax TTS
LLM:       claude-opus-4-7 (configurável via AGENT_LLM_MODEL)
Storage:   localStorage no front, JSON em disco no backend
```

## Setup e execução

### 1. Variáveis de ambiente
```bash
cd submissions/simple-ai/server-python
cp .env.example .env.local
# Preencher: APP_ID, APP_CERTIFICATE (Agora), ANTHROPIC_API_KEY
```

### 2. Backend (FastAPI + Agora + Anthropic + OCI)
```bash
cd submissions/simple-ai/server-python
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python src/server.py
# → http://localhost:8000
```

### 3. Frontend (Vite)
```bash
cd submissions/simple-ai
npm install --legacy-peer-deps
npm run dev
# → http://localhost:5173
```

### 4. Tudo de uma vez
```bash
npm run dev:full   # roda backend + frontend em paralelo (concurrently)
```

### 5. Para Agente 03 (OCI) funcionar
Configure `~/.oci/config` (profile `DEFAULT`) com `tenancy`, `user`, `key_file`, `fingerprint`, `region`. Sem isso o Agente 03 inicializa em modo `available: false` mas o resto do app continua rodando.

## Variáveis de ambiente

Ver `server-python/.env.example`. Resumo:

| Var | Obrigatória | Origem |
|---|---|---|
| `APP_ID` | sim | Agora Console → Project |
| `APP_CERTIFICATE` | sim | Agora Console → Security |
| `ANTHROPIC_API_KEY` | sim | console.anthropic.com |
| `AGENT_LLM_MODEL` | não | default `claude-opus-4-7` |
| `AGENT_TTS_VOICE_ID` | não | MiniMax voice catalog |
| `OCI_CONFIG_FILE` | não | default `~/.oci/config` |

## Endpoints principais

```
GET  /get_config                  — gera token Agora (Convo + RTC)
POST /v2/startAgent               — inicia sessão ConvoAI (Agente 01)
POST /v2/stopAgent                — encerra sessão
POST /v2/build                    — Agente 02: dispara construção do site
GET  /v2/build/{job_id}           — status do build
POST /v3/oci-agent/chat           — Agente 03: operações OCI via linguagem natural
GET  /v3/oci-agent/status         — disponibilidade do Agente 03
GET  /sites/{job_id}/index.html   — site gerado pelo Agente 02
```

## Demo

`demo.mp4` (~78MB). Mostra o fluxo completo: usuário fala em PT-BR sobre seu negócio → lousa preenche cards → confirmação → Agente 02 constrói → preview do site gerado.

## Limitações conhecidas e trade-offs

- **Latência de voz**: Opus 4.7 adiciona ~3-5s por turno. Trocar para `claude-haiku-4-5-20251001` corta para ~500ms (via env var) com menos profundidade de raciocínio. Mantemos Opus para qualidade de extração de requisitos.
- **Agente 02 (builder)**: gera HTML estático single-page. Não cobre auth, multi-tenant nem persistência por usuário. É um stub funcional do conceito; produção real precisaria de pipeline de deploy automatizado (ex: Devin sessions ou OCI Functions).
- **Agente 03 (OCI)**: não está conectado ao Agente 02 ainda. O wireup natural seria: Agente 02 chama `execute_oci_tool('create_autonomous_database', …)` antes de gerar código que depende de DB.
- **Mobile**: a UI da lousa é otimizada pra desktop. Mobile responsivo é P1.
- **Internacionalização**: hardcoded em PT-BR. EN e ES estão por trás de constantes mas precisam de revisão.

## Próximos passos

1. Conectar Agente 02 ↔ Agente 03 (Builder pede DB ao Operator antes de gerar).
2. Devin como Agente 04 (autonomous code-fixer) pra refinar o site gerado iterativamente.
3. Onça App: cliente final mobile do site gerado, com push notifications.
4. Catálogo de templates verticais (padaria, dentista, mecânico…) treinados em casos reais.

## Licença

MIT.

## Repo principal de desenvolvimento

https://github.com/LucasOl1337/simple-ai (privado durante o hackathon, aberto pós-2026-04-25).
