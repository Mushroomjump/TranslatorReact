require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('fintech');
    const collection = db.collection('rawData');

    // Define routes here
    app.get('/', (req, res) => {
      res.send('Hello World');
    });

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(error => console.error(error));
