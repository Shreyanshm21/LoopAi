const { store } = require('./store');
const { PriorityValue } = require('./utils');

function enqueueJobs(ingestion_id, priority, timestamp, batches) {
  const priorityValue = PriorityValue[priority];
  batches.forEach(batch => {
    store.jobQueue.push({
      ingestion_id,
      batch,
      priorityValue,
      timestamp
    });
  });
  sortQueue();
}

function sortQueue() {
  store.jobQueue.sort((a, b) => {
    if (a.priorityValue !== b.priorityValue) {
      return a.priorityValue - b.priorityValue; // lower value = higher priority
    }
    return a.timestamp - b.timestamp;
  });
}

module.exports = { enqueueJobs };
