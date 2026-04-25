const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db');

const router = Router();

router.post('/api/interview/start', (req, res) => {
  const db = getDb();
  const sessionId = uuidv4();

  db.prepare('INSERT INTO sessions (id) VALUES (?)').run(sessionId);

  res.status(201).json({ sessionId });
});

router.post('/api/interview/transcript', (req, res) => {
  const { sessionId, transcript } = req.body;

  if (!sessionId || !transcript) {
    return res.status(400).json({ error: 'sessionId and transcript are required' });
  }

  const db = getDb();

  const session = db.prepare('SELECT id FROM sessions WHERE id = ?').get(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  db.prepare('INSERT INTO transcripts (session_id, transcript, role) VALUES (?, ?, ?)').run(sessionId, transcript, 'user');

  res.status(200).json({ success: true });
});

module.exports = router;
