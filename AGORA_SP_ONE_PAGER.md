# Agora One-Pager — Cognition Hack SP 2026

## O que é obrigatório

- Seu projeto precisa usar **Agora ConvoAI**
- Seu projeto precisa usar **Agora RTC**
- A demo deve mostrar esse fluxo funcionando de forma clara

## Caminho mais rápido

### 1. Escolha um ponto de partida

- [agent-samples](https://github.com/AgoraIO-Conversational-AI/agent-samples)
- [agent-quickstart-python](https://github.com/AgoraIO-Community/agent-quickstart-python)
- [agent-quickstart-nextjs](https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs)

### 2. Instale as ferramentas de aceleração

```bash
npm install -g agoraio-cli
npx skills add https://github.com/agoraio/skills --skill agora
```

### 3. Ative o Agora MCP no seu assistant

- Docs: [https://docs.agora.io/en/conversational-ai/get-started/mcp](https://docs.agora.io/en/conversational-ai/get-started/mcp)
- Endpoint: `https://mcp.agora.io`

### 4. Configure a conta

- Criar projeto no [Agora Console](https://console.agora.io)
- Obter `APP_ID` e `APP_CERTIFICATE`
- Preencher `.env` ou `.env.local`

## Como escolher rápido

- **Python quickstart**: melhor para quem quer backend em FastAPI desde o início
- **Next.js quickstart**: melhor para quem quer iterar rápido no browser
- **agent-samples**: melhor para quem quer adaptar um exemplo pronto

## Checklist mínimo antes de expandir escopo

- Agent recebe o invite corretamente
- Áudio em tempo real funciona
- Resposta conversacional funciona ponta a ponta
- O time consegue explicar o problema e a solução em menos de 1 minuto

## Submissão

- Fazer fork do repositório
- Criar `submissions/nome-do-time/`
- Incluir `README.md`, código, setup e demo ou screenshots
- Abrir Pull Request até **2026-04-25, 15:00 BRT**

## Como vocês serão avaliados

- **Qualidade técnica** — 33,33%
- **Apresentação visual** — 33,33%
- **Impacto e originalidade** — 33,34%
- **Bônus** de até +1,00 para quem for além do mínimo

Rubrica completa: [`hackathon-rating-rubric.md`](./hackathon-rating-rubric.md)

## Suporte durante o evento

- **Yan Belot** — [yannick.belot@agora.io](mailto:yannick.belot@agora.io)
- **Discord:** [https://discord.gg/QwFFZ7BW](https://discord.gg/QwFFZ7BW)

Ao entrar no Discord, a role **São Paulo Hackathon** libera os canais da Agora para participantes.
