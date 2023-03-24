import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

// Connection URI for the MongoDB database
dotenv.config();
const uri = process.env.MONGO_URI;

// Constants for the database and collection names
const DATABASE_NAME = 'webhook_database';
const COLLECTION_NAME = 'webhooks';

let db = null;

// Function to connect to the MongoDB database
async function connectToDatabase() {
  if (db) {
    return db;
  }
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  await client.connect();
  db = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
  return db;
}

// Function to find a webhook in the database by its endpoint URL and event type
async function findWebhookByEndpointUrlAndEventType(endpointUrl, eventType) {
  const collection = await connectToDatabase();
  return collection.findOne({ endpointUrl, eventType });
}

// Function to create a new webhook in the database
async function createWebhook(endpointUrl, eventType) {
  try {
    const collection = await connectToDatabase();
    await collection.insertOne({ endpointUrl, eventType});
    const result = await collection.find({})
    const webhooks = await result.toArray();
    webhooks.reverse();
    if (webhooks && webhooks.length > 0) {
      return webhooks[0];
    } else {
      throw new Error('Failed to create webhook');
    }
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create webhook');
  }
}

// Function to delete a webhook from the database by its endpoint URL and event type
async function deleteWebhookByEndpointUrlAndEventType(endpointUrl, eventType) {
  const collection = await connectToDatabase();
  return collection.deleteOne({ endpointUrl, eventType });
}

export default {
    findWebhookByEndpointUrlAndEventType,
    createWebhook,
    deleteWebhookByEndpointUrlAndEventType,
    connectToDatabase
  };
  