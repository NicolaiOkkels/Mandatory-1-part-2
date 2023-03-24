import fetch from 'node-fetch';
import database from '../helpers/database.js';

// Helper function to send a ping event to a webhook
async function pingWebhook(endpointUrl) {
  try {
    const payload = { message: 'Ping from webhook' };
    const response = await fetch(endpointUrl, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
    if (!response.ok) {
      console.error(`Failed to ping webhook at ${endpointUrl}: ${response.statusText}`);
    }
  } catch (err) {
    console.error(`Failed to ping webhook at ${endpointUrl}: ${err.message}`);
  }
}

// Controller function for registering a webhook for the "song added" event
async function registerSongAddedWebhook(req, res) {
  try {
    // Extract the endpoint URL from the request body
    if (!req.body.endpointUrl) {
      return res.status(400).json({ error: 'Missing endpointUrl field in request body' });
    }
    const { endpointUrl } = req.body;

    // Check if the webhook is already registered
    const existingWebhook = await database.findWebhookByEndpointUrlAndEventType(endpointUrl, 'song added');
    if (existingWebhook) {
      return res.status(400).json({ error: 'Webhook already registered' });
    }

    // Add the new webhook to the database
    const newWebhook = await database.createWebhook(endpointUrl, 'song added');
    // Send a ping to the new webhook endpoint
    pingWebhook(endpointUrl);

    // Return a success message to the integrator
    res.status(201).json({ message: 'Webhook registered successfully', webhook: newWebhook });
  } catch (err) {

    console.error(err);
    res.status(500).json({ error: 'Failed to register webhook' });
  }
}

// Controller function for unregistering a webhook for the "song added" event
async function unregisterSongAddedWebhook(req, res) {
  try {
    // Extract the endpoint URL from the request body
    if (!req.body.endpointUrl) {
      return res.status(400).json({ error: 'Missing endpointUrl field in request body' });
    }
    const { endpointUrl } = req.body;

    // Remove the webhook from the database
    const result = await database.deleteWebhookByEndpointUrlAndEventType(endpointUrl, 'song added');
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Webhook not found' });
    }

    // Return a success message to the integrator
    res.json({ message: 'Webhook unregistered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unregister webhook' });
  }
}

// Controller function for registering a webhook for the "artist updated" event
async function registerArtistUpdatedWebhook(req, res) {
  try {
    // Extract the endpoint URL from the request body
    if (!req.body.endpointUrl) {
      return res.status(400).json({ error: 'Missing endpointUrl field in request body' });
    }
    const { endpointUrl } = req.body;

    // Check if the webhook is already registered
    const existingWebhook = await database.findWebhookByEndpointUrlAndEventType(endpointUrl, 'artist updated');
    if (existingWebhook) {
      return res.status(400).json({ error: 'Webhook already registered' });
    }

    // Add the new webhook to the database
    const newWebhook = await database.createWebhook(endpointUrl, 'artist updated');

    // Send a ping to the new webhook endpoint
    pingWebhook(endpointUrl);

    // Return a success message to the integrator
    res.status(201).json({ message: 'Webhook registered successfully', webhook: newWebhook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register webhook' });
  }
}

// Controller function for unregistering a webhook for the "artist updated" event
async function unregisterArtistUpdatedWebhook(req, res) {
  try {
    // Extract the endpoint URL from the request body
    if (!req.body.endpointUrl) {
      return res.status(400).json({ error: 'Missing endpointUrl field in request body' });
    }
    const { endpointUrl } = req.body;

    // Remove the webhook from the database
    const result = await database.deleteWebhookByEndpointUrlAndEventType(endpointUrl, 'artist updated');
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Webhook not found' });
    }

    // Return a success message to the integrator
    res.json({ message: 'Webhook unregistered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unregister webhook' });
  }
}

// Controller function for registering a webhook for the "song played" event
async function registerSongPlayedWebhook(req, res) {
  try {
    // Extract the endpoint URL from the request body
    if (!req.body.endpointUrl) {
      return res.status(400).json({ error: 'Missing endpointUrl field in request body' });
    }
    const { endpointUrl } = req.body;

    // Check if the webhook is already registered
    const existingWebhook = await database.findWebhookByEndpointUrlAndEventType(endpointUrl, 'song played');
    if (existingWebhook) {
      return res.status(400).json({ error: 'Webhook already registered' });
    }

    // Add the new webhook to the database
    const newWebhook = await database.createWebhook(endpointUrl, 'song played');

    // Send a ping to the new webhook endpoint
    pingWebhook(endpointUrl);

    // Return a success message to the integrator
    res.status(201).json({ message: 'Webhook registered successfully', webhook: newWebhook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register webhook' });
  }
}

// Controller function for unregistering a webhook for the "song played" event
async function unregisterSongPlayedWebhook(req, res) {
  try {
    // Extract the endpoint URL from the request body
    if (!req.body.endpointUrl) {
      return res.status(400).json({ error: 'Missing endpointUrl field in request body' });
    }
    const { endpointUrl } = req.body;

    // Remove the webhook from the database
    const result = await database.deleteWebhookByEndpointUrlAndEventType(endpointUrl, 'song played');
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Webhook not found' });
    }

    // Return a success message to the integrator
    res.json({ message: 'Webhook unregistered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unregister webhook' });
  }
}

export default {
  registerSongAddedWebhook,
  unregisterSongAddedWebhook,
  registerArtistUpdatedWebhook,
  unregisterArtistUpdatedWebhook,
  registerSongPlayedWebhook,
  unregisterSongPlayedWebhook,
};