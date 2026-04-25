const { Router } = require('express');
const { GoogleGenAI } = require('@google/genai');
const { getDb } = require('../db');

const router = Router();

const SYSTEM_PROMPT = `Você recebeu a transcrição de uma entrevista de descoberta de produto. Gere uma especificação técnica em JSON com a estrutura definida no schema.
Se faltar informação, use "a definir". Não invente.`;

const SPEC_SCHEMA = {
  type: 'object',
  properties: {
    resumo: { type: 'string' },
    objetivos: { type: 'array', items: { type: 'string' } },
    publico_alvo: { type: 'string' },
    funcionalidades: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          descricao: { type: 'string' },
          prioridade: { type: 'string', enum: ['alta', 'media', 'baixa'] },
        },
        required: ['nome', 'descricao', 'prioridade'],
      },
    },
    stack_sugerida: {
      type: 'object',
      properties: {
        frontend: { type: 'string' },
        backend: { type: 'string' },
        banco: { type: 'string' },
        infra: { type: 'string' },
        outros: { type: 'array', items: { type: 'string' } },
      },
      required: ['frontend', 'backend', 'banco', 'infra', 'outros'],
    },
    complexidade: { type: 'string', enum: ['baixa', 'media', 'alta'] },
    horas_estimadas: {
      type: 'object',
      properties: {
        min: { type: 'number' },
        max: { type: 'number' },
      },
      required: ['min', 'max'],
    },
    riscos: { type: 'array', items: { type: 'string' } },
    dependencias: { type: 'array', items: { type: 'string' } },
    proximos_passos: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'resumo', 'objetivos', 'publico_alvo', 'funcionalidades',
    'stack_sugerida', 'complexidade', 'horas_estimadas',
    'riscos', 'dependencias', 'proximos_passos',
  ],
};

router.post('/api/spec/generate', async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  const db = getDb();

  const session = db.prepare('SELECT id FROM sessions WHERE id = ?').get(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const transcripts = db.prepare(
    'SELECT transcript, role FROM transcripts WHERE session_id = ? ORDER BY created_at'
  ).all(sessionId);

  if (transcripts.length === 0) {
    return res.status(400).json({ error: 'No transcripts found for this session' });
  }

  const fullTranscript = transcripts
    .map(t => `${t.role === 'agent' ? 'Entrevistador' : 'Cliente'}: ${t.transcript}`)
    .join('\n');

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullTranscript,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseJsonSchema: SPEC_SCHEMA,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const specText = response.text;
    if (!specText) {
      return res.status(502).json({ error: 'Empty response from AI model' });
    }

    let specJson;

    try {
      specJson = JSON.parse(specText);
    } catch {
      specJson = { raw: specText, parse_error: true };
    }

    const specString = JSON.stringify(specJson);

    db.prepare(
      'INSERT OR REPLACE INTO specs (session_id, spec_json) VALUES (?, ?)'
    ).run(sessionId, specString);

    res.status(200).json(specJson);
  } catch (err) {
    console.log('Error calling Gemini API:', err.message);
    res.status(500).json({ error: 'Failed to generate spec', details: err.message });
  }
});

router.get('/api/spec/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const db = getDb();

  const spec = db.prepare('SELECT spec_json FROM specs WHERE session_id = ?').get(sessionId);
  if (!spec) {
    return res.status(404).json({ error: 'Spec not found for this session' });
  }

  res.status(200).json(JSON.parse(spec.spec_json));
});

module.exports = router;
