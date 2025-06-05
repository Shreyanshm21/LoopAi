const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { enqueueJobs } = require('./queue');
const { store } = require('./store');
const { Priority } = require('./utils');

const app = express();
app.use(express.json());

// POST /ingest
app.post('/ingest', (req, res) => {
  const { ids, priority } = req.body;

  if (!Array.isArray(ids) || !Priority[priority]) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const ingestion_id = uuidv4();
  const batches = [];

  for (let i = 0; i < ids.length; i += 3) {
    const batch = {
      batch_id: uuidv4(),
      ids: ids.slice(i, i + 3),
      status: 'yet_to_start'
    };
    batches.push(batch);
  }

  store.ingestions[ingestion_id] = {
    ingestion_id,
    priority,
    status: 'yet_to_start',
    created_at: Date.now(),
    batches
  };

  enqueueJobs(ingestion_id, priority, store.ingestions[ingestion_id].created_at, batches);
  res.json({ ingestion_id });
});

// GET /status/:ingestion_id
app.get('/status/:id', (req, res) => {
  const data = store.ingestions[req.params.id];
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start background processor
require('./worker');
