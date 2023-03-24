import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

// Middleware to parse incoming request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle incoming webhook requests
app.post('/songs', (req, res) => {
  console.log('Received webhook data:', req.body);
  // Handle the webhook data here
  res.sendStatus(200);
});

app.post('/artists', (req, res) => {
  console.log('Received webhook data:', req.body);
  // Handle the webhook data here
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});