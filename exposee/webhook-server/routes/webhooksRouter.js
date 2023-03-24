import express from 'express';
import webhooksController from '../controllers/webhooks.js';
const router = express.Router();

// Endpoint for registering a webhook for the "song added" event
router.post('/song-added', webhooksController.registerSongAddedWebhook);

// Endpoint for unregistering a webhook for the "song added" event
router.delete('/song-added', webhooksController.unregisterSongAddedWebhook);

// Endpoint for registering a webhook for the "artist updated" event
router.post('/artist-updated', webhooksController.registerArtistUpdatedWebhook);

// Endpoint for unregistering a webhook for the "artist updated" event
router.delete('/artist-updated', webhooksController.unregisterArtistUpdatedWebhook);

// Endpoint for registering a webhook for the "song played" event
router.post('/song-played', webhooksController.registerSongPlayedWebhook);

// Endpoint for unregistering a webhook for the "song played" event
router.delete('/song-played', webhooksController.unregisterSongPlayedWebhook);

export default router;