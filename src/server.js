const express = require('express');
const redis = require('redis');

const app = express();
const port = 3001;

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

app.use(express.json());

app.post('/storeHistory', (req, res) => {
  const { history } = req.body;

  history.forEach((item, index) => {
    // Store each item in Redis using a unique key
    redisClient.set(`history:${index}`, JSON.stringify(item));
  });

  res.status(200).json({ message: 'History stored successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
