import { MongoClient} from 'mongodb';
import dotenv from 'dotenv';

// Connection URI for the MongoDB database
dotenv.config();

// Connection URL and database name
const url = process.env.MONGO_URI;
const dbName = 'webhooks';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  // Update integrator's endpoint for "song added" event with dummy data
  db.collection('webhooks').findOne({ eventType: 'song added' }, function(err, webhook) {
    if (err) {
      console.error(err);
      client.close();
      return;
    }
    if (!webhook) {
      console.log('No webhook found for "song added" event');
      client.close();
      return;
    }

    const payload = {
      title: 'Dummy Song',
      artist: 'Dummy Artist',
      duration: 240
    };

    const endpointUrl = webhook.endpointUrl;

    fetch(endpointUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        console.log(`Successfully sent payload to ${endpointUrl}`);
      } else {
        console.error(`Failed to send payload to ${endpointUrl}: ${response.statusText}`);
      }
      client.close();
    })
    .catch(err => {
      console.error(`Failed to send payload to ${endpointUrl}: ${err.message}`);
      client.close();
    });
  });
});