import express from 'express';
import bodyParser from 'body-parser';
import webhooksRouter from './routes/webhooksRouter.js';
import database from './helpers/database.js';

const app = express();
const PORT = 3000;

// Connect to the database and start the server
database.connectToDatabase()
  .then(collection => {
    app.use(bodyParser.json());
    app.use('/webhooks', webhooksRouter);
  
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });