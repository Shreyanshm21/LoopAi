# Data Ingestion API

A simple Node.js API for data ingestion that supports asynchronous batch processing with priority and rate limiting.

---

## Features

- Accepts ingestion requests with a list of IDs and a priority (HIGH, MEDIUM, LOW).
- Processes IDs in batches of 3 asynchronously.
- Respects rate limit: processes only 1 batch every 5 seconds.
- Prioritizes higher priority requests before lower priority ones.
- Provides a status endpoint to check ingestion progress.
- Simulates external API calls with mock delays.

---

## Tech Stack

- Node.js  
- Express.js  
- UUID (for unique IDs)  

---

## Setup and Run Locally

### Prerequisites

- Node.js installed (v12+ recommended)  
- npm (comes with Node.js)  

### Steps

1. Clone the repository or copy the code to your local machine.

2. Install dependencies:

   ```bash
   npm install
3. Start the server
  node index.js
  the server will run on port 5000 by default
