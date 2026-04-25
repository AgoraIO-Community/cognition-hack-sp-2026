Aqui está um README.md organizado e pronto para uso com base no que você pediu:

---

# SpecForge

## 👥 Equipe

**Nome do time:** SpecForge Team

**Integrantes:**

* Isadora Ghannam Ferreira
* Wesley Alexandre
* Beatriz Dantas
* Vitor Santos

---

## 📌 Descrição do Projeto

O **SpecForge** é um gerador de especificações técnicas alimentado por IA.
A aplicação conduz uma entrevista em formato de chat com o usuário, coleta informações sobre o produto desejado e, ao final, gera automaticamente uma especificação técnica estruturada.

Fluxo principal:
**Chat Interview → Transcrição → Geração de Especificação Técnica**

---

## 🛠️ Ferramentas Utilizadas

* **IA**: Gemini (Google GenAI)
* **Backend**: Node.js 20 + Express
* **Banco de Dados**: SQLite (arquivo local)
* **Infraestrutura**: Docker, Docker Compose, Caddy (HTTPS com Let's Encrypt)

> Ferramentas de desenvolvimento utilizadas: **(preencher conforme o time)**
> Ex: Windsurf, Devin ou ambos

---

## 🚀 Instruções de Setup e Execução

### 🔧 Desenvolvimento Local

```bash
cd backend

cp .env.example .env
# Preencha a variável GEMINI_API_KEY no arquivo .env

npm install
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

### 🐳 Deploy com Docker

```bash
DOMAIN=your-domain.nip.io docker compose up -d --build
```

---

## 🔌 Endpoints da API

| Método | Rota                        | Descrição                      |
| ------ | --------------------------- | ------------------------------ |
| GET    | `/health`                   | Health check (retorna 200)     |
| POST   | `/api/interview/start`      | Cria sessão → `{ sessionId }`  |
| POST   | `/api/chat`                 | Chat → `{ reply, isComplete }` |
| POST   | `/api/interview/transcript` | Salva transcrição              |
| POST   | `/api/spec/generate`        | Gera especificação             |
| GET    | `/api/spec/:sessionId`      | Retorna especificação          |

---

## 🔄 Fluxo da Aplicação

1. Iniciar entrevista:

```http
POST /api/interview/start
```

2. Enviar mensagens:

```http
POST /api/chat
```

3. Repetir até:

```json
"isComplete": true
```

4. Gerar especificação:

```http
POST /api/spec/generate
```

---

## ⚙️ Variáveis de Ambiente

| Variável         | Descrição                         |
| ---------------- | --------------------------------- |
| `PORT`           | Porta do servidor (default: 3000) |
| `GEMINI_API_KEY` | Chave da API do Gemini            |
| `DB_PATH`        | Caminho do banco SQLite           |
| `DOMAIN`         | Domínio para HTTPS (Caddy)        |

---

## 📦 Dependências Externas

* Node.js 20+
* Docker e Docker Compose
* Conta Google com acesso à API Gemini

---

## ⚠️ Limitações e Trade-offs

* Uso de **SQLite** limita escalabilidade para ambientes de alta carga
* Dependência da API do **Gemini** (latência e custo)
* Fluxo baseado em chat pode gerar respostas inconsistentes dependendo do input do usuário
* Não há autenticação de usuários implementada

---

## 🔮 Próximos Passos

* Implementar autenticação e controle de usuários
* Migrar banco de dados para PostgreSQL
* Melhorar validação das respostas do usuário no chat
* Criar interface frontend para facilitar o uso
* Adicionar versionamento de especificações
* Melhorar prompts para maior consistência na geração

---

Se quiser, posso também:

* deixar o README mais “bonito” (com badges, imagens, etc.)
* adaptar para padrão de apresentação acadêmica
* ou gerar versão em inglês 👍

