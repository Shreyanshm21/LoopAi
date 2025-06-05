const { store } = require('./store');

function processBatch(ingestion_id, batch) {
  batch.status = 'triggered';
  updateIngestionStatus(ingestion_id);
  setTimeout(() => {
    batch.status = 'completed';
    updateIngestionStatus(ingestion_id);
  }, 3000); // simulate 3s processing
}

function updateIngestionStatus(ingestion_id) {
  const ingestion = store.ingestions[ingestion_id];
  const statuses = ingestion.batches.map(b => b.status);
  if (statuses.every(s => s === 'completed')) ingestion.status = 'completed';
  else if (statuses.some(s => s === 'triggered')) ingestion.status = 'triggered';
  else ingestion.status = 'yet_to_start';
}

setInterval(() => {
  if (store.jobQueue.length === 0) return;

  const job = store.jobQueue.shift(); // next job (already sorted)
  processBatch(job.ingestion_id, job.batch);
}, 5000); // rate limit: 1 batch every 5 seconds
