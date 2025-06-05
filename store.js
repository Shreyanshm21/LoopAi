const store = {
  ingestions: {}, // ingestion_id: { priority, batches, ... }
  jobQueue: []     // min-heap-like structure [ { priority, timestamp, ingestion_id, batch_ref } ]
};

module.exports = { store };
