const { Router } = require('express');
const { GoogleGenAI } = require('@google/genai');
const { getDb } = require('../db');

const router = Router();

const CHAT_SYSTEM_PROMPT = `Você é um analista de produto sênior conduzindo uma entrevista de descoberta. Faça UMA pergunta por vez, em português, tom natural. Cliente pode não ser técnico. Cubra: 1) o que o produto faz, 2) problema/público, 3) funcionalidades principais, 4) diferenciais, 5) integrações, 6) escala esperada, 7) web/mobile, 8) prazo/orçamento. Máximo 8-10 perguntas. Responda APENAS com JSON conforme o schema fornecido. Quando tiver informação suficiente, retorne isComplete=true com uma mensagem de agradecimento.`;

const CHAT_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    reply: { type: 'string' },
    isComplete: { type: 'boolean' },
  },
  required: ['reply', 'isComplete'],
};

router.post('/api/chat', async (req, res) => {
  const { sessionId, message, history } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message are required' });
  }

  const db = getDb();

  const session = db.prepare('SELECT id FROM sessions WHERE id = ?').get(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const geminiHistory = [];
  if (Array.isArray(history)) {
    for (const msg of history) {
      geminiHistory.push({
        role: msg.role === 'agent' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      });
    }
  }
  geminiHistory.push({
    role: 'user',
    parts: [{ text: message }],
  });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: geminiHistory,
      config: {
        systemInstruction: CHAT_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseJsonSchema: CHAT_RESPONSE_SCHEMA,
        thinkingConfig: { thinkingBudget: 1024 },
      },
    });

    const text = response.text;
    if (!text) {
      return res.status(502).json({ error: 'Empty response from AI model' });
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { reply: text, isComplete: false };
    }

    const insertMsg = db.prepare(
      'INSERT INTO transcripts (session_id, transcript, role) VALUES (?, ?, ?)'
    );
    const saveMessages = db.transaction(() => {
      insertMsg.run(sessionId, message, 'user');
      insertMsg.run(sessionId, parsed.reply, 'agent');
    });
    saveMessages();

    res.status(200).json({
      reply: parsed.reply,
      isComplete: parsed.isComplete || false,
    });
  } catch (err) {
    console.log('Error calling Gemini API (chat):', err.message);
    res.status(500).json({ error: 'Failed to generate response', details: err.message });
  }
});

module.exports = router;
